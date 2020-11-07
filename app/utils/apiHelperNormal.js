import * as types from './constants';

export function getData(path) {
	return fetch(`${path}`)
		.then((res) => res.json())
		.then((data) => data)
		.catch((error) => console.log('Error: ', error));
}

export const postData = (path, data) => {
	try {
		return fetch(`${path}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
				// authorization: 'Bearer ' + Token
			},
			body: JSON.stringify(data)
		})
			.then((res) => res.json())
			.then((data) => data);
	} catch (err) {
		throw err;
	}
};

export const putData = (path, data = '') => {
	try {
		return fetch(`${path}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then((res) => res.json())
			.then((data) => data);
	} catch (err) {
		throw err;
	}
};
