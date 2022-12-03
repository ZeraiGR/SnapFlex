import axios from "axios";

const dictionaryInstance = axios.create({
  baseURL: 'https://api.api-ninjas.com/v1/',
  headers: {'X-Api-Key': 'oYWsJz7BApDYuFazKDgaRw==bUYczlJU6QdbiIR4'}
});

const jsonPhInstance = axios.create({
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
			return jsonPhInstance.get('users').then((res) => res.data);
		},
		addUser: async (user) => {
			return jsonPhInstance.post('users', user).then((res) => res.data);
		},
		updateUser: async (user) => {
			return jsonPhInstance.put(`users/${user.id}`, user).then((res) => res.data);
		},
		deleteUser: async (userId) => {
			return jsonPhInstance.delete(`users/${userId}`);
		}
	},
	posts: {
		getPosts: async () => {
			return jsonPhInstance.get('posts').then((res) => res.data
			);
		},
		addPost: async (post) => {
			return jsonPhInstance.post('posts', post).then((res) => res.data);
		},
		updatePost: async (post) => {
			return jsonPhInstance.put(`posts/${post.id}`, post).then((res) => res.data);
		},
		deletePost: async (postId) => {
			return jsonPhInstance.delete(`posts/${postId}`);
		}
	},
	todos: {
		getTodos: async () => {
			return jsonPhInstance.get('todos').then((res) => res.data);
		},
		addTodo: async (todo) => {
			return jsonPhInstance.post('todos', todo).then((res) => res.data);
		},
		updateTodo: async (todo) => {
			return jsonPhInstance.put(`todos/${todo.id}`, todo).then((res) => res.data);
		},
		deleteTodo: async (todoId) => {
			return jsonPhInstance.delete(`todos/${todoId}`);
		},
	}
};