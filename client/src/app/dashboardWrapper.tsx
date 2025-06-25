import React from 'react'

const DashboardWrapper = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='flex min-h-screen w-full bg-gray-50 text-gray-900'>
      {/* Sidebar */}
      <main className={`flex w-full felx-col bg-gray-50 dark:bg-dark-bg`}></main>
    </div>
  )
}

export default DashboardWrapper