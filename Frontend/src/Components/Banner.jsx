import React from 'react'
import {Carousel} from 'react-bootstrap'

const Banner = () => {
    return (
        <>
            <Carousel>
                <Carousel.Item interval={1000}>
                    <img
                        className="d-block height-600px w-100"
                        src="https://images.pexels.com/photos/333850/pexels-photo-333850.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>This is the first slide!</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                        className="d-block height-600px w-100"
                        src="https://images.pexels.com/photos/1480688/pexels-photo-1480688.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block height-600px w-100"
                        src="https://images.pexels.com/photos/1480687/pexels-photo-1480687.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block height-600px w-100"
                        src="https://images.pexels.com/photos/1480689/pexels-photo-1480689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Fourth slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            

        <div className='max-w-srceen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10'>

            <div >
                
                <div className='space-y-9'>
                <h1 className='text-4xl font-bold mt-5'>
                    <span className='text-red-500'>Why Clubs@Viit ?</span>
                </h1>

                <p className='text-xl'>
                    Welcome to Bookworm, your haven for literary exploration! Step into a world where pages come alive and stories transport you to new realms.Embrace the joy of reading with us at Bookworm, where every book is a gateway to imagination. Happy reading!lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet, consectetur adipiscing elit 
                    lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>



                </div>
            </div>









        </div>
        

        </>
    )
}

export default Banner