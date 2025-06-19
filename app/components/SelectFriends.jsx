'use client'
import React from "react";
import { useState, useEffect } from "react";
import { useFriends } from '../context/FriendsContext';
import ConfirmModal from "./ConfirmModal";

import styles from "../styles/SelectFriends.module.css"


export default function SelectFriends({ closeShowFriends }) {
  const {
    selectedFriends,
    availableFriends,
    setSelectedFriends,
    clearFriends,
  } = useFriends();

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [hideRejectWarning, setHideRejectWarning] = useState(false);


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

  useEffect(() => {
    const hide = localStorage.getItem('hideRejectWarning');
    if (hide === 'true') setHideRejectWarning(true);
  }, []);

  useEffect(() => {
      localStorage.setItem('hideRejectWarning', hideRejectWarning);
  }, [hideRejectWarning]);


  const handleConfirm = () => {
    closeShowFriends();
  };

  const hadnleReject = () => {
    if (hideRejectWarning) {
      clearFriends();
      closeShowFriends();
    } else {
      setShowRejectModal(true);
    }
  }

  return (
    <div className={styles.select_friends}>
      {showRejectModal && (
        <ConfirmModal
            message="Натиснувши, ви очистите список обраних друзів!"
            onConfirm={() => {
              clearFriends();
              setShowRejectModal(false);
              closeShowFriends();
          }}
            onCancel={() => setShowRejectModal(false)}
            dontShowAgain={hideRejectWarning}
          setDontShowAgain={setHideRejectWarning}
          showCkeckbox="true"
        />
      )}
      
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
        <button type="button" onClick={handleConfirm}>&#9989;</button>
        <button type="button" onClick={hadnleReject}>&#10060;</button>
      </div>
    </div>
  );
}