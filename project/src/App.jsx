import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import ProtectedRoute from './components/auth/ProtectedRoute'
import LoadingSpinner from './components/ui/LoadingSpinner'

// Lazy loaded components
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const NewsDetailPage = lazy(() => import('./pages/NewsDetailPage'))
const CreateNewsPage = lazy(() => import('./pages/CreateNewsPage'))
const EditNewsPage = lazy(() => import('./pages/EditNewsPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const CategoryPage = lazy(() => import('./pages/CategoryPage'))

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/news/:id" element={<NewsDetailPage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/create-news" element={<CreateNewsPage />} />
              <Route path="/edit-news/:id" element={<EditNewsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App