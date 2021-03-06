import {FETCH_ALL, CREATE, DELETE, UPDATE} from '../_constants/actionTypes'
import * as api from '../api'

// Action Creators
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts()
        
        dispatch({ type: FETCH_ALL, payload: data })
    } catch (error) {
        console.log(error) //error.message just gives description about the error
    }   
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post)

        dispatch({ type: CREATE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id, updatedPost) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, updatedPost)
        // console.log(data)
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id)

    dispatch({ type: DELETE, payload: id})
  } catch (error) {
    console.log(error)
  }
}

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id)

    dispatch({ type: UPDATE, payload: data })
  } catch (error) {
      console.log(error)
  }
}