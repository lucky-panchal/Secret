'use client';
import { HeroGeometric } from "../../ui/shape-landing-hero";
import { useRouter } from 'next/navigation';

function Hero() {
    const router = useRouter();
    
    return (
        <div id="home">
            <HeroGeometric 
                badge="Future-Proof Your Career"
                title1="KaushalX"
                title2="" 
                router={router}
            />
        </div>
    );
}

export default Hero;