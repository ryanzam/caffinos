import { useState, useEffect, useRef } from "react";
import { X, Coffee } from "lucide-react";

import heroImage from "../assets/hero-cafe.jpg";
import cafeInterior from "../assets/cafe-interior.jpg";
import v60Coffee from "../assets/v60-coffee.jpg";
import coldAmericano from "../assets/cold-americano.jpg";
import milkshake from "../assets/milkshake.jpg";
import latteArt from "../assets/latte-art.jpg";
import galleryCozy from "../assets/gallery-cozy.jpg";
import galleryBarista from "../assets/gallery-barista.jpg";
import lightBites from "../assets/light-bites.jpg";
import icedCoffee from "../assets/iced-coffee.jpg";

const galleryImages = [
    { src: cafeInterior, alt: "Cozy interior of Fareena's Cafe" },
    { src: latteArt, alt: "Beautiful latte art at Fareena's Cafe" },
    { src: galleryBarista, alt: "Barista crafting a V60 pour over coffee" },
    { src: galleryCozy, alt: "Happy customers enjoying coffee" },
    { src: coldAmericano, alt: "Refreshing cold Americano" },
    { src: v60Coffee, alt: "V60 pour over in progress" },
    { src: milkshake, alt: "Colorful milkshake with whipped cream" },
    { src: heroImage, alt: "Fareena's Cafe exterior at golden hour" },
    { src: lightBites, alt: "Delicious sandwich and coffee pairing" },
    { src: icedCoffee, alt: "Iced coffee with cream swirl" },
];

const GallerySection = () => {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const loadGsap = async () => {
            const gsap = (await import("gsap")).default;
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");
            gsap.registerPlugin(ScrollTrigger);

            gsap.fromTo(
                ".gallery-item",
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.6, stagger: 0.1,
                    scrollTrigger: { trigger: ".gallery-grid", start: "top 80%" },
                }
            );
        };
        loadGsap();
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedImage === null) return;
            if (e.key === "Escape") setSelectedImage(null);
            if (e.key === "ArrowRight") setSelectedImage((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null));
            if (e.key === "ArrowLeft") setSelectedImage((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null));
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedImage]);

    return (
        <section
            id="gallery"
            ref={sectionRef}
            className="section-padding"
            style={{ background: "var(--gradient-section)" }}
            aria-label="Photo Gallery"
        >
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <div className="divider-coffee">
                        <Coffee className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="section-title">Gallery</h2>
                    <p className="section-subtitle">
                        Peek into the warmth, vibes, and flavors of Caffinos.
                    </p>
                </div>

                {/* Masonry Grid */}
                <div className="gallery-grid columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    {galleryImages.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setSelectedImage(i)}
                            className="gallery-item opacity-0 break-inside-avoid block w-full rounded-xl overflow-hidden group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
                            aria-label={`View ${img.alt}`}
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                            />
                        </button>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {selectedImage !== null && (
                <div
                    className="fixed inset-0 z-[100] bg-coffee-dark/95 flex items-center justify-center p-4 animate-fade-in"
                    onClick={() => setSelectedImage(null)}
                    role="dialog"
                    aria-label="Image lightbox"
                >
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-6 right-6 text-cream/70 hover:text-cream transition-colors"
                        aria-label="Close lightbox"
                    >
                        <X className="w-8 h-8" />
                    </button>
                    <img
                        src={galleryImages[selectedImage].src}
                        alt={galleryImages[selectedImage].alt}
                        className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg animate-scale-in"
                        onClick={(e) => e.stopPropagation()}
                    />
                    {/* Nav arrows */}
                    <button
                        onClick={(e) => { e.stopPropagation(); setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length); }}
                        className="absolute left-4 md:left-8 text-cream/50 hover:text-cream text-4xl font-body transition-colors"
                        aria-label="Previous image"
                    >
                        ‹
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); setSelectedImage((selectedImage + 1) % galleryImages.length); }}
                        className="absolute right-4 md:right-8 text-cream/50 hover:text-cream text-4xl font-body transition-colors"
                        aria-label="Next image"
                    >
                        ›
                    </button>
                </div>
            )}
        </section>
    );
};

export default GallerySection;