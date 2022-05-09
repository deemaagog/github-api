import React, { useState } from 'react';
import './App.css';
import { iconMainSearch } from './assets/index';
import { SearchBar } from './components/SearchBar/SearchBar';

function App() {
  const [userName, setUserName] = useState('');

  return (
    <div className="App">
      <SearchBar setUserName={setUserName} />
      <div className='initial-section'>
        <div className='initial-container'>
          <img className='initial-icon' src={iconMainSearch} alt='search'/>
          <h1 className='initial-description'>Start with searching a GitHub user</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
