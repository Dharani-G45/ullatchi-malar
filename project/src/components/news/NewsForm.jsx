import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const categories = [
  'Technology', 'Business', 'Sports', 'Entertainment', 'Health', 'Science', 'Politics'
]

const NewsForm = ({ initialData, onSubmit, isEditing = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: 'Technology',
    imageUrl: '',
    tags: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        tags: initialData.tags ? initialData.tags.join(', ') : ''
      })
    }
  }, [initialData])

  const validate = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.summary.trim()) newErrors.summary = 'Summary is required'
    if (!formData.content.trim()) newErrors.content = 'Content is required'
    if (!formData.category) newErrors.category = 'Category is required'
    
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = validate()
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true)
      
      try {
        // Process tags from comma-separated string to array
        const processedData = {
          ...formData,
          tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : []
        }
        
        await onSubmit(processedData)
        navigate('/')
      } catch (error) {
        console.error('Error submitting form:', error)
        setErrors({ submit: error.message || 'Failed to submit the form' })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`input ${errors.title ? 'border-red-500' : ''}`}
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
      </div>
      
      <div>
        <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
          Summary
        </label>
        <input
          type="text"
          id="summary"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          className={`input ${errors.summary ? 'border-red-500' : ''}`}
        />
        {errors.summary && <p className="mt-1 text-sm text-red-600">{errors.summary}</p>}
      </div>
      
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          rows="8"
          value={formData.content}
          onChange={handleChange}
          className={`input ${errors.content ? 'border-red-500' : ''}`}
        ></textarea>
        {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
      </div>
      
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`input ${errors.category ? 'border-red-500' : ''}`}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
      </div>
      
      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
          Image URL
        </label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className="input"
          placeholder="https://example.com/image.jpg"
        />
      </div>
      
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
          Tags (comma separated)
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="input"
          placeholder="news, technology, update"
        />
      </div>
      
      {errors.submit && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {errors.submit}
        </div>
      )}
      
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : isEditing ? 'Update News' : 'Create News'}
        </button>
      </div>
    </form>
  )
}

export default NewsForm