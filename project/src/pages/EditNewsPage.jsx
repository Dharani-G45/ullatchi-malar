import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import NewsForm from '../components/news/NewsForm'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const EditNewsPage = () => {
  const { id } = useParams()
  const [news, setNews] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const API_BASE_URL = import.meta.env.VITE_API_URL || "https://ullatchi-malar.onrender.com";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${API_BASE_URL}/api/news/${id}`)
        setNews(response.data)
      } catch (err) {
        setError('Failed to fetch news article')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [id])

  const handleUpdateNews = async (formData) => {
    try {
      await axios.put(`${API_BASE_URL}/api/news/${id}`, formData)
      return true
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update news article')
      throw err
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
      <div className="text-center py-8">
        <p className="text-gray-600">News article not found.</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 text-blue-600 hover:underline"
        >
          Back to Home
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit News Article</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <NewsForm 
          initialData={news} 
          onSubmit={handleUpdateNews} 
          isEditing={true} 
        />
      </div>
    </div>
  )
}

export default EditNewsPage
