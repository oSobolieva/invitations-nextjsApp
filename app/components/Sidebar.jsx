'use client'

/**
Бічна панель користувача.

Відображає інформацію про користувача, включаючи аватар, ім'я та email.

Також дозволяє змінювати аватар та виходити з облікового запису.

@component

@param {Object} props - Пропси компонента.

@param {Object} props.info - Інформація про користувача.

@param {string} props.info.image - URL аватара користувача.

@param {string} props.info.name - Ім'я користувача.

@param {string} props.info.email - Email користувача.

@returns {JSX.Element} Бічна панель з інформацією про користувача.
*/

import React, { useState } from 'react'
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import addNewAvatar from './helpers/changeAvatar.js'

import '../../app/styles/userPage.css'
import avatarRandomizer from './helpers/avatarRandomizer.js';

export default function Sidebar({ info }) {
    const [showSidebar, setShowSidebar] = useState({
        buttonClass: 'show-sidebar',
        sidebarClass: 'sidebar hidden',
        hidden: true,
    });
    const text = '>>>';
    let avatar = info.image;
    
    /**
    Перемикає видимість бічної панелі.
    */
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

    if (info.image == '') {
        avatar = avatarRandomizer();
    }

    /**
    Обробляє зміну аватара користувача.

    @param {Event} e - Подія завантаження файлу.
    */
    function handleAvatar(e) {
        if (e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = function () {
                addNewAvatar(reader.result, info.email);
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
                        <Image src={avatar} loading="lazy" width={135} height={135} className='sidebar_logo' />
                        <label htmlFor='sidebar_changeLogo' title='change the avatar'>&#9997;</label>
                        <input type='file' id='sidebar_changeLogo' accept='image/*' onChange={handleAvatar}/>
                    </div>
                    <h2 className='sidebar_name'>{info.name}</h2>
                    <p className = 'sidebar_email'>{info.email}</p>
                </div>
                <button className = 'sidebar_button' onClick={() => signOut({callbackUrl: '/'})}>Exit</button>
            </aside>
        </>
    )
}
