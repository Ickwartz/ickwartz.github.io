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
			if (!response.ok) {
				throw Error(response.statusText);
			}
			let status = response.status;
			switch (true){
				case (status == 204): return;
				case (status >= 200 && status<300): break;
				case (status >= 300 && status<400): {
					return "Page was moved";
				}
				case (status == 400): return "Bad Request";
				case (status == 401): return "Unauthorized";
				case (status == 403): return "Forbidden";
				case (status == 404): return "Not Found";
				case (status == 406): return "Input Error";
				case (status < 500): return "client Error";
				case (status > 500): return "Server Error";
				default: return "Something went wrong";
			}
			return response.json();
		})
		.then(data => {
			return data;
		});
		
	}
}

export {Fetch_api};