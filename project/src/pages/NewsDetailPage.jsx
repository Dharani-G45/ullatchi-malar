import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { formatDate } from '../utils/helpers'

const NewsDetailPage = () => {
  const { id } = useParams()
  const [news, setNews] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setLoading(true)
        const API_BASE_URL = import.meta.env.VITE_API_URL || "https://ullatchi-malar.onrender.com";
        const response = await axios.get(`${API_BASE_URL}/api/news/${id}`)
        setNews(response.data)
      } catch (err) {
        setError('Failed to fetch news details')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchNewsDetail()
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this news article?')) {
      return
    }

    try {
      setDeleteLoading(true)
      const API_BASE_URL = import.meta.env.VITE_API_URL || "https://ullatchi-malar.onrender.com";
      await axios.delete(`${API_BASE_URL}/api/news/${id}`)
      navigate('/')
    } catch (err) {
      setError('Failed to delete news article')
      console.error(err)
    } finally {
      setDeleteLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-md">
        {error}
      </div>
    )
  }

  if (!news) {
    return (
      <div className="text-center py-8 hover:scale-105">
        <p className="text-gray-600">News article not found.</p>
        <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
          Back to Home
        </Link>
      </div>
    )
  }

  const isAuthor = currentUser && news.author && currentUser._id === news.author._id

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to="/" className="text-blue-600 hover:underline flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Home
        </Link>
      </div>
      
      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        {news.imageUrl && (
          <div className="h-64 md:h-96 overflow-hidden">
            <img 
              src={news.imageUrl} 
              alt={news.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center mb-4">
            <span className="text-sm font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {news.category}
            </span>
            <span className="text-sm text-gray-500 ml-3">
              {formatDate(news.createdAt)}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
          
          {news.author && (
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-semibold">
                  {news.author.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="ml-3">
                <p className="font-medium">{news.author.name}</p>
              </div>
            </div>
          )}
          
          <div className="prose max-w-none mb-6">
            <p className="text-lg font-medium text-gray-700 mb-4">{news.summary}</p>
            <div className="whitespace-pre-line text-gray-700">
              {news.content}
            </div>
          </div>
          
          {news.tags && news.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {news.tags.map((tag, index) => (
                <span key={index} className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  #{tag}
                </span>
              ))}
            </div>
          )}
          
          {isAuthor && (
            <div className="flex space-x-4 mt-8">
              <Link 
                to={`/edit-news/${news._id}`} 
                className="btn btn-secondary"
              >
                Edit
              </Link>
              <button 
                onClick={handleDelete} 
                className="btn bg-red-600 text-white hover:bg-red-700"
                disabled={deleteLoading}
              >
                {deleteLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          )}
        </div>
      </article>
    </div>
  )
}

export default NewsDetailPage
