import {FETCH_ALL, CREATE, DELETE, UPDATE} from '../_constants/actionTypes'

const postReducer = (posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload
        case CREATE:
            return [...posts, action.payload]
        case UPDATE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post) // map through all the posts and replace the post matching updated post
        case DELETE:
            return posts.filter((post) => post._id !== action.payload)
        default:
            return posts
    }
}

export default postReducer;