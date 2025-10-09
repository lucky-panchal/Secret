const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], default: 'Beginner' },
  category: { type: String, required: true },
  relevanceScore: { type: Number, min: 0, max: 1, default: 0.5 },
  isTransferable: { type: Boolean, default: false },
  marketDemand: { type: String, enum: ['High', 'Medium', 'Low', 'Declining'], default: 'Medium' }
});

const skillGapSchema = new mongoose.Schema({
  requiredSkill: { type: String, required: true },
  currentLevel: { type: String, enum: ['None', 'Beginner', 'Intermediate', 'Advanced'], default: 'None' },
  targetLevel: { type: String, enum: ['Intermediate', 'Advanced', 'Expert'], required: true },
  priority: { type: String, enum: ['Critical', 'High', 'Medium', 'Low'], default: 'Medium' },
  estimatedLearningTime: { type: Number, default: 0 }, // in hours
  recommendedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

const roadmapMilestoneSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  targetDate: { type: Date, required: true },
  skills: [String],
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  projects: [{
    title: String,
    description: String,
    difficulty: String,
    estimatedHours: Number,
    deliverables: [String]
  }],
  status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started' },
  completionPercentage: { type: Number, min: 0, max: 100, default: 0 }
});

const userProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  
  // Current Profile
  currentSkills: [skillSchema],
  interests: [String],
  education: String,
  experience: String,
  currentRole: String,
  
  // AI Analysis Results
  skillGaps: [skillGapSchema],
  transferableSkills: [{
    originalSkill: String,
    transfersTo: [String],
    transferScore: Number,
    marketDemand: String,
    learningEffort: String,
    salaryImpact: String,
    timeToMarket: String
  }],
  automationRisk: { type: Number, min: 0, max: 1, default: 0.5 },
  careerViability: { type: Number, min: 0, max: 1, default: 0.5 },
  
  // Recommendations
  recommendedRoles: [{
    title: String,
    description: String,
    matchScore: { type: Number, min: 0, max: 1 },
    salaryRange: String,
    jobGrowth: String,
    automationResistance: { type: Number, min: 0, max: 1 }
  }],
  
  // Personalized Roadmap
  roadmap: {
    targetRole: String,
    estimatedDuration: String, // e.g., "6-8 months"
    milestones: [roadmapMilestoneSchema],
    totalProgress: { type: Number, min: 0, max: 100, default: 0 }
  },
  
  // AI Model Metadata
  lastAnalyzed: { type: Date, default: Date.now },
  modelVersion: { type: String, default: '1.0' },
  confidenceScore: { type: Number, min: 0, max: 1, default: 0.5 },
  
  // Tracking
  dailyRiskUpdates: [{
    date: { type: Date, default: Date.now },
    riskLevel: { type: Number, min: 0, max: 1 },
    factors: [String]
  }]
}, {
  timestamps: true
});

// Indexes for performance
userProfileSchema.index({ userId: 1 });
userProfileSchema.index({ lastAnalyzed: -1 });
userProfileSchema.index({ 'recommendedRoles.matchScore': -1 });

module.exports = mongoose.model('UserProfile', userProfileSchema);