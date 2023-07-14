import {createContext, useEffect, useState} from 'react';

export const authContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({children}) => {
	const [currentUser, setCurrentUser] = useState(
		localStorage.getItem('user') !== undefined
			? JSON.parse(localStorage.getItem('user'))
			: null
	);

	const login = async (input) => {
		const res = await fetch('http://localhost:3001/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(input),
		});

		const data = await res.json();
		setCurrentUser(data.data);
		return data.msg;
	};

	const logout = async () => {
		await fetch('http://localhost:3001/auth/logout', {
			credentials: 'include',
		});
		setCurrentUser(null);
	};
	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(currentUser));
	}, [currentUser]);

	return (
		<authContext.Provider value={{currentUser, login, logout}}>
			{children}
		</authContext.Provider>
	);
};
