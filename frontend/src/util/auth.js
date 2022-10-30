export const api = `localhost:8000`;

export const isAuthenticated = () => {
	const token = localStorage.getItem('token');
	if (!token) {
		return false;
	} else {
		return true;
	}
};

/**
 * Login to backend and store JSON web token on success
 *
 * @param email
 * @param password
 * @returns JSON data containing access token on success
 * @throws Error on http errors or failed attempts
 */
export const login = async (email, password) => {
	// Assert email or password is not empty
	if (!(email.length > 0) || !(password.length > 0)) {
		throw new Error('Email or password was not provided');
	}
	
	let res = await fetch('http://localhost:8080/users/login', {
		method : 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body : JSON.stringify({
			userName : email,
			password : password
		})
	});
	res = await res.json();
	if(res.success == "false") {
		throw new Error('Wrong username or password');
	}
};

/**
 * Sign up via backend and store JSON web token on success
 *
 * @param email
 * @param password
 * @returns JSON data containing access token on success
 * @throws Error on http errors or failed attempts
 */
export const signUp = async (
	email,
	password,
	passwordConfirmation
) => {
	// Assert email or password or password confirmation is not empty
	if (!(email.length > 0)) {
		throw new Error('Email was not provided');
	}
	if (!(password.length > 0)) {
		throw new Error('Password was not provided');
	}
	if (!(passwordConfirmation.length > 0)) {
		throw new Error('Password confirmation was not provided');
	}

	let res = await fetch('http://localhost:8080/users/signup', {
		method : 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body : JSON.stringify({
			userName : email,
			password : password
		})
	});
	res = await res.json();
	if(res.success == "false") {
		throw new Error('User already exists');
	}
};

export const logout = () => {
    return true;
};