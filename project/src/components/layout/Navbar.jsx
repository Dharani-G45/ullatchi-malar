import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

const Navbar = () => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-blue-600">உள்ளாட்சிமலர்</Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/category/technology" className="text-gray-700 hover:text-blue-600">Technology</Link>
            <Link to="/category/business" className="text-gray-700 hover:text-blue-600">Business</Link>
            <Link to="/category/sports" className="text-gray-700 hover:text-blue-600">Sports</Link>
            
            {currentUser ? (
              <>
                <Link to="/create-news" className="text-gray-700 hover:text-blue-600">Create News</Link>
                <div className="relative group">
                  <button className="flex items-center text-gray-700 hover:text-blue-600">
                    {currentUser.name}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
                <Link to="/register" className="btn btn-primary">Register</Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <Link to="/" className="block py-2 text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/category/technology" className="block py-2 text-gray-700 hover:text-blue-600">Technology</Link>
            <Link to="/category/business" className="block py-2 text-gray-700 hover:text-blue-600">Business</Link>
            <Link to="/category/sports" className="block py-2 text-gray-700 hover:text-blue-600">Sports</Link>
            
            {currentUser ? (
              <>
                <Link to="/create-news" className="block py-2 text-gray-700 hover:text-blue-600">Create News</Link>
                <Link to="/profile" className="block py-2 text-gray-700 hover:text-blue-600">Profile</Link>
                <button onClick={handleLogout} className="block py-2 text-gray-700 hover:text-blue-600">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2 text-gray-700 hover:text-blue-600">Login</Link>
                <Link to="/register" className="block py-2 text-gray-700 hover:text-blue-600">Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar