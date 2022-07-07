export class Fetch_api {
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
		.then(response => response.json())
		.then(data => {
			return data;
		});
	}
}