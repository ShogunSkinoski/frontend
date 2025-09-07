import React, { useState } from 'react';

const LanguageDropdown = ({ className = '' , isScrolled = false}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    flag: '🇬🇧',
    name: 'English',
    code: 'en'
  });

  const languages = [
    { flag: '🇬🇧', name: 'English', code: 'en' },
    { flag: '🇫🇷', name: 'Français', code: 'fr' },
    { flag: '🇪🇸', name: 'Español', code: 'es' },
    { flag: '🇩🇿', name: 'العربية', code: 'ar' },
    { flag: '🇨🇳', name: '中文', code: 'zh' }
  ];

  const handleLanguageSelect = (language: { flag: string, name: string, code: string }) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className} `}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 font-medium text-[#333333]"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className={isScrolled ? "pr-4 text-white" : "pr-4 text-[#333333]"}>{selectedLanguage.flag}</span>
        <span className={isScrolled ? "text-white" : "text-[#333333]"}>{selectedLanguage.name}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Content */}
          <div
            className="absolute right-0 z-20 mt-2 min-w-[8rem] overflow-hidden rounded-md bg-white border border-gray-200 shadow-lg p-1"
            role="menu"
            aria-orientation="vertical"
          >
            {languages.map((language) => (
              <div
                key={language.code}
                role="menuitem"
                className={`relative select-none text-sm outline-none transition-colors flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-[#064749] hover:text-white ${
                  selectedLanguage.code === language.code 
                    ? 'bg-[#064749]/10' 
                    : ''
                }`}
                onClick={() => handleLanguageSelect(language)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleLanguageSelect(language);
                  }
                }}
              >
                <span className="text-2xl">{language.flag}</span>
                <span className="font-medium">{language.name}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageDropdown;