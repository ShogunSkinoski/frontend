'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Building2, 
  ChevronDown, 
  Info, 
  BookOpen, 
  Mail, 
  Menu,
  X,
  Globe
} from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import LanguageDropdown from '../dropdown/language';
import CurrencyDropdown from '../dropdown/currency';

interface HeaderProps {
  className?: string;
  scrollThreshold?: number; // Scroll position to trigger color change
}

const landlords = [
  {
    name: 'London',
    href: '/landlord-london',
    flag: '🇬🇧'
  },
  {
    name: 'Paris',
    href: '/landlord-paris',
    flag: '🇫🇷'
  },
  {
    name: 'Algiers',
    href: '/landlord-algiers',
    flag: '🇩🇿'
  }
]

const Header: React.FC<HeaderProps> = ({ 
  className = '', 
  scrollThreshold = 24 
}) => {
  const [isLandlordsDropdownOpen, setIsLandlordsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollThreshold]);

  return (
    <>
      <header 
        className={`fixed left-0 right-0 w-full z-50 top-0 transition-all duration-300 ease-in-out ${
          isScrolled 
            ? 'fixed left-0 right-0 w-full z-50 top-0 bg-[#284E4C] shadow-sm' 
            : 'bg-[#FFFDF6] md:bg-transparent'
        } ${className}`}
        style={{ top: '0px' }}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-[88px]">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="flex items-center">
              <Image
                alt="The Flex"
                width={120}
                height={40}
                priority
                className={isScrolled ? "object-contain filter brightness-0 invert" : "object-contain"}
                src="/image.png"
              />
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <div className="relative">
                <DropdownMenu.Root open={isLandlordsDropdownOpen} onOpenChange={setIsLandlordsDropdownOpen} modal={false}>
                  <DropdownMenu.Trigger asChild>
                    <button  className={isScrolled ? "cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 font-medium text-white": "cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 font-medium text-[#333333]"}>
                      <Building2 className={isScrolled ? "h-4 w-4 mr-2 text-white" : "h-4 w-4 mr-2 text-[#333333]"} />
                      Landlords
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content className="absolute right-0 z-[200] mt-1 min-w-[8rem] overflow-hidden rounded-md p-1 text-popover-foreground bg-white border border-gray-200 shadow-lg" align="end">
                    {landlords.map((landlord) => (
                      <Link href={landlord.href} key={landlord.name}>
                        <DropdownMenu.Item className={isScrolled ? "cursor-pointer relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors cursor-pointer hover:bg-[#064749] hover:text-white focus:bg-[#064749] focus:text-white" : "cursor-pointer relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors cursor-pointer hover:bg-[#064749] hover:text-white focus:bg-[#064749] focus:text-white"}>
                          <span className={isScrolled ? "mr-2 text-white" : "mr-2 text-[#333333]"}>{landlord.flag}</span>
                          {landlord.name}
                        </DropdownMenu.Item>
                      </Link>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </div>

              {/* About Us */}
              <Link href="/about-us" className="font-medium text-[#333333]">
                <button className={isScrolled ? "cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 font-medium text-white" : "cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 font-medium text-[#333333]"}>
                  <Info className="h-4 w-4 mr-2" />
                  About Us
                </button>
              </Link>

              {/* Careers */}
              <Link href="/careers" className="font-semibold text-[#333333]">
                <button className={isScrolled ? "cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 font-medium text-white" : "cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 font-medium text-[#333333]"}>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Careers
                </button>
              </Link>

              {/* Contact */}
              <Link href="/contact" className="font-semibold text-[#333333]">
                <button className={isScrolled ? "cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 font-medium text-white" : "cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 font-medium text-[#333333]"}>
                  <Mail className="h-4 w-4 mr-2" />
                  Contact
                </button>
              </Link>

              <LanguageDropdown isScrolled={isScrolled} />
              <CurrencyDropdown isScrolled={isScrolled} />
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;