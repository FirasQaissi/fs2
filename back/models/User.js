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
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } }
);

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);


