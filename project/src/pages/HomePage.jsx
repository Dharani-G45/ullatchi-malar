import { useState, useEffect } from 'react'
import axios from 'axios'
import NewsCard from '../components/news/NewsCard'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const HomePage = () => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')
  
  const categories = ['all', 'technology', 'business', 'sports', 'entertainment', 'health']

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const API_BASE_URL = import.meta.env.VITE_API_URL || "https://ullatchi-malar-74kn.onrender.com";
        let url = `${API_BASE_URL}/api/news`
        
        if (activeCategory !== 'all') {
          url = `${API_BASE_URL}/api/news/category/${activeCategory}`
        }
        
        const response = await axios.get(url)
        setNews(response.data)
        setError(null)
      } catch (err) {
        setError('Failed to fetch news articles')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [activeCategory])

  return (
    <div>
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Latest News</h1>
        <p className="text-gray-600">Stay updated with the most recent news from around the world.</p>
      </section>
      
      <section className="mb-8">
        <div className="flex overflow-x-auto pb-2 space-x-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </section>
      
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      ) : news.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No news articles found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map(item => (
            <NewsCard key={item._id} news={item} />
          ))}
        </div>
      )}
    </div>
  )
}

export default HomePage
