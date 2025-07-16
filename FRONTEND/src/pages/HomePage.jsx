
import React from 'react'
import UrlForm from '../components/UrlForm'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-blue-200">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center px-8 py-4 text-2xl font-bold text-blue-600 bg-white rounded-2xl shadow-lg border-2 border-blue-500 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out">
          <span className="text-blue-600">
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