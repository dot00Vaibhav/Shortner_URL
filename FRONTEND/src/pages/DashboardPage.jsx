import React from 'react'
import UrlForm from '../components/UrlForm'
import UserUrl from '../components/UserUrl'

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-start p-3 sm:p-4 overflow-y-auto">
    <div className="bg-secondary mt-4 sm:mt-7 p-4 sm:p-8 rounded-lg shadow-md
       w-full max-w-4xl border border-primary">
      <h1 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-accent">URL Shortener Dashboard</h1>
      <UrlForm/>
      <UserUrl/>
    </div>
  </div>
  )
}

export default DashboardPage