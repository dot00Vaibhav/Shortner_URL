import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllUserUrls } from '../api/user.api'

const UserUrl = () => {
  const { data: urls, isLoading, isError, error } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getAllUserUrls,
    refetchInterval: 30000, // Refetch every 30 seconds to update click counts
    staleTime: 0, // Consider data stale immediately so it refetches when invalidated
  })
  const [copiedId, setCopiedId] = useState(null)
  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopiedId(null)
    }, 2000)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
        Error loading your URLs: {error.message}
      </div>
    )
  }

  if (!urls.urls || urls.urls.length === 0) {
    return (
      <div className="text-center text-secondary my-6 p-4 bg-tertiary rounded-lg border border-primary">
        <svg className="w-12 h-12 mx-auto text-secondary mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
        <p className="text-lg font-medium">No URLs found</p>
        <p className="mt-1">You haven't created any shortened URLs yet.</p>
      </div>
    )
  }

  return (
    <div className="bg-secondary rounded-lg mt-5 shadow-md overflow-hidden border border-primary">

      <div className="overflow-x-auto h-56">
        <table className="min-w-full divide-y divide-primary">
          <thead className="bg-tertiary">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                Original URL
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                Short URL
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                Clicks
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-secondary divide-y divide-primary">
            {urls.urls.reverse().map((url) => (
              <tr key={url._id} className="hover:bg-tertiary">
                <td className="px-6 py-4">
                  <div className="text-sm text-primary truncate max-w-xs">
                    {url.full_url}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <a
                      href={`${import.meta.env.VITE_BACKEND_URL}/${url.short_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-blue-800 hover:underline"
                    >
                      {`${import.meta.env.VITE_BACKEND_URL.split('//')[1]}/${url.short_url}`}
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-primary">
                    <div className="flex items-center justify-center">
                      <span className="relative inline-flex items-center px-3 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                        <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="font-extrabold text-sm">{url.clicks}</span>
                        <span className="ml-1 text-xs opacity-90">{url.clicks === 1 ? 'click' : 'clicks'}</span>
                        {url.clicks > 0 && (
                          <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        )}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <button
                    onClick={() => handleCopy(`${import.meta.env.VITE_BACKEND_URL}/${url.short_url}`, url._id)}
                    className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm cursor-pointer ${
                      copiedId === url._id
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200`}
                  >
                    {copiedId === url._id ? (
                      <>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                        </svg>
                        Copy URL
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserUrl