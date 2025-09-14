const { User } = require('../models');

async function listUsers(_req, res) {
  try {
    const users = await User.find()
      .select('_id name email isAdmin isBusiness isUser createdAt tempAdminExpiry')
      .sort({ createdAt: -1 })
      .lean();
    
    // Check and clean up expired temp admin privileges
    const now = new Date();
    const updates = [];
    
    users.forEach(user => {
      if (user.tempAdminExpiry && user.tempAdminExpiry < now && user.isAdmin) {
        updates.push(
          User.findByIdAndUpdate(user._id, { 
            $set: { isAdmin: false },
            $unset: { tempAdminExpiry: 1 }
          })
        );
        user.isAdmin = false;
        user.tempAdminExpiry = null;
      }
    });
    
    if (updates.length > 0) {
      await Promise.all(updates);
    }
    
    return res.json(users);
  } catch (err) {
    console.error('List users error', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function deleteUser(req, res) {
  try {
    const targetId = String(req.params.id);
    if (targetId === req.user.id) {
      return res.status(400).json({ message: 'You cannot delete your own account' });
    }
    const deleted = await User.findByIdAndDelete(targetId).lean();
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Delete user error', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function updateUser(req, res) {
  try {
    const targetId = String(req.params.id);
    const { name, isAdmin, isBusiness, isUser } = req.body || {};

    if (targetId === req.user.id && isAdmin === false) {
      return res.status(400).json({ message: 'You cannot remove your own admin role' });
    }

    const update = {};
    if (typeof name === 'string') update.name = name;
    if (typeof isAdmin === 'boolean') update.isAdmin = isAdmin;
    if (typeof isBusiness === 'boolean') update.isBusiness = isBusiness;
    if (typeof isUser === 'boolean') update.isUser = isUser;

    const updated = await User.findByIdAndUpdate(
      targetId,
      { $set: update },
      { new: true, runValidators: true, fields: '_id name email isAdmin isBusiness isUser createdAt tempAdminExpiry' }
    ).lean();

    if (!updated) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(updated);
  } catch (err) {
    console.error('Update user error', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function promoteToBusinessAccount(req, res) {
  try {
    const targetId = String(req.params.id);
    
    const updated = await User.findByIdAndUpdate(
      targetId,
      { $set: { isBusiness: true } },
      { new: true, runValidators: true, fields: '_id name email isAdmin isBusiness isUser createdAt tempAdminExpiry' }
    ).lean();

    if (!updated) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(updated);
  } catch (err) {
    console.error('Promote to business error', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function assignTempAdminPrivileges(req, res) {
  try {
    const targetId = String(req.params.id);
    const { duration } = req.body || {};
    
    if (!duration || !['1day', '1week', '1month'].includes(duration)) {
      return res.status(400).json({ message: 'Invalid duration. Must be 1day, 1week, or 1month' });
    }

    const now = new Date();
    let expiry;
    
    switch (duration) {
      case '1day':
        expiry = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        break;
      case '1week':
        expiry = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        break;
      case '1month':
        expiry = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        break;
    }

    const updated = await User.findByIdAndUpdate(
      targetId,
      { 
        $set: { 
          isAdmin: true,
          tempAdminExpiry: expiry
        }
      },
      { new: true, runValidators: true, fields: '_id name email isAdmin isBusiness isUser createdAt tempAdminExpiry' }
    ).lean();

    if (!updated) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(updated);
  } catch (err) {
    console.error('Assign temp admin error', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function createUser(req, res) {
  try {
    const { name, email, password, isAdmin, isBusiness, isUser } = req.body || {};
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    const { hashPassword } = require('../utils/hash');
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PASSWORD_REGEX = /^(?=.*[!@%$#^&*\-_]).{8,}$/;

    if (!EMAIL_REGEX.test(String(email))) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    if (!PASSWORD_REGEX.test(String(password))) {
      return res.status(400).json({ message: 'Password must be at least 8 characters and include a special character' });
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const existing = await User.findOne({ email: normalizedEmail }).lean();
    if (existing) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const passwordHash = await hashPassword(String(password));
    const created = await User.create({ 
      name, 
      email: normalizedEmail, 
      passwordHash, 
      isAdmin: !!isAdmin,
      isBusiness: !!isBusiness,
      isUser: isUser !== false
    });

    const user = await User.findById(created._id)
      .select('_id name email isAdmin isBusiness isUser createdAt tempAdminExpiry')
      .lean();

    return res.status(201).json(user);
  } catch (err) {
    console.error('Create user error', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { 
  listUsers, 
  deleteUser, 
  updateUser, 
  promoteToBusinessAccount, 
  assignTempAdminPrivileges,
  createUser
};


