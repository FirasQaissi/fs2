const mongoose = require('mongoose');

const EnrolledPathSchema = new mongoose.Schema(
  {
    pathId: { type: mongoose.Schema.Types.ObjectId, ref: 'LearningPath', required: true },
    completedModules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Module', default: [] }],
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    enrolledPaths: { type: [EnrolledPathSchema], default: [] },
    isAdmin: { type: Boolean, default: false },
    isBusiness: { type: Boolean, default: false },
    // Regular user role flag. Always present so we can enforce role checks consistently
    isUser: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } }
);

module.exports = mongoose.model('User', UserSchema);
console.log('📦 User model writes to collection:', mongoose.model('User').collection.name);


