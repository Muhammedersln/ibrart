'use client';
import { useState, useEffect, useRef } from 'react';
import { FaInstagram, FaTiktok, FaYoutube, FaShareAlt } from 'react-icons/fa';

const SocialMediaBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const socialLinks = [
    {
      icon: <FaInstagram size={24} />,
      url: 'https://instagram.com/ibrart',
      label: 'Instagram',
      hoverColor: 'hover:text-pink-600'
    },
    {
      icon: <FaTiktok size={24} />,
      url: 'https://tiktok.com/@ibrart',
      label: 'TikTok',
      hoverColor: 'hover:text-black'
    },
    {
      icon: <FaYoutube size={24} />,
      url: 'https://youtube.com/@ibrart',
      label: 'YouTube',
      hoverColor: 'hover:text-red-600'
    }
  ];

  const SocialLinks = () => (
    <div className="flex flex-col gap-5">
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-4 p-2 rounded-xl
            text-primary/80 ${link.hoverColor}
            transition-all duration-300 hover:translate-x-2
            hover:bg-cream/30 group`}
        >
          <div className="transform transition-transform duration-300 
            group-hover:scale-110 group-hover:rotate-6">
            {link.icon}
          </div>
          <span className="font-medium tracking-wide whitespace-nowrap">
            {link.label}
          </span>
        </a>
      ))}
    </div>
  );

  return (
    <div ref={menuRef} 
      className={`fixed md:left-0 left-4 z-50
        md:top-1/2 md:-translate-y-1/2 
        bottom-24 flex md:items-center`}
    >
      {/* Ana buton */}
      <div 
        className={`bg-primary/90 backdrop-blur-sm text-white cursor-pointer
          hover:bg-primary transition-all duration-300 
          md:rounded-r-xl rounded-xl shadow-lg hover:shadow-xl
          flex items-center justify-center select-none
          ${isOpen ? 'bg-primary shadow-xl' : ''}`}
      >
        {/* Mobil için ikon */}
        <div 
          className="md:hidden p-3"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaShareAlt 
            size={20} 
            className={`transform transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
          />
        </div>

        {/* Desktop için yazı */}
        <div 
          className="hidden md:flex px-3 py-5"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="rotate-180 whitespace-nowrap tracking-wider text-base font-medium" 
            style={{ writingMode: 'vertical-rl' }}>
            SOSYAL MEDYA
          </span>
        </div>
      </div>

      {/* Mobil Panel */}
      <div className="md:hidden">
        {isOpen && (
          <div className="absolute bg-white/95 backdrop-blur-md shadow-2xl 
            border border-cream-dark/10 p-6
            transition-all duration-300 animate-fade-in
            left-0 bottom-full mb-2 rounded-2xl w-max">
            <SocialLinks />
          </div>
        )}
      </div>

      {/* Desktop Panel */}
      <div className="hidden md:block">
        {isOpen && (
          <div className="absolute bg-white/95 backdrop-blur-md shadow-2xl 
            border border-cream-dark/10 p-6
            transition-all duration-300 animate-fade-in
            left-14 top-1/2 -translate-y-1/2 rounded-2xl w-max">
            <SocialLinks />
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialMediaBar; 