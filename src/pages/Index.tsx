import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/About'
import MenuSection from '../components/MenuSection'
import Gallery from '../components/Gallery'
import Testimonial from '../components/Testimonial'

const Index = () => {
    return (
        <div className='min-h-screen'>
            <Header />
            <main>
                <HeroSection />
                <AboutSection />
                <MenuSection />
                <Gallery />
                <Testimonial />
            </main>
        </div>
    )
}

export default Index