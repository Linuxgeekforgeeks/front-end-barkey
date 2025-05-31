import React from 'react'
import HeroCarousel from './HeroCarousel'
import FAQ from './FAQ'
import Newsletter from './NewsletterForm'
import Navbar from '../shared/commons/navbar/Navbar'
import Testimonials from './Testimonial'
import Footer from '../shared/commons/footer/Footer'

function IndexPage() {
  return (
    <div className='landing-container'>
      <Navbar/>
      <HeroCarousel/>
      <FAQ/>
      <Testimonials/>
      <Newsletter/>
      <Footer/>
    </div>
  )
}

export default IndexPage
