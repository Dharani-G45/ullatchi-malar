import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id },"NewsSite", {
    expiresIn: '30d'
  })
}

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Check if user already exists
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password
    })

    if (user) {
      // Generate token
      const token = generateToken(user._id)

      res.status(201).json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      })
    } else {
      res.status(400).json({ message: 'Invalid user data' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    
    const user = await User.findOne({ email })
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }


    const isMatch = await user.comparePassword(password)
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

   
    const token = generateToken(user._id)

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router