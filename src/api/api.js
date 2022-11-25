import axios from "axios";

const instance = axios.create({
  baseURL: 'https://api.api-ninjas.com/v1/',
  headers: {'X-Api-Key': 'oYWsJz7BApDYuFazKDgaRw==bUYczlJU6QdbiIR4'}
});

export const API = {
	dictionary: {
		getDescr: (word) => {
			return instance.get(`dictionary?word=${word}`).then((res) => res.data);
		}
	}
};