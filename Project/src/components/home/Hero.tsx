import React from 'react'
import { HeroSection } from './HeroSection'
import { BestOfAirMax } from './BestOfAirMax'
import { Featured } from './Featured'
import { GearUp } from './GearUp'
import { DontMiss } from './DontMiss'
import { TheEssentials } from './TheEssentials'
import { FooterNav } from './FooterNav'

const Hero = () => {
  return (
    <>
      <HeroSection />
      <BestOfAirMax />
      <Featured />
      <GearUp />
      <DontMiss />
      <TheEssentials />
      <FooterNav />
    </>
  )
}

export default Hero