const mongoose = require('mongoose');

const sourceSchema = new mongoose.Schema({
  sourceName: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  lastSeen: {
    type: Date,
    default: Date.now
  }
});

const courseSchema = new mongoose.Schema({
  courseTitle: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  courseDescription: {
    type: String,
    required: true,
    trim: true
  },
  courseCategory: {
    type: String,
    required: true,
    enum: ['AI/ML', 'Blockchain', 'Data Science', 'Web Development', 'Mobile Development', 'Cloud Computing', 'Cybersecurity', 'DevOps', 'UI/UX Design', 'Digital Marketing', 'Other'],
    index: true
  },
  courseProvider: {
    type: String,
    required: true,
    enum: ['Coursera', 'Udemy', 'edX', 'LinkedIn Learning', 'Pluralsight', 'Skillshare', 'FutureLearn', 'Khan Academy', 'GitHub', 'FreeCodeCamp', 'Other'],
    index: true
  },
  starRating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  courseUrl: {
    type: String,
    required: true,
    unique: true
  },
  courseDemand: {
    type: String,
    enum: ['High', 'Medium', 'Low', 'Declining'],
    default: 'Medium',
    index: true
  },
  trend: {
    type: String,
    enum: ['Trending', 'Stable', 'Outdated'],
    default: 'Stable',
    index: true
  },
  weeksSinceInDemand: {
    type: Number,
    default: 0
  },
  trendStartDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'outdated', 'removed'],
    default: 'active',
    index: true
  },
  jobAvailability: {
    type: String,
    enum: ['High', 'Low', 'None'],
    default: 'Low',
    index: true
  },
  removed_at: {
    type: Date,
    default: null
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
    index: true
  },
  confidenceScore: {
    type: Number,
    min: 0,
    max: 1,
    default: 0.5
  },
  aiThreatLevel: {
    type: Number,
    min: 0,
    max: 1,
    default: 0.1,
    index: true
  },
  sources: [sourceSchema],
  searchQuery: {
    type: String,
    default: ''
  },
  discoveryMethod: {
    type: String,
    enum: ['web_search', 'api', 'manual'],
    default: 'web_search'
  },
  
  // Additional fields for trend analysis
  enrollmentCount: {
    type: Number,
    default: 0
  },
  completionRate: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  jobPostingsCount: {
    type: Number,
    default: 0
  },
  searchVolume: {
    type: Number,
    default: 0
  },
  socialMentions: {
    type: Number,
    default: 0
  },
  
  // Metadata
  scrapedAt: {
    type: Date,
    default: Date.now
  },
  nextScrapeAt: {
    type: Date,
    default: () => new Date(Date.now() + 6 * 60 * 60 * 1000) // 6 hours from now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for trend duration
courseSchema.virtual('trendDuration').get(function() {
  if (!this.trendStartDate) return 0;
  return Math.floor((Date.now() - this.trendStartDate.getTime()) / (1000 * 60 * 60 * 24));
});

// Virtual for demand score
courseSchema.virtual('demandScore').get(function() {
  const weights = {
    enrollmentCount: 0.3,
    jobPostingsCount: 0.4,
    searchVolume: 0.2,
    socialMentions: 0.1
  };
  
  const normalized = {
    enrollmentCount: Math.min(this.enrollmentCount / 10000, 1),
    jobPostingsCount: Math.min(this.jobPostingsCount / 1000, 1),
    searchVolume: Math.min(this.searchVolume / 100000, 1),
    socialMentions: Math.min(this.socialMentions / 1000, 1)
  };
  
  return Object.keys(weights).reduce((score, key) => {
    return score + (normalized[key] * weights[key]);
  }, 0);
});

// Pre-save middleware to update trend analysis
courseSchema.pre('save', function(next) {
  // Update weeks since in demand
  if (this.trendStartDate) {
    this.weeksSinceInDemand = Math.floor((Date.now() - this.trendStartDate.getTime()) / (1000 * 60 * 60 * 24 * 7));
  }
  
  // Only auto-update status based on trend and job availability
  // Trending and Stable courses should be active
  if (this.trend === 'Trending' || this.trend === 'Stable') {
    this.status = 'active';
  }
  // Only set outdated status if trend is Outdated AND job availability is None
  else if (this.trend === 'Outdated' && this.jobAvailability === 'None') {
    this.status = 'outdated';
  }
  // Outdated courses with job availability should remain active
  else if (this.trend === 'Outdated' && this.jobAvailability !== 'None') {
    this.status = 'active';
  }
  
  // Update next scrape time based on trend
  const hoursToAdd = this.trend === 'Trending' ? 4 : this.trend === 'Outdated' ? 24 : 6;
  this.nextScrapeAt = new Date(Date.now() + hoursToAdd * 60 * 60 * 1000);
  
  next();
});

// Static methods for trend analysis
courseSchema.statics.getTrendingCourses = function(limit = 20) {
  return this.find({
    trend: 'Trending',
    status: 'active'
  })
  .sort({ confidenceScore: -1, lastUpdated: -1 })
  .limit(limit);
};

courseSchema.statics.getOutdatedCourses = function(limit = 20) {
  return this.find({
    $or: [
      { trend: 'Outdated' },
      { status: 'outdated' },
      { jobAvailability: 'None' }
    ]
  })
  .sort({ lastUpdated: -1 })
  .limit(limit);
};

courseSchema.statics.getCoursesByCategory = function(category, limit = 10) {
  return this.find({
    courseCategory: category,
    status: 'active'
  })
  .sort({ starRating: -1, confidenceScore: -1 })
  .limit(limit);
};

courseSchema.statics.getAIThreatenedCourses = function(limit = 20) {
  return this.find({
    aiThreatLevel: { $gte: 0.7 },
    status: 'active'
  })
  .sort({ aiThreatLevel: -1, lastUpdated: -1 })
  .limit(limit);
};

courseSchema.statics.getEmergingCourses = function(limit = 20) {
  return this.find({
    trend: 'Trending',
    courseDemand: 'High',
    status: 'active'
  })
  .sort({ confidenceScore: -1, lastUpdated: -1 })
  .limit(limit);
};

module.exports = mongoose.model('Course', courseSchema);