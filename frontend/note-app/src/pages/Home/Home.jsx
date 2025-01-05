import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <div className="container mx-auto">
        <NoteCard/>
      </div>
    </div>
  )
}

export default Home

