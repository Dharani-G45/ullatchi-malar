import mongoose from 'mongoose'

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  summary: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Technology', 'Business', 'Sports', 'Entertainment', 'Health', 'Science', 'Politics'],
    default: 'Technology'
  },
  tags: [{
    type: String,
    trim: true
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

// Add text index for search functionality
newsSchema.index({ title: 'text', summary: 'text', content: 'text' })

const News = mongoose.model('News', newsSchema)

export default News