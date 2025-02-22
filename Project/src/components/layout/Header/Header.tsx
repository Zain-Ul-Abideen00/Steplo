"use client"
import { useState } from 'react'
import { TopBar } from './TopBar'
import { MainNav } from './MainNav'
import { MobileNav } from './MobileNav'
import { LoadingBar } from '@/components/ui/LoadingBar'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <LoadingBar />
      <header>
        <TopBar />
        <MainNav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <MobileNav isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      </header>
    </>
  )
}
