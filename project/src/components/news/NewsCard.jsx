import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/helpers'

const NewsCard = ({ news }) => {
  return (
    <div className="card h-full flex flex-col">
      {news.imageUrl && (
        <div className="h-48 overflow-hidden">
          <img 
            src={news.imageUrl} 
            alt={news.title} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
      )}
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex items-center mb-2">
          <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {news.category}
          </span>
          <span className="text-xs text-gray-500 ml-2">
            {formatDate(news.createdAt)}
          </span>
        </div>
        
        <h3 className="text-xl font-bold mb-2 hover:text-blue-600">
          <Link to={`/news/${news._id}`}>{news.title}</Link>
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
          {news.summary}
        </p>
        
        <div className="mt-auto flex justify-between items-center">
          <Link to={`/news/${news._id}`} className="text-blue-600 hover:underline">
            Read more
          </Link>
          
          {news.tags && news.tags.length > 0 && (
            <div className="flex flex-wrap">
              {news.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="text-xs text-gray-500 mr-1">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NewsCard