import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">உள்ளாட்சிமலர்</h3>
            <p className="text-gray-300">
              Your trusted source for the latest news and updates from around the world.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/category/technology" className="text-gray-300 hover:text-white">Technology</Link></li>
              <li><Link to="/category/business" className="text-gray-300 hover:text-white">Business</Link></li>
              <li><Link to="/category/sports" className="text-gray-300 hover:text-white">Sports</Link></li>
              <li><Link to="/category/entertainment" className="text-gray-300 hover:text-white">Entertainment</Link></li>
              <li><Link to="/category/health" className="text-gray-300 hover:text-white">Health</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-300">
          <p>&copy; {currentYear} உள்ளாட்சிமலர். All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer