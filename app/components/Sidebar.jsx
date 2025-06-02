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
import addNewAvatar from '../lib/changeAvatar.js'

import styles from "../styles/Sidebar.module.css"
import avatarRandomizer from './helpers/avatarRandomizer.js';

export default function Sidebar({ info, showModalFriends }) {
    const [isHidden, setIsHidden] = useState(true);
    const text = '>>>';
    let avatar = info.image;
    
    /**
    Перемикає видимість бічної панелі.
    */
    function showSidebarFn() {
        setIsHidden(prev => !prev);
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

    const buttonClass = `${styles['show-sidebar']} ${!isHidden ? styles['show-sidebar-move'] : ''}`;
    const sidebarClass = `${styles.sidebar} ${isHidden ? styles.hidden : ''}`;
    
    return (
        <>
            <button className={buttonClass} onClick={showSidebarFn}>{text}</button>
            <aside className={sidebarClass}>
                <div>
                    <div className={styles.sidebar_avatar}>
                        <Image src={avatar} loading="lazy" width={135} height={135} className={styles.sidebar_logo} />
                        <label htmlFor='sidebar_changeLogo' className={styles.avatar_label} title='change the avatar'>&#9997;</label>
                        <input type='file' id='sidebar_changeLogo' className={styles.avatar_input} accept='image/*' onChange={handleAvatar}/>
                    </div>
                    <h2 className={styles.sidebar_name}>{info.name}</h2>
                    <p className={styles.sidebar_email}>{info.email}</p>
                    <button className={styles.sidebar_friends_button} onClick={showModalFriends}>My Friends</button>
                </div>
                <button className={styles.sidebar_exit_button} onClick={() => signOut({callbackUrl: '/'})}>Exit</button>
            </aside>
        </>
    )
}
