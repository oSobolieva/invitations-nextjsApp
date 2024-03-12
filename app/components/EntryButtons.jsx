'use client'

import Link from "next/link";

export default function EntryButtons() {
    
    return (
        <div className='entry-buttons'>
            <div className = 'entry-button-login'>
                <Link href='/login'>Login</Link>
            </div>
            <div className = 'entry-button-reg'>
                <Link href='/registration'>Register</Link>
            </div>
        </div>
    )
}

