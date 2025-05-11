'use client'
import React from "react";
import { useState } from "react";

import '@/app/styles/userPage.css'


export default function SelectFriends({ availableFriends, choosenFriends, isShowFriends, getListFriends }) {
  const [draggingItem, setDraggingItem] = useState(null);
  const [sourceList, setSourceList] = useState(null);

  const [listForAdd, setListA] = useState([...choosenFriends]);
  const [listAll, setListAll] = useState([...availableFriends]);

  const handleDragStart = (item, fromList) => {
    setDraggingItem(item);
    setSourceList(fromList);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (toListSetter, toList) => {
    if (!draggingItem || !sourceList) return;

    const removeFromSource = sourceList === 'A' ? listForAdd : listAll;
    const setSource = sourceList === 'A' ? setListA : setListAll;

    const updatedSource = removeFromSource.filter(i => i !== draggingItem);
    setSource(updatedSource);

    toListSetter([...toList, draggingItem]);

    setDraggingItem(null);
    setSourceList(null);
  };

  function sendListOfFriends() {
    getListFriends(listForAdd);

    isShowFriends();
  }

  return (
    <div className='select_friends'>

      <div
        className="select_friends_zone"
        onDragOver={handleDragOver}
        onDrop={() => handleDrop(setListA, listForAdd)}
      >
        {listForAdd.length>0 ? listForAdd.map((item, index) => (
          <div
            key={index}
            draggable
            onDragStart={() => handleDragStart(item, 'A')}
          >
            {item.name}
          </div>
        )) : <p className="select_friends_guide">Щоб обрати запрошених, перетягніть ярлички з іх іменами знизу сюди.</p>}
      </div>

      <div
        className="select_friends_zone"
        onDragOver={handleDragOver}
        onDrop={() => handleDrop(setListAll, listAll)}
      >
        {listAll.map((item, index) => (
          <div
            key={index}
            draggable
            onDragStart={() => handleDragStart(item, 'B')}
          >
            {item.name}
          </div>
        ))}
      </div>

      <div className="select_friends_buttons">
        <button onClick={sendListOfFriends}>&#9989;</button>
        <button onClick={isShowFriends}>&#10060;</button>
      </div>
    </div>
  );
}