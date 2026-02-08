import { useEffect, useRef } from "react";
import { MapPin, Clock, Phone, Coffee } from "lucide-react";
import cafeInterior from "../assets/cafe-interior.jpg";

const AboutSection = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const loadGsap = async () => {
            const gsap = (await import("gsap")).default;
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");
            gsap.registerPlugin(ScrollTrigger);

            const ctx = gsap.context(() => {
                gsap.fromTo(
                    ".about-image",
                    { x: -60, opacity: 0 },
                    {
                        x: 0, opacity: 1, duration: 1,
                        scrollTrigger: { trigger: ".about-image", start: "top 80%" },
                    }
                );
                gsap.fromTo(
                    ".about-content",
                    { x: 60, opacity: 0 },
                    {
                        x: 0, opacity: 1, duration: 1,
                        scrollTrigger: { trigger: ".about-content", start: "top 80%" },
                    }
                );
                gsap.fromTo(
                    ".about-info-card",
                    { y: 30, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 0.6, stagger: 0.15,
                        scrollTrigger: { trigger: ".about-info-cards", start: "top 85%" },
                    }
                );
            }, sectionRef);

            return () => ctx.revert();
        };
        loadGsap();
    }, []);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="section-padding"
            style={{ background: "var(--gradient-section)" }}
            aria-label="About Caffinos"
        >
            <div className="container mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="divider-coffee">
                        <Coffee className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="section-title">Our Story</h2>
                    <p className="section-subtitle">
                        A pure coffee bar focused on quality brews and creating memorable moments.
                    </p>
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
                    {/* Image */}
                    <div className="about-image opacity-0">
                        <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "var(--shadow-elevated)" }}>
                            <img
                                src={cafeInterior}
                                alt="Cozy interior of Fareena's Cafe with warm lighting and wooden elements"
                                className="w-full h-100 lg:h-125 object-cover"
                                loading="lazy"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-amber-900/80 to-transparent">
                                <p className="font-display text-cream text-lg italic">
                                    "Where every cup tells a story"
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Text */}
                    <div className="about-content opacity-0">
                        <h3 className="font-display text-2xl md:text-3xl font-bold text-primary mb-6">
                            More Than Just Coffee
                        </h3>
                        <p className="font-body text-secondary leading-relaxed mb-6">
                            Nestled in the heart of Bharatpur, Chitwan, Fareena's Cafe is your sanctuary for handcrafted beverages and warm hospitality. We believe that every cup of coffee is an experience — from our meticulous V60 pour-overs to our refreshing cold Americanos.
                        </p>
                        <p className="font-body text-secondary leading-relaxed mb-8">
                            Whether you're here for a quiet morning brew, a catch-up with friends, or simply to soak in the cozy vibes, we promise an atmosphere that makes everything better with coffee.
                        </p>

                        {/* Info Cards */}
                        <div className="about-info-cards grid sm:grid-cols-2 gap-4">
                            <div className="about-info-card p-4 rounded-xl bg-card border border-border" style={{ boxShadow: "var(--shadow-card)" }}>
                                <MapPin className="w-5 h-5 text-primary mb-2" />
                                <p className="font-body text-sm font-bold text-primary">Location</p>
                                <p className="font-body text-xs text-secondary">Barmeli Tole, Hakimchowk, Bharatpur-11, Chitwan</p>
                            </div>
                            <div className="about-info-card p-4 rounded-xl bg-card border border-border" style={{ boxShadow: "var(--shadow-card)" }}>
                                <Clock className="w-5 h-5 text-primary mb-2" />
                                <p className="font-body text-sm font-bold text-primary">Opening Hours</p>
                                <p className="font-body text-xs text-secondary">Daily: 7:00 AM – 9:00 PM</p>
                            </div>
                            <div className="about-info-card p-4 rounded-xl bg-card border border-border" style={{ boxShadow: "var(--shadow-card)" }}>
                                <Phone className="w-5 h-5 text-primary mb-2" />
                                <p className="font-body text-sm font-bold text-primary">Reservations</p>
                                <p className="font-body text-xs text-secondary">Call: 9855086190</p>
                            </div>
                            <div className="about-info-card p-4 rounded-xl bg-card border border-border" style={{ boxShadow: "var(--shadow-card)" }}>
                                <Coffee className="w-5 h-5 text-primary mb-2" />
                                <p className="font-body text-sm font-bold text-primary">Services</p>
                                <p className="font-body text-xs text-secondary">Dine-in · Takeaway · Reservations</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Google Map */}
                <div className="rounded-2xl overflow-hidden border border-amber-200" style={{ boxShadow: "var(--shadow-card)" }}>
                    <iframe
                        title="Fareena's Cafe Location on Google Maps"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.5!2d84.4455346!3d27.6937702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3994e52b41a5dbe3%3A0x3da37a8d8468f051!2sFareena%E2%80%99s%20cafe!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
                        className="w-full h-[300px] md:h-[400px]"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </section>
    );
};

export default AboutSection;