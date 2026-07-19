import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import NewsCard from '../components/news/NewsCard'

const ProfilePage = () => {
  const { currentUser } = useAuth()
  const [userNews, setUserNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserNews = async () => {
      try {
        setLoading(true)
        const API_BASE_URL = import.meta.env.VITE_API_URL || "https://ullatchi-malar-74kn.onrender.com";
        const response = await axios.get(`${API_BASE_URL}/api/news/user`)
        setUserNews(response.data)
      } catch (err) {
        setError('Failed to fetch your news articles')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserNews()
  }, [])

  if (!currentUser) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Please login to view your profile.</p>
        <Link to="/login" className="mt-4 btn btn-primary inline-block">
          Login
        </Link>
      </div>
    )
  }

  return (
    <div>
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-600">
                {currentUser.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold">{currentUser.name}</h2>
              <p className="text-gray-600">{currentUser.email}</p>
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your News Articles</h2>
          <Link to="/create-news" className="btn btn-primary">
            Create New Article
          </Link>
        </div>
        
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        ) : userNews.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow-md">
            <p className="text-gray-600 mb-4">You haven't published any news articles yet.</p>
            <Link to="/create-news" className="btn btn-primary">
              Create Your First Article
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userNews.map(item => (
              <NewsCard key={item._id} news={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default ProfilePage
