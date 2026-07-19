import { useState } from 'react'
import axios from 'axios'
import NewsForm from '../components/news/NewsForm'

const CreateNewsPage = () => {
  const [error, setError] = useState(null)

  const handleCreateNews = async (formData) => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || "hhttps://ullatchi-malar-74kn.onrender.com";
      await axios.post(`${API_BASE_URL}/api/news`, formData)
      return true
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create news article')
      throw err
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create News Article</h1>
      
      {error && (
        <div className="p-4 mb-6 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <NewsForm onSubmit={handleCreateNews} />
      </div>
    </div>
  )
}

export default CreateNewsPage
