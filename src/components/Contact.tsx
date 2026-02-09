import { useState, useEffect, useRef } from "react";
import { Send, Phone, Mail, MapPin, Coffee } from "lucide-react";

const Contact = () => {
    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
    const [newsletter, setNewsletter] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const loadGsap = async () => {
            const gsap = (await import("gsap")).default;
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");
            gsap.registerPlugin(ScrollTrigger);

            gsap.fromTo(
                ".contact-form-wrapper",
                { x: -50, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 0.8,
                    scrollTrigger: { trigger: ".contact-form-wrapper", start: "top 80%" },
                }
            );
            gsap.fromTo(
                ".contact-info",
                { x: 50, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 0.8,
                    scrollTrigger: { trigger: ".contact-info", start: "top 80%" },
                }
            );
        };
        loadGsap();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setForm({ name: "", email: "", phone: "", message: "" });
    };

    return (
        <section id="contact" ref={sectionRef} className="section-padding bg-background" aria-label="Contact Us">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <div className="divider-coffee">
                        <Coffee className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="section-title">Get in Touch</h2>
                    <p className="section-subtitle">
                        Have a question, want to reserve a table, or just say hello? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Form */}
                    <div className="contact-form-wrapper opacity-0">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="name" className="font-body text-sm font-bold text-primary mb-1 block">
                                    Name *
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-primary/80 bg-card font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                                    placeholder="Your name"
                                />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="email" className="font-body text-sm font-bold text-primary mb-1 block">
                                        Email *
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-primary/80 bg-card font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="font-body text-sm font-bold text-primary mb-1 block">
                                        Phone
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-primary/80 bg-card font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                                        placeholder="98XXXXXXXX"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="message" className="font-body text-sm font-bold text-primary mb-1 block">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    required
                                    rows={4}
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-primary/80 bg-card font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                                    placeholder="Your message or reservation details..."
                                />
                            </div>
                            <button type="submit" className="btn-primary-cafe text-white flex items-center gap-2">
                                <Send className="w-4 h-4" />
                                {submitted ? "Sent! Thank you ☕" : "Send Message"}
                            </button>
                        </form>

                        {/* Newsletter */}
                        <div className="mt-8 p-6 rounded-2xl bg-secondary/50 border border-primary/80">
                            <h3 className="font-display text-lg font-bold text-primary mb-2">Stay Updated</h3>
                            <p className="font-body text-sm text-muted-foreground mb-4">
                                Subscribe to our newsletter for exclusive promotions and new menu drops.
                            </p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    value={newsletter}
                                    onChange={(e) => setNewsletter(e.target.value)}
                                    className="flex-1 px-4 py-2 rounded-full border border-primary/80 bg-card font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                                    placeholder="your@email.com"
                                    aria-label="Newsletter email"
                                />
                                <button
                                    onClick={() => { setNewsletter(""); }}
                                    className="btn-primary-cafe text-white text-xs px-6"
                                    aria-label="Subscribe to newsletter"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="contact-info opacity-0 space-y-6">
                        <div className="p-6 rounded-2xl bg-card border border-primary/80" style={{ boxShadow: "var(--shadow-card)" }}>
                            <h3 className="font-display text-xl font-bold text-primary mb-6">Contact Information</h3>
                            <div className="space-y-5">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-body text-sm font-bold text-primary">Address</p>
                                        <p className="font-body text-sm text-secondary">
                                            Barmeli Tole, Hakimchowk<br />
                                            (Next to Big Mart)<br />
                                            Bharatpur-11, Chitwan, Nepal
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-body text-sm font-bold text-primary">Phone</p>
                                        <a href="tel:9855086190" className="font-body text-sm text-secondary hover:text-primary transition-colors">
                                            9855086190
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-body text-sm font-bold text-primary">Email</p>
                                        <a href="mailto:info@fareenascafe.com" className="font-body text-sm text-secondary hover:text-primary transition-colors">
                                            info@fareenascafe.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Card */}
                        <div
                            className="p-6 rounded-2xl text-primary-foreground relative overflow-hidden"
                            style={{ background: "var(--gradient-warm)" }}
                        >
                            <h3 className="font-display text-white text-xl font-bold mb-2">Reserve Your Table</h3>
                            <p className="font-body text-neutral-400 text-sm opacity-90 mb-4">
                                Call us for quick reservations or use the form to send us your preferred date and time.
                            </p>
                            <a
                                href="tel:9855086190"
                                className="inline-flex items-center gap-2 bg-secondary text-white hover:bg-secondary/50 backdrop-blur-sm px-6 py-2 rounded-full font-body text-sm font-bold transition-all"
                            >
                                <Phone className="w-4 h-4" />
                                Call Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;