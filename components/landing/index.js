import React from 'react'
import HeroCarousel from './HeroCarousel'
import FAQ from './FAQ'
import Newsletter from './NewsletterForm'
import Testimonials from './Testimonial'
import Footer from '../shared/commons/footer/Footer'
import WelcomeSection from './WelcomeSection'
import Header from '../shared/commons/header/Header'

function IndexPage() {
  return (
    <div className='landing-container'>
     <Header/>
      <WelcomeSection/>
      <HeroCarousel/>
      <FAQ/>
      <Testimonials/>
      <Newsletter/>
      <Footer/>
    </div>
  )
}

export default IndexPage
