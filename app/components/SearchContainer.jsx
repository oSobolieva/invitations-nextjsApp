'use client'
import Search from "./Search";

import '@/app/styles/userPage.css'


export default function SearchContainer({ people }) {

  return (
      <div className = 'friends-modal'>
          <Search dummy_friends={people} />
      </div>
  );
}
