import { useEffect, useRef } from "react";
import { Star, Coffee } from "lucide-react";

interface Testimonial {
    name: string;
    text: string;
    rating: number;
    role: string;
}

const testimonials: Testimonial[] = [
    {
        name: "Anish Sharma",
        text: "Best coffee in Bharatpur! The V60 pour-over is absolutely divine. Cozy spot with great service — I come here every morning.",
        rating: 5,
        role: "Coffee Enthusiast",
    },
    {
        name: "Priya Thapa",
        text: "The ambiance is perfect for study sessions and catching up with friends. Their cold Americano is my absolute favorite!",
        rating: 5,
        role: "Regular Customer",
    },
    {
        name: "Rajesh Poudel",
        text: "Amazing cafe! The staff is super friendly and the milkshakes are incredible. Best place to hang out in Chitwan.",
        rating: 4,
        role: "Food Blogger",
    },
    {
        name: "Sita Gurung",
        text: "I love the warm, cozy vibes here. The iced mocha is heavenly and the sandwiches are fresh and delicious. Highly recommend!",
        rating: 5,
        role: "Local Guide",
    },
    {
        name: "David Chen",
        text: "Stopped by during our Chitwan trip and was blown away by the quality. World-class coffee in the heart of Nepal!",
        rating: 5,
        role: "Tourist",
    },
];

const Testimonial = () => {

    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const loadGsap = async () => {
            const gsap = (await import("gsap")).default;
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");
            gsap.registerPlugin(ScrollTrigger);

            gsap.fromTo(
                ".testimonial-card",
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.6, stagger: 0.15,
                    scrollTrigger: { trigger: ".testimonials-grid", start: "top 80%" },
                }
            );
        };
        loadGsap();
    }, []);

    return (
        <section id="testimonials" ref={sectionRef} className="section-padding bg-background" aria-label="Customer Reviews">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <div className="divider-coffee">
                        <Coffee className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="section-title">What Our Guests Say</h2>
                    <p className="section-subtitle">
                        Don't just take our word for it — hear from our happy customers.
                    </p>
                    {/* Average Rating */}
                    <div className="flex items-center justify-center gap-2 mt-4">
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Star
                                    key={s}
                                    className={`w-5 h-5 ${s <= 4 ? "text-amber-500 fill-amber-500" : "text-amber-500 fill-amber-500/40"}`}
                                />
                            ))}
                        </div>
                        <span className="font-body text-sm text-secondary">4.8 / 5 average from 120+ reviews</span>
                    </div>
                </div>

                <div className="testimonials-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            className="testimonial-card opacity-0 p-6 rounded-2xl bg-card border border-border card-hover"
                        >
                            <div className="flex items-center gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star
                                        key={s}
                                        className={`w-4 h-4 ${s <= t.rating ? "text-amber-500 fill-amber-500" : "text-amber-500"}`}
                                    />
                                ))}
                            </div>
                            <p className="font-body text-sm text-secondary leading-relaxed mb-4 italic">
                                "{t.text}"
                            </p>
                            <div>
                                <p className="font-display text-sm font-bold text-primary">{t.name}</p>
                                <p className="font-body text-xs text-secondary">{t.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default Testimonial