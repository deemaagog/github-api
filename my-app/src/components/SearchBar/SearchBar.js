import React, { useState } from 'react';
import { logoGitHub, iconSearch } from '../../assets';
import './searchBar.css';

export const SearchBar = ({ setUserName }) => {
	const [searchInput, setSearchInput] = useState('');

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUserName(searchInput);
  }


  return (
		<div className="header">
			<img className="logo" src={logoGitHub} alt="logo" />
			<form className="form-control" onSubmit={handleSubmit} >
				<img className="search" src={iconSearch} alt="search" />
				<input
					className="input"
					placeholder="Enter GitHub username"
					type="text"
					onChange={handleChange}
				/>
			</form>
		</div>
  )
}
