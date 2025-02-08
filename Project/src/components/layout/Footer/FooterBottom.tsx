import Link from 'next/link';
import { LocationIcon } from './LocationIcon'

export const FooterBottom = () => {
  return (
    <div className="bg-[#111111] py-6 border-t border-[#222222]">
      <div className="mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          {/* Left Side */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <span className="text-white">
                <LocationIcon />
              </span>
              <span className="text-white text-[12px]">Pakistan</span>
            </div>
            <span className="text-[#7E7E7E] text-[12px]">
              © 2025 Steplo, Inc. All Rights Reserved
            </span>
          </div>

          {/* Right Side */}
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <Link href="/help" className="text-[#7E7E7E] hover:text-white text-[12px]">
              Guides
            </Link>
            <Link href="/help" className="text-[#7E7E7E] hover:text-white text-[12px]">
              Terms of Sale
            </Link>
            <Link href="/help" className="text-[#7E7E7E] hover:text-white text-[12px]">
              Terms of Use
            </Link>
            <Link href="/help" className="text-[#7E7E7E] hover:text-white text-[12px]">
              Steplo Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};