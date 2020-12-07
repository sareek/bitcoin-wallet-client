
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

export const multiPartPostData = (path, data, token) => {
	try {
		return fetch(`${path}`, {
			method: 'POST',
			headers: {
				// 'Content-Type': 'multipart/form-data'
				// processData: false,
				// 'Content-Type': 'multipart/form-data',
				// contentType: false,
                // 'X-Requested-With': 'XMLHttpRequest',
                Authorization: token,
			},
			body: data
		})
			.then((res) => res.json())
			.then((data) => data);
	} catch (err) {
		throw err;
	}
};
