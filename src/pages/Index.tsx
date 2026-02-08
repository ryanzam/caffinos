import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/About'
import MenuSection from '../components/MenuSection'

const Index = () => {
    return (
        <div className='min-h-screen'>
            <Header />
            <main>
                <HeroSection />
                <AboutSection />
                <MenuSection />
            </main>
        </div>
    )
}

export default Index