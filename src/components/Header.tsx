import { useState, useEffect } from "react";
import { Menu, X, Coffee, Facebook, Instagram } from "lucide-react";

const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Menu", href: "#menu" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
];

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? "bg-card/95 backdrop-blur-md shadow-lg py-3"
                : "bg-transparent py-5"
                }`}
            role="banner"
        >
            <nav className="container mx-auto flex items-center justify-between px-6" aria-label="Main navigation">
                {/* Logo */}
                <a
                    href="#home"
                    onClick={(e) => handleNavClick(e, "#home")}
                    className="flex items-center gap-2 group"
                    aria-label="Caffinos - Home"
                >
                    <Coffee
                        className={`w-7 h-7 transition-colors duration-300 ${isScrolled ? "text-primary" : "text-accent"
                            }`}
                    />
                    <span
                        className={`font-display text-xl md:text-2xl font-bold tracking-tight transition-colors duration-300 ${isScrolled ? "text-secondary" : "text-white"
                            }`}
                    >
                        Caffinos
                    </span>
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className={`text-sm font-body font-bold uppercase tracking-widest transition-colors duration-300 hover:text-yellow-600 ${isScrolled ? "text-secondary" : "text-white"
                                }`}
                        >
                            {link.label}
                        </a>
                    ))}
                    <div className="flex items-center gap-3 ml-4">
                        <a
                            href="https://facebook.com/fareenas_cafe"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                            className={`transition-colors duration-300 hover:text-yellow-600 ${isScrolled ? "text-secondary" : "text-white"
                                }`}
                        >
                            <Facebook className="w-4 h-4" />
                        </a>
                        <a
                            href="https://instagram.com/fareenas_cafe"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className={`transition-colors duration-300 hover:text-yellow-600 ${isScrolled ? "text-secondary" : "text-white"
                                }`}
                        >
                            <Instagram className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={`md:hidden transition-colors duration-300 ${isScrolled ? "text-secondary" : "text-white"
                        }`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMobileMenuOpen}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-card/98 backdrop-blur-lg border-t border-border animate-fade-in">
                    <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="text-sm font-body font-bold uppercase tracking-widest text-amber-500 hover:text-amber-800 transition-colors py-2"
                            >
                                {link.label}
                            </a>
                        ))}
                        <div className="flex items-center gap-4 pt-4 border-t border-border">
                            <a href="https://facebook.com/fareenas_cafe" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-amber-500 hover:text-amber-800">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="https://instagram.com/fareenas_cafe" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-amber-500 hover:text-amber-800">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
