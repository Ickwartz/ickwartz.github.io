class Fetch_api {
    constructor() {}

    async postData(url, data) {
		return fetch(url, {
			method: "POST",
			mode: "cors",
			cache: "no-cache",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
		.then(response => {
			if (response.status === 204) {
				return;
			}
			return response.json();
		})
		.then(data => {
			return data;
		});
	}
}

export {Fetch_api};