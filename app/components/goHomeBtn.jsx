'use client'
import { useRouter } from 'next/navigation';

import '@/app/styles/loginPage.css'

export default function GoHome() {
    const route = useRouter();
    
    const go = () => route.push('/');

    return <button className = 'goHome_button'onClick={go}>&#128072;</button>
}

