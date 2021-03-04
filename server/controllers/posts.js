import mongoose from 'mongoose'

import PostMessage from '../models/postMessage.js'

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find()
    res.status(200).json(postMessages)
  } catch (error) {
    res.status(404).json({ message: error.message})
  }
}

export const createPost = async (req, res) => {
  const post = req.body
  // console.log(req.userId)
  const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

  try {
    await newPost.save()

    res.status(201).json(newPost)
  } catch (error) {
    res.status(409).json({ message: error.message })        
  }
}

export const updatePost = async (req, res) => {
  const { id: _id } = req.params // get the params from request url, destructure it and rename it to '_id'
  const post = req.body

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true }) // 3rd arg is to receive updated post as a return value
  res.json(updatedPost)
}

export const deletePost = async (req, res) => {
  const { id } = req.params 
  
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')

  await PostMessage.findByIdAndDelete(id)
  
  res.json({ message: 'Post deleted successfully' })
}

export const likePost = async (req, res) => {
  const { id } = req.params 
  
  if(!req.userId) return res.json({ message: 'Unauthenticated' })

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')

  const post = await PostMessage.findById(id)
  
  // if the user likes a post, his id will be stored in the likes array of that post. 
  // Grab the index of the user id in the likes array.
  const index = post.likes.findIndex((userId) => userId === String(req.userId))
  let updatedPost = null
  // if the user id is not found in the likes array, -1 is going to returned by findIndex()
  if (index === -1) {
    // push the user id into the likes array on liking the post
    post.likes.push(req.userId)
    
  } else {
    // if the user clicks on like button again, dislike the post, by filtering out his id from the likes array of the post
    post.likes = post.likes.filter((id) => id !== String(req.userId))
  }
  
  updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })
  res.json(updatedPost)
}