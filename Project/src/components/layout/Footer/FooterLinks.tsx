"use client"
import { useState } from "react";
import { SocialIcons } from "./SocialIcons"
import Link from "next/link";

const footerLinks = {
  findStore: [
    { id: "fs1", name: "Find A Store", href: "/location" },
    { id: "fs2", name: "Become A Member", href: "/join-us" },
    { id: "fs3", name: "Sign Up for Email", href: "/join-us" },
    { id: "fs4", name: "Send Us Feedback", href: "/login" },
    { id: "fs5", name: "Student Discounts", href: "/help" },
  ],
  getHelp: [
    { id: "gh1", name: "Order Status", href: "/help" },
    { id: "gh2", name: "Delivery", href: "/help" },
    { id: "gh3", name: "Returns", href: "/help" },
    { id: "gh4", name: "Payment Options", href: "/help" },
    {
      id: "gh5",
      name: "Contact Us On Steplo.com Inquiries",
      href: "/help",
    },
    {
      id: "gh6",
      name: "Contact Us On All Other Inquiries",
      href: "/help",
    },
  ],
  aboutSteplo: [
    { id: "an1", name: "News", href: "#" },
    { id: "an2", name: "Careers", href: "#" },
    { id: "an3", name: "Investors", href: "#" },
    { id: "an4", name: "Sustainability", href: "#" },
  ],
};

export const FooterLinks = () => {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (title: string) => {
    setOpenSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  return (
    <div className="bg-[#111111] py-8 sm:py-10">
      <div className="mx-auto lg:flex lg:justify-between">
        {/* Desktop View */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Find A Store Column */}
          <div className="space-y-3">
            <h3 className="text-white text-[16px] font-medium uppercase">
              Find A Store
            </h3>
            <ul className="space-y-3">
              {footerLinks.findStore.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="text-[#7E7E7E] hover:text-white text-[14px] block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Help Column */}
          <div className="space-y-3">
            <h3 className="text-white text-[16px] font-medium uppercase">
              Get Help
            </h3>
            <ul className="space-y-3">
              {footerLinks.getHelp.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="text-[#7E7E7E] hover:text-white text-[14px] block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Steplo Column */}
          <div className="space-y-3">
            <h3 className="text-white text-[16px] font-medium uppercase">
              About Steplo
            </h3>
            <ul className="space-y-3">
              {footerLinks.aboutSteplo.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="text-[#7E7E7E] hover:text-white text-[14px] block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile/Tablet View */}
        <div className="lg:hidden w-full">
          {/* Find A Store Section */}
          <div className="border-b border-[#222]">
            <button
              onClick={() => toggleSection("findStore")}
              className="w-full py-4 flex justify-between items-center"
            >
              <h3 className="text-white text-[16px] font-medium uppercase">
                Find A Store
              </h3>
              <svg
                className={`w-4 h-4 transition-transform ${
                  openSections.includes("findStore") ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="white"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openSections.includes("findStore")
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <ul className="space-y-3 pb-4">
                {footerLinks.findStore.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className="text-[#7E7E7E] hover:text-white text-[14px] block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Get Help Section */}
          <div className="border-b border-[#222]">
            <button
              onClick={() => toggleSection("getHelp")}
              className="w-full py-4 flex justify-between items-center"
            >
              <h3 className="text-white text-[16px] font-medium uppercase">
                Get Help
              </h3>
              <svg
                className={`w-4 h-4 transition-transform ${
                  openSections.includes("getHelp") ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="white"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openSections.includes("getHelp")
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <ul className="space-y-3 pb-4">
                {footerLinks.getHelp.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className="text-[#7E7E7E] hover:text-white text-[14px] block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* About Steplo Section */}
          <div className="border-b border-[#222]">
            <button
              onClick={() => toggleSection("aboutSteplo")}
              className="w-full py-4 flex justify-between items-center"
            >
              <h3 className="text-white text-[16px] font-medium uppercase">
                About Steplo
              </h3>
              <svg
                className={`w-4 h-4 transition-transform ${
                  openSections.includes("aboutSteplo") ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="white"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openSections.includes("aboutSteplo")
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <ul className="space-y-3 pb-4">
                {footerLinks.aboutSteplo.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className="text-[#7E7E7E] hover:text-white text-[14px] block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 sm:justify-start mt-5 lg:justify-end">
          <SocialIcons />
        </div>
      </div>
    </div>
  );
};