const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  level: {
    type: String,
    enum: ['Cơ Bản', 'Trung Cấp', 'Nâng Cao'],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  modules: [{
    title: {
      type: String,
      required: true
    },
    description: String,
    content: String,
    duration: Number, // in minutes
    videoUrl: String,
    resources: [{
      title: String,
      url: String,
      type: String // pdf, doc, link, etc.
    }]
  }],
  features: [{
    type: String
  }],
  requirements: [{
    type: String
  }],
  whatYouWillLearn: [{
    type: String
  }],
  isPublished: {
    type: Boolean,
    default: true
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  schedule: {
    type: String
  },
  maxStudents: {
    type: Number,
    default: 30
  },
  currentStudents: {
    type: Number,
    default: 0
  },
  language: {
    type: String,
    default: 'Tiếng Việt'
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  highlights: [{
    icon: String,
    title: String,
    description: String
  }],
  testimonials: [{
    name: String,
    avatar: String,
    role: String,
    rating: Number,
    text: String
  }],
  faq: [{
    question: String,
    answer: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add text index for search
courseSchema.index({ 
  title: 'text', 
  description: 'text', 
  shortDescription: 'text',
  category: 'text' 
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course; 