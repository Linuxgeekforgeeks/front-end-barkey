import React from 'react'
import HeroCarousel from './HeroCarousel'
import FAQ from './FAQ'
import Newsletter from './NewsletterForm'
import Navbar from '../shared/commons/navbar/Navbar'

function IndexPage() {
  return (
    <div>
      <Navbar/>
      <HeroCarousel/>
      <FAQ/>
      <Newsletter/>
    </div>
  )
}

export default IndexPage
