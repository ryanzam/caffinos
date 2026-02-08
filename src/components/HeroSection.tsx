import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import heroImage from "../assets/hero-cafe.jpg";

const HeroSection = () => {
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const loadGsap = async () => {
            const gsap = (await import("gsap")).default;
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.fromTo(".hero-title", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, delay: 0.3 })
                .fromTo(".hero-slogan", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.6")
                .fromTo(".hero-tagline", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5")
                .fromTo(".hero-buttons", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
                .fromTo(".hero-scroll", { opacity: 0 }, { opacity: 1, duration: 0.8 }, "-=0.2");
        };
        loadGsap();
    }, []);

    const scrollToSection = (id: string) => {
        document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            id="home"
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            aria-label="Welcome to Caffinos"
        >
            {/* Background */}
            <div className="absolute inset-0">
                <img
                    src={heroImage}
                    alt="Caffinos - cozy coffee bar with steaming latte art in Bharatpur, Chitwan"
                    className="w-full h-full object-cover"
                    loading="eager"
                />
                <div
                    className="absolute inset-0"
                    style={{ background: "var(--gradient-hero)" }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                <p className="hero-slogan font-body text-sm md:text-base uppercase tracking-[0.3em] text-cream/70 mb-4 opacity-0">
                    ☕ Everything gets better with coffee
                </p>
                <h1 className="hero-title font-display text-5xl md:text-7xl lg:text-8xl font-bold text-cream leading-[0.95] mb-6 opacity-0">
                    Welcome to
                    <br />
                    <span className="text-gradient italic">Caffinos</span>
                </h1>
                <p className="hero-tagline font-body text-lg md:text-xl text-cream/80 max-w-2xl mx-auto mb-10 leading-relaxed opacity-0">
                    Your go-to spot for handcrafted drinks and unmatched vibes in Chitwan, Nepal.
                </p>
                <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0">
                    <button
                        onClick={() => scrollToSection("#menu")}
                        className="btn-primary-cafe"
                        aria-label="View our menu"
                    >
                        View Menu
                    </button>
                    <button
                        onClick={() => scrollToSection("#contact")}
                        className="btn-outline-cafe"
                        aria-label="Make a reservation"
                    >
                        Make a Reservation
                    </button>
                </div>
            </div>

            {/* Scroll indicator */}
            <button
                onClick={() => scrollToSection("#about")}
                className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/50 animate-float opacity-0"
                aria-label="Scroll to about section"
            >
                <ArrowDown className="w-6 h-6" />
            </button>
        </section>
    );
};

export default HeroSection;