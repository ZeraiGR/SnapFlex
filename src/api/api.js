import axios from "axios";

const dictionaryInstance = axios.create({
  baseURL: 'https://api.api-ninjas.com/v1/',
  headers: {'X-Api-Key': 'oYWsJz7BApDYuFazKDgaRw==bUYczlJU6QdbiIR4'}
});

const postsInstance = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com/',
});

export const API = {
	dictionary: {
		getDescr: (word) => {
			return dictionaryInstance.get(`dictionary?word=${word}`).then((res) => res.data);
		}
	},
	posts: {
		getPosts: () => {
			return postsInstance.get('posts').then((res) => res.data
			);
		},
		getUsers: () => {
			return postsInstance.get('users').then((res) => res.data);
		},
		addPost: (post) => {
			return postsInstance.post('posts', post).then((res) => res.data);
		}
	}
};