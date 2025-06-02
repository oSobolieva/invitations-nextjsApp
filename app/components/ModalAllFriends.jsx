import { useState, useEffect } from 'react';
import Input from './Input'
import styles from '../../app/styles/AllFriendsModal.module.css'

export default function ModalAllFriends({ userEmail, hideModalFriends }) {
    const [friends, setFriends] = useState([]);

    const [newFriendName, setNewFriendName] = useState('');
    const [newFriendEmail, setNewFriendEmail] = useState('');
    const [errors, setErrors] = useState({
        "name": false,
        "email": false
    });

    const [isAddFriend, setAddFriend] = useState(false);
    const [isRemoveFriend, setRemoveFriend] = useState(false);

    const [isLoadingFriends, setLoading] = useState(false);

    const getErrors = (field, value) => setErrors(previous => ( { ...previous, [field]: value } ));

    const showAddFriend = (isAddFriendVisible) => setAddFriend(isAddFriendVisible);
    const showRemoveFriend = (isRemoveFriendVisible) => setRemoveFriend(isRemoveFriendVisible);

    const loadFriends = async () => {
        setLoading(true);
        const res = await fetch(`/api/friends?email=${userEmail}`);
        const data = await res.json();
        setFriends(data);
        setLoading(false);
    }

    useEffect(() => {
        loadFriends();
    }, [userEmail]);

    async function addNewFriend(e) {
        e.preventDefault();

        await handleAdd(newFriendName, newFriendEmail);

        setNewFriendName('');
        setNewFriendEmail('');
        
        showAddFriend(false);
        loadFriends();
    }

    const handleAdd = async (name, email) => {
        let friendInformation = { name, email };

        await fetch('/api/friends', {
            method: 'POST',
            body: JSON.stringify({ userEmail, friendInformation }),
            headers: { 'Content-Type': 'application/json' },
        });      
    }

    const handleDelete = async (email) => {
        await fetch('/api/friends', {
            method: 'DELETE',
            body: JSON.stringify({ userEmail, friendsEmailtoRemove: email }),
            headers: { 'Content-Type': 'application/json' },
        });

        loadFriends();
        setAllFriends(friends);
    }

    const isConfirmDisabled = () => {
        return (
            newFriendName === '' ||
            newFriendEmail === '' ||
            Object.values(errors).some(err => err)
        );
    };


    return (
        <div className={styles.modal_friends}>
            <button className={styles.modal_close} onClick={hideModalFriends}>x</button>         
            {isLoadingFriends ? (
                <div className={styles.loading_friends}>Завантажую...</div>
            ) : friends.length > 0 ? (
                isRemoveFriend ? (
                    <>
                            <ul className={styles.modal_list}>
                            {friends.map((el, id) => (
                                <li key={id}>
                                    <button onClick={() => handleDelete(el.email)}>&#128686;</button>
                                    {el.email}
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => showRemoveFriend(false)}>&#9989;</button>
                    </>
                ) : (
                    <table>
                        <tbody>
                            {friends.map((el, id) => (
                                <tr key={id}>
                                    <td>{el.name}</td>
                                    <td>{el.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            ) : (
                'ти ще не зберігав друзів.'
            )}


            {isAddFriend && !isRemoveFriend && <form className={styles.modal_form} onSubmit={addNewFriend}>
                <Input
                    Iplaceholder="Ім'я"
                    Itype='text'
                    Iname='name'
                    hasError={getErrors}
                    value={newFriendName}
                    onChange={(e) => setNewFriendName(e.target.value)} />
                <Input
                    Iplaceholder='example123@ukr.net'
                    Itype='email'
                    hasError={getErrors}
                    value={newFriendEmail}
                    onChange={(e) => setNewFriendEmail(e.target.value)} />
                
                <button className={styles.modal_form_confirm} disabled={isConfirmDisabled()}>&#9989;</button>
                <button className={styles.modal_form_reject} onClick={() => showAddFriend(false)}>&#10060;</button>
            </form>}
            <div className={styles.friends_buttons}>
                <button onClick={() => showAddFriend(true)}>Add</button>
                <button onClick={() => showRemoveFriend(true)}>Delete</button>
            </div>
        </div>
    )
}
