const mongoose = require('mongoose');

const UserProgressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    pathId: { type: mongoose.Schema.Types.ObjectId, ref: 'LearningPath', required: true, index: true },
    completedModules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Module', default: [] }],
  },
  { timestamps: { createdAt: false, updatedAt: 'updatedAt' } }
);

UserProgressSchema.index({ userId: 1, pathId: 1 }, { unique: true });

module.exports = mongoose.models.UserProgress || mongoose.model('UserProgress', UserProgressSchema);


