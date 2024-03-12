'use client'
import { useState } from 'react'
import { signOut } from 'next-auth/react';
import addNewAvatar from './helpers/changeAvatar.js'

import '@/app/styles/userPage.css'

export default function Sidebar({ name, email, image }) {
    const [showSidebar, setShowSidebar] = useState({
        buttonClass: 'show-sidebar',
        sidebarClass: 'sidebar hidden',
        hidden: true,
    });
    const text = '>>>';
    
    function showSidebarFn() {
        if (showSidebar.hidden) {
            setShowSidebar({
                buttonClass: 'show-sidebar show-sidebar-move',
                sidebarClass: 'sidebar',
                hidden: false,
            })
        } else {
            setShowSidebar({
                buttonClass: 'show-sidebar',
                sidebarClass: 'sidebar hidden',
                hidden: true,
            })
        } 
    }


    function handleAvatar(e) {
        if (e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = function () {
                addNewAvatar(reader.result, email);
            }

            reader.readAsDataURL(e.target.files[0]);
        } 
    } 

    
    return (
        <>
            <button className={showSidebar.buttonClass} onClick={showSidebarFn}>{text}</button>
            <aside className={showSidebar.sidebarClass}>
                <div>
                    <div className = 'sidebar_avatar'>
                        <img src={image} className='sidebar_logo' />
                        <label htmlFor='sidebar_changeLogo' title='change the avatar'>&#9997;</label>
                        <input type='file' id='sidebar_changeLogo' accept='image/*' onChange={handleAvatar}/>
                    </div>
                    <h2 className='sidebar_name'>{name}</h2>
                    <p className = 'sidebar_email'>{email}</p>
                </div>
                <button className = 'sidebar_button' onClick={() => signOut({callbackUrl: '/'})}>Exit</button>
            </aside>
        </>
    )
}
