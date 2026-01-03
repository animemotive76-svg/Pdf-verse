
import React from 'react';
import { Logo } from './Logo';
import { MenuIcon, XIcon, FileTextIcon, SunIcon, MoonIcon } from './icons/Icons';

interface HeaderProps {
    pdfFile: File | null;
    onClearPdf: () => void;
    onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ pdfFile, onClearPdf, onToggleSidebar }) => {
    const [isDarkMode, setIsDarkMode] = React.useState(false);

    React.useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDarkMode(false);
        }
    }, []);

    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        }
        setIsDarkMode(!isDarkMode);
    };

    return (
        <header className="flex-shrink-0 h-16 bg-secondary dark:bg-primary border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 md:px-6">
            <div className="flex items-center">
                <button onClick={onToggleSidebar} className="md:hidden mr-4 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                    <MenuIcon />
                </button>
                <div className="hidden md:block">
                    <Logo />
                </div>
            </div>

            {pdfFile && (
                <div className="flex items-center gap-2 text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg">
                    <FileTextIcon className="text-gray-500" />
                    <span className="font-medium truncate max-w-xs">{pdfFile.name}</span>
                    <button onClick={onClearPdf} className="ml-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                        <XIcon />
                    </button>
                </div>
            )}

            <div className="flex items-center gap-4">
                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    {isDarkMode ? <SunIcon /> : <MoonIcon />}
                </button>
                <a href="#" className="hidden sm:inline-block px-4 py-2 text-sm font-semibold text-accent-foreground bg-accent rounded-md hover:opacity-90">
                    Get Started
                </a>
            </div>
        </header>
    );
};
