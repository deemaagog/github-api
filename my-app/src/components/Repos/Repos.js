import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import './repos.css';


export const Repos = ({ userName }) => {
	const [error, setError] = useState(null);
	const [repos, setRepos] = useState([]);

	const fetchRepos = useCallback(async () => {
		try {
			const reposResponse = await axios (`https://api.github.com/users/${userName}/repos`);
			setRepos(reposResponse.data);
			console.log(reposResponse.data);
			setError(null)
		} catch (err) {
			setError(err);
		}
	}, [userName])

	useEffect(() => {
		if (userName) {
			fetchRepos()
		}
	}, [userName, fetchRepos]);

	if (error) {
		return <h1>Repository list is empty</h1>
	}

  return (
			<ul className="repo-list">
				{repos.slice(0, 4).map((repo) => (
					<>
					<li className='repo-item' key={repo.id}>
						<a className='repo-link' href={repo.html_url}>{repo.name}</a>
						<span className='repo-description'>{repo.description}</span>
					</li>

					</>
				))}
			</ul>
  )
}



