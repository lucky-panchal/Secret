const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  skills: [{
    type: String,
    trim: true
  }],
  interests: [{
    type: String,
    trim: true
  }],
  education: {
    type: String,
    trim: true
  },
  experience: {
    type: String,
    trim: true
  },
  completedAt: {
    type: Date,
    default: Date.now
  },
  recommendations: {
    courses: [{
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
      },
      relevanceScore: {
        type: Number,
        min: 0,
        max: 1
      },
      reason: String
    }],
    learningPath: [{
      step: Number,
      title: String,
      description: String,
      estimatedDuration: String,
      skills: [String]
    }],
    generatedAt: {
      type: Date,
      default: Date.now
    }
  }
}, {
  timestamps: true
});

// Index for efficient queries
assessmentSchema.index({ userId: 1 });
assessmentSchema.index({ completedAt: -1 });

module.exports = mongoose.model('Assessment', assessmentSchema);