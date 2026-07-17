import express from 'express'
import News from '../models/News.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// @route   GET /api/news
// @desc    Get all news articles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const news = await News.find() 
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'name')
    
    res.json(news)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   GET /api/news/:id
// @desc    Get news article by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id)
      .populate('author', 'name')
    
    if (news) {
      // Increment view count
      news.views += 1
      await news.save()
      
      res.json(news)
    } else {
      res.status(404).json({ message: 'News article not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   GET /api/news/category/:category
// @desc    Get news articles by category
// @access  Public
router.get('/category/:category', async (req, res) => {
  try {
    const category = req.params.category.charAt(0).toUpperCase() + req.params.category.slice(1)
    
    const news = await News.find({ category })
      .sort({ createdAt: -1 })
      .populate('author', 'name')
    
    res.json(news)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})


router.get('/tag/:tag', async (req, res) => {
  try {
    const news = await News.find({ tags: req.params.tag })
      .sort({ createdAt: -1 })
      .populate('author', 'name')
    
    res.json(news)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})


router.get('/search/:query', async (req, res) => {
  try {
    const news = await News.find({ 
      $text: { $search: req.params.query } 
    })
      .sort({ createdAt: -1 })
      .populate('author', 'name')
    
    res.json(news)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})


router.get('/user', protect, async (req, res) => {
  try {
    const news = await News.find({ author: req.user._id })
      .sort({ createdAt: -1 })
      .populate('author', 'name')
    
    res.json(news)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})


router.post('/', protect, async (req, res) => {
  try {
    const { title, summary, content, category, imageUrl, tags } = req.body

    const news = new News({
      title,
      summary,
      content,
      category,
      imageUrl,
      tags,
      author: req.user._id
    })

    const createdNews = await news.save()
    res.status(201).json(createdNews)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})


router.put('/:id', protect, async (req, res) => {
  try {
    const { title, summary, content, category, imageUrl, tags } = req.body

    const news = await News.findById(req.params.id)
    
    if (!news) {
      return res.status(404).json({ message: 'News article not found' })
    }

    if (news.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this news article' })
    }

    news.title = title || news.title
    news.summary = summary || news.summary
    news.content = content || news.content
    news.category = category || news.category
    news.imageUrl = imageUrl || news.imageUrl
    news.tags = tags || news.tags

    const updatedNews = await news.save()
    res.json(updatedNews)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})


router.delete('/:id', protect, async (req, res) => {
  try {
    const news = await News.findById(req.params.id)
    
    if (!news) {
      return res.status(404).json({ message: 'News article not found' })
    }

    if (news.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this news article' })
    }

    await news.deleteOne()
    res.json({ message: 'News article removed' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router