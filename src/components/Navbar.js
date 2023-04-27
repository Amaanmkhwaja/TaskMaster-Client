import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../Firebase';

function Navbar() {

  let name, img;

  const getUser = JSON.parse(localStorage.getItem("user"));
  if (getUser) {
    const {displayName} = getUser
    name = displayName;
  }

  function handleSignOut() {
    auth.signOut()
      .then(() => {
        localStorage.removeItem('user');
      })
      .catch((error) => {
        // An error happened.
      });
  }

  return (
    <header className="bg-white">
        <div className='container mx-auto px-5 py-7 flex items-center justify-between'>
            <Link to="/">
                <h1 className="ml-16 text-black font-bold text-4xl ">TaskMaster</h1>
            </Link>
            {getUser && 
            <div className='flex items-center space-x-3'>
              <p className='text-black'>Welcome {name}</p>
              <button className='bg-[#1aac83] border-0 p-2.5 rounded cursor-pointer text-[#fff] mr-28' onClick={handleSignOut}>Sign Out</button>
            </div>
            }
        </div>
    </header>
  )
}

export default Navbar