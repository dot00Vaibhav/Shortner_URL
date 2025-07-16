
import React from 'react'
import UrlForm from '../components/UrlForm'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-3 sm:p-4 overflow-hidden">
    <div className="bg-secondary p-4 sm:p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-primary">
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center justify-center px-4 sm:px-8 py-2 sm:py-4 text-lg sm:text-2xl font-bold text-accent bg-secondary rounded-2xl shadow-lg border-2 border-accent hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out">
          <span className="text-accent">
            URL Shortener
          </span>
        </div>
      </div>
      <UrlForm/>
    </div>
  </div>
  )
}

export default HomePage