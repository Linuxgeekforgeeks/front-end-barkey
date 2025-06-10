"use client"
import React, { useState } from 'react'
import HeroCarousel from './HeroCarousel'
import FAQ from './FAQ'
import Newsletter from './NewsletterForm'
import Testimonials from './Testimonial'
import Footer from '../shared/commons/footer/Footer'
import WelcomeSection from './WelcomeSection'
import Header from '../shared/commons/header/Header'
import { useModalStore } from '@/stores/modal.store'
import VideoModal from './VideoModal'

function IndexPage() {
  const {isVideoOpened}=useModalStore()
  return (
    <div className='landing-container'>
     <Header/>
     {isVideoOpened && <VideoModal/>}
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
