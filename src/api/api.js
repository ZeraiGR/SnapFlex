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
		getDescr: async (word) => {
			return dictionaryInstance.get(`dictionary?word=${word}`).then((res) => res.data);
		}
	},
	users: {
		getUsers: async () => {
			return postsInstance.get('users').then((res) => res.data);
		},
	},
	posts: {
		getPosts: async () => {
			return postsInstance.get('posts').then((res) => res.data
			);
		},
		addPost: async (post) => {
			return postsInstance.post('posts', post).then((res) => res.data);
		},
		updatePost: async (post) => {
			return postsInstance.put(`posts/${post.id}`, post).then((res) => res.data);
		},
		deletePost: async (postId) => {
			return postsInstance.delete(`posts/${postId}`);
		}
	},
	
};