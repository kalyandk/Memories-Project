import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' })

// axios's interceptor will be executed on all the http requests and responses
// STACKOVERFLOW ANS: https://stackoverflow.com/questions/52737078/how-can-you-use-axios-interceptors
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }

  return req
})

// comment this url in production
// const url = 'http://localhost:5000/posts'

// Uncomment below api URL in production
// const url = 'https://memories-project-dk.herokuapp.com/posts'

export const fetchPosts = () => API.get('/posts')
export const createPost = (newPost) => API.post('/posts', newPost)
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)
export const updatePost = (id, updatedPost) => API.patch(`posts/${id}`, updatedPost)
export const deletePost = (id) => API.delete(`/posts/${id}`)

export const signIn = (formData) => API.post('/users/signin', formData)
export const signUp = (formData) => API.post('/users/signup', formData)