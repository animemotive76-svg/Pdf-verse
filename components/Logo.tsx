
import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary dark:text-primary-foreground">
            <path d="M8 2H20L26 8V26C26 27.1046 25.1046 28 24 28H8C6.89543 28 6 27.1046 6 26V4C6 2.89543 6.89543 2 8 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 2V8H26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16.5 19L19 21.5L16.5 24" stroke="hsl(24.6 95% 53.1%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.5 19L10 21.5L12.5 24" stroke="hsl(24.6 95% 53.1%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 13L15.5 16L17 13" stroke="hsl(142.1 70.6% 45.3%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      <span className="font-bold text-xl text-primary dark:text-primary-foreground">PDFVerse</span>
    </div>
  );
};
