import { FooterLinks } from './FooterLinks'
import { FooterBottom } from './FooterBottom'

export const Footer = () => {
  return (
    <footer className="bg-[#111111] text-white">
      <div className="mx-auto px-5 sm:px-10">
        <FooterLinks />
        <FooterBottom />
      </div>
    </footer>
  )
} 