import React from 'react'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/About'

const Index = () => {
    return (
        <div className='min-h-screen'>
            <Header />
            <main>
                <HeroSection />
                <AboutSection />
            </main>
        </div>
    )
}

export default Index