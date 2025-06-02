'use client'
import React from "react";
import { useState } from "react";
import { useFriends } from '../context/FriendsContext';

import styles from "../styles/SelectFriends.module.css"


export default function SelectFriends({ isShowFriends }) {
  const {
    selectedFriends,
    availableFriends,
    setSelectedFriends
  } = useFriends();

  const [draggingItem, setDraggingItem] = useState(null);
  const [sourceList, setSourceList] = useState(null);

  const handleDragStart = (item, fromList) => {
    setDraggingItem(item);
    setSourceList(fromList);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (target) => {
    if (!draggingItem || !sourceList) return;

    const fromSelected = sourceList === 'A';
    const toSelected = target === 'A';

    if (fromSelected === toSelected) return;

    if (toSelected) {
      setSelectedFriends([...selectedFriends, draggingItem]);
    } else {
      setSelectedFriends(selectedFriends.filter(f => f.email !== draggingItem.email));
    }

    setDraggingItem(null);
    setSourceList(null);
  };

  const handleConfirm = () => {
    isShowFriends();
  };

  return (
    <div className={styles.select_friends}>
      <div
        className={styles.select_friends_zone}
        onDragOver={handleDragOver}
        onDrop={() => handleDrop('A')}
      >
        {selectedFriends.length > 0 ? (
          selectedFriends.map((item, index) => (
            <div
              key={index}
              draggable
              onDragStart={() => handleDragStart(item, 'A')}
            >
              {item.name}
            </div>
          ))
        ) : (
            <p className={styles.select_friends_guide}>
            Щоб обрати запрошених, перетягніть ярлички з іх іменами знизу сюди.
          </p>
        )}
      </div>

      <div
        className={styles.select_friends_zone}
        onDragOver={handleDragOver}
        onDrop={() => handleDrop('B')}
      >
        {availableFriends.map((item, index) => (
          <div
            key={index}
            draggable
            onDragStart={() => handleDragStart(item, 'B')}
          >
            {item.name}
          </div>
        ))}
      </div>

      <div className={styles.select_friends_buttons}>
        <button onClick={handleConfirm}>&#9989;</button>
        <button onClick={isShowFriends}>&#10060;</button>
      </div>
    </div>
  );
}