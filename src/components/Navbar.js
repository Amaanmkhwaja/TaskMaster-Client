import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className="bg-white">
        <div className='container mx-auto px-5 py-7'>
            <Link to="/">
                <h1 className="ml-16 text-black font-bold text-4xl">TaskMaster</h1>
            </Link>
        </div>
    </header>
  )
}

export default Navbar