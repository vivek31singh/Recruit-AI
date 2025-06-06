import React from 'react'

export const generateMetadata = () => {
    return {
        title: 'Dashboard',
    }
}

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <>{children}</>
  )
}

export default layout