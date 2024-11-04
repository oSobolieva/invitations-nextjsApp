'use client'
import React, { useState, useEffect } from 'react'

import UsersItem from "./UsersItem"


module.exports = function Search({ dummy_friends }) {
    const [users, setUsers] = useState(dummy_friends);
    const [ref, setRef] = useState('');


    useEffect(() => {
        const delay = setTimeout(() => {
            const newUsers = dummy_friends.filter((el) => el.name.indexOf(ref) >= 0);
            setUsers(newUsers);
        }, 1500);
        
        return () => clearTimeout(delay);
    }, [ref]);
    
    return (
        <div>
            <input type="search" placeholder="Find user.." className='searching' onChange={(e) => setRef(e.target.value)} />
            <ul className = 'search-list'>
                {users.map((el, id) => <UsersItem key={id} name={el.name} email={el.email} />)}
            </ul>
        </div>
    )
}


//test - перевірка пошуку