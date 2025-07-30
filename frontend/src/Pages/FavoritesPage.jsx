import React from 'react'
import FavoritePosts from '../components/FavoritePosts/FavoritePosts'

const FavoritesPage = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto'>
        <FavoritePosts />
    </div>
  )
}

export default FavoritesPage