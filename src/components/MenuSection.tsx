import { useState, useEffect, useRef } from "react";
import { Search, Coffee } from "lucide-react";

import v60Coffee from "../assets/v60-coffee.jpg";
import coldAmericano from "../assets/cold-americano.jpg";
import icedCoffee from "../assets/iced-coffee.jpg";
import milkshake from "../assets/milkshake.jpg";
import latteArt from "../assets/latte-art.jpg";
import lightBites from "../assets/light-bites.jpg";

type Category = "all" | "hot" | "cold" | "milkshakes" | "bites";

interface MenuItem {
    name: string;
    description: string;
    price: string;
    image: string;
    category: Category;
}

const menuItems: MenuItem[] = [
    { name: "V60 Pour Over", description: "Single-origin beans, hand-poured with precision for a clean, complex cup.", price: "Rs. 400", image: v60Coffee, category: "hot" },
    { name: "Classic Cappuccino", description: "Rich espresso topped with velvety steamed milk and delicate foam art.", price: "Rs. 300", image: latteArt, category: "hot" },
    { name: "Cafe Latte", description: "Smooth espresso blended with creamy steamed milk, perfectly balanced.", price: "Rs. 320", image: latteArt, category: "hot" },
    { name: "Espresso", description: "Bold, concentrated shot of our signature roast — pure coffee essence.", price: "Rs. 200", image: v60Coffee, category: "hot" },
    { name: "Cold Americano", description: "Smooth espresso over ice with cold water — refreshing and bold.", price: "Rs. 350", image: coldAmericano, category: "cold" },
    { name: "Iced Coffee", description: "Chilled brewed coffee over ice with a hint of sweetness.", price: "Rs. 300", image: icedCoffee, category: "cold" },
    { name: "Cold Brew", description: "Steeped for 18 hours for an ultra-smooth, naturally sweet flavor.", price: "Rs. 380", image: coldAmericano, category: "cold" },
    { name: "Iced Mocha", description: "Espresso, chocolate, cold milk & ice — an indulgent cold treat.", price: "Rs. 400", image: icedCoffee, category: "cold" },
    { name: "Classic Milkshake", description: "Thick, creamy milkshake blended with premium ice cream.", price: "Rs. 350", image: milkshake, category: "milkshakes" },
    { name: "Chocolate Milkshake", description: "Rich chocolate blended to perfection with vanilla ice cream.", price: "Rs. 380", image: milkshake, category: "milkshakes" },
    { name: "Strawberry Shake", description: "Fresh strawberry flavors in a creamy, dreamy milkshake.", price: "Rs. 380", image: milkshake, category: "milkshakes" },
    { name: "Grilled Sandwich", description: "Toasted to golden perfection with fresh veggies and cheese.", price: "Rs. 250", image: lightBites, category: "bites" },
    { name: "Club Sandwich", description: "Layered with chicken, lettuce, tomato, and our special sauce.", price: "Rs. 350", image: lightBites, category: "bites" },
    { name: "French Fries", description: "Crispy golden fries seasoned with our special spice blend.", price: "Rs. 200", image: lightBites, category: "bites" },
];

const categories: { key: Category; label: string }[] = [
    { key: "all", label: "All" },
    { key: "hot", label: "Hot Coffees" },
    { key: "cold", label: "Cold Beverages" },
    { key: "milkshakes", label: "Milkshakes" },
    { key: "bites", label: "Light Bites" },
];

const MenuSection = () => {
    const [activeCategory, setActiveCategory] = useState<Category>("all");
    const [search, setSearch] = useState("");
    const sectionRef = useRef<HTMLElement>(null);

    const filteredItems = menuItems.filter((item) => {
        const matchCategory = activeCategory === "all" || item.category === activeCategory;
        const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
        return matchCategory && matchSearch;
    });

    useEffect(() => {
        const loadGsap = async () => {
            const gsap = (await import("gsap")).default;
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");
            gsap.registerPlugin(ScrollTrigger);

            gsap.fromTo(
                ".menu-header",
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8,
                    scrollTrigger: { trigger: ".menu-header", start: "top 85%" },
                }
            );
        };
        loadGsap();
    }, []);

    useEffect(() => {
        const loadGsap = async () => {
            const gsap = (await import("gsap")).default;
            gsap.fromTo(
                ".menu-card",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, stagger: 0.08 }
            );
        };
        loadGsap();
    }, [activeCategory, search]);

    return (
        <section id="menu" ref={sectionRef} className="section-padding bg-background" aria-label="Our Menu">
            <div className="container mx-auto">
                {/* Header */}
                <div className="menu-header text-center mb-12 opacity-0">
                    <div className="divider-coffee">
                        <Coffee className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="section-title">Our Menu</h2>
                    <p className="section-subtitle">
                        Handcrafted with love, served with care. Discover your new favorite.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.key}
                                onClick={() => setActiveCategory(cat.key)}
                                className={`px-5 py-2 rounded-full text-sm font-body cursor-pointer font-bold uppercase tracking-wider transition-all duration-300 ${activeCategory === cat.key
                                    ? "bg-primary text-white shadow-md"
                                    : "bg-secondary text-accent hover:bg-primary/80"
                                    }`}
                                aria-label={`Filter menu by ${cat.label}`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                        <input
                            type="text"
                            placeholder="Search menu..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 pr-4 py-2 rounded-full border border-border bg-card font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 w-full sm:w-64"
                            aria-label="Search menu items"
                        />
                    </div>
                </div>

                {/* Menu Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map((item) => (
                        <div
                            key={item.name}
                            className="menu-card group rounded-2xl overflow-hidden bg-card border border-border card-hover"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute top-3 right-3 bg-primary/60 text-accent text-xs font-body font-bold px-3 py-1 rounded-full">
                                    {item.price}
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="font-display text-lg font-bold text-primary mb-1">
                                    {item.name}
                                </h3>
                                <p className="font-body text-sm text-secondary leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-12">
                        <p className="font-body text-muted-foreground">No items found. Try a different search!</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default MenuSection;