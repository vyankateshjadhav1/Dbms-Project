import React from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import {Link} from 'react-router-dom'
import list from '../../public/list.json'
import Cards from './Cards';


function Club() {
  return (
   <>
    <Navbar/>
        <div className='max-w-screen-2xl container mx-auto md:px-20 px-4'>
           <div className='mt-28 items-center justify-center text-center'>
           <h1 className='text-2xl font-semibold md:text-4xl'>We're delighted to have you {" "}
            <span className='text-pink-500'>Here! :)</span>
          </h1>
          <p className='mt-12'>
          Welcome to our college clubs application portal! Here, you can explore a diverse range of student clubs, each offering unique opportunities for growth, connection, and fun. Whether you're passionate about arts, sports, academics, or community service, there's a club for you. Join us and make your college experience unforgettable!
          </p>

          <Link to={'/'}>
                <button className='mt-6 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-pink-800'>Back</button>
          </Link>
           </div>

           <div className='mt-12 grid grid-cols-1 md:grid-cols-4'>
            {list.map((item) => (
              <Cards  key={item.id} item={item}/>
            ))}
        </div>
        

        </div>
         <Footer/>   
   </>
  )
}

export default Club
