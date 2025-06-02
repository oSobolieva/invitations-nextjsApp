import { createContext, useContext, useEffect, useState } from 'react';

const FriendsContext = createContext();

export const FriendsProvider = ({ email, children }) => {
  const [allFriends, setAllFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);

  useEffect(() => {
    if (email) {
      fetch(`/api/friends?email=${email}`)
        .then(res => res.json())
        .then(data => setAllFriends(data))
        .catch(err => console.error(err));
    }
  }, [email]);

  const addFriend = (friend) => {
    if (!selectedFriends.some(f => f.email === friend.email)) {
      setSelectedFriends(prev => [...prev, friend]);
    }
  };

  const removeFriend = (friend) => {
    setSelectedFriends(prev => prev.filter(f => f.email !== friend.email));
    };
    
    const clearFriends = () => {
        setSelectedFriends([]);
    };

  const availableFriends = allFriends.filter(
    f => !selectedFriends.some(sf => sf.email === f.email)
  );

  return (
    <FriendsContext.Provider value={{
        allFriends,
        selectedFriends,
        availableFriends,
        addFriend,
        removeFriend,
        clearFriends,
        setSelectedFriends
    }}>
      {children}
    </FriendsContext.Provider>
  );
};

export const useFriends = () => useContext(FriendsContext);
