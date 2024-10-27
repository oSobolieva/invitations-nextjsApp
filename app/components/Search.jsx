'use client'
import { useState, useEffect } from 'react'

import UsersItem from "./UsersItem"


export default function Search({ dummy_friends }) {
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
        <>
            <input type="search" placeholder="Find user.." className='searching' onChange={(e) => setRef(e.target.value)} />
            <ul className = 'search-list'>
                {users.map((el, id) => <UsersItem key={id} name={el.name} email={el.email} />)}
            </ul>
        </>
    )
}
