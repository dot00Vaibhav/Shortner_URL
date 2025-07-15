
import React from 'react'
import UrlForm from '../components/UrlForm'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-4">
    <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-white/20">
      <div className="text-center mb-8">
        <button className="group relative inline-flex items-center justify-center px-8 py-4 text-2xl font-bold text-white bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out overflow-hidden">
          <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative z-10 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent group-hover:from-white group-hover:to-white group-hover:text-white transition-all duration-300">
            URL Shortener
          </span>
        </button>
      </div>
      <UrlForm/>
    </div>
  </div>
  )
}

export default HomePage