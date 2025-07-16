import React, { useState } from 'react'
import { createShortUrl } from '../api/shortUrl.api'
import { useSelector } from 'react-redux'
import { QueryClient } from '@tanstack/react-query'
import { queryClient } from '../main'

const UrlForm = () => {
  
  const [url, setUrl] = useState("https://www.google.com")
  const [shortUrl, setShortUrl] = useState()
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(null)
  const [customSlug, setCustomSlug] = useState("")
  const {isAuthenticated} = useSelector((state) => state.auth)

  const handleSubmit = async () => {
    try{
      const shortUrl = await createShortUrl(url,customSlug)
      setShortUrl(shortUrl)
      queryClient.invalidateQueries({queryKey: ['userUrls']})
      setError(null)
    }catch(err){
      setError(err.message)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="space-y-6">
        <div className="relative w-full">
          <label htmlFor="url" className="flex items-center text-sm font-semibold text-blue-800 mb-2">
            <span className="mr-2">🔗</span>
            Enter your URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onInput={(event)=>setUrl(event.target.value)}
            placeholder="https://example.com"
            required
            className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-blue-50 hover:bg-white text-blue-900 placeholder-blue-400"
          />
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <span className="flex items-center justify-center">
            Shorten URL
          </span>
        </button>
         {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-xl border-l-4 border-red-500 shadow-md">
            <div className="flex items-center">
              <span className="mr-2">❌</span>
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}
        {isAuthenticated && (
          <div className="relative">
            <label htmlFor="customSlug" className="flex items-center text-sm font-semibold text-blue-800 mb-2">
              <span className="mr-2">🎯</span>
              Custom URL (optional)
            </label>
            <input
              type="text"
              id="customSlug"
              value={customSlug}
              onChange={(event) => setCustomSlug(event.target.value)}
              placeholder="Enter custom slug"
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-blue-50 hover:bg-white text-blue-900 placeholder-blue-400"
            />
          </div>
        )}
        {shortUrl && (
          <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-200 shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-blue-800 flex items-center">
              <span className="mr-2">🎉</span>
              Your shortened URL:
              <span className="ml-2">🎉</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <input
                type="text"
                readOnly
                value={shortUrl}
                className="flex-1 p-3 border-2 border-blue-200 rounded-xl bg-white text-blue-800 font-mono text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
               <button
                onClick={handleCopy}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg cursor-pointer ${
                  copied
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                <span className="flex items-center justify-center">
                  <span className="mr-2">{copied ? '✅' : '📋'}</span>
                  {copied ? 'Copied!' : 'Copy'}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
  )
}

export default UrlForm