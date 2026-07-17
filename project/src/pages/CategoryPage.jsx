import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import NewsCard from '../components/news/NewsCard'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const CategoryPage = () => {
  const { category } = useParams()
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNewsByCategory = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`http://localhost:5000/api/news/category/${category}`)
        setNews(response.data)
      } catch (err) {
        setError('Failed to fetch news articles')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchNewsByCategory()
  }, [category])

  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1)

  return (
    <div>
      <div className="mb-6">
        <Link to="/" className="text-blue-600 hover:underline flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Home
        </Link>
      </div>
      
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{categoryTitle} News</h1>
        <p className="text-gray-600">Latest news articles in the {categoryTitle} category.</p>
      </section>
      
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      ) : news.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No news articles found in this category.</p>
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

export default CategoryPage