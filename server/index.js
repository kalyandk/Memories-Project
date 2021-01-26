import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv';
// Adding 'type': 'module' to the package.json enables ES 6 modules.

import postRoutes from './routes/posts.js'

const app = express()
dotenv.config()

// MIDDLEWARE
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/posts', postRoutes)

app.get('/', (req, res) => {
    res.send('Hello welcome to Memories API')
})

// DB
const CONNECTION_URL = process.env.CONNECTION_URL
// const CONNECTION_URL = 'mongodb://localhost:27017/MERN_MEMORIES'

const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false) // https://stackoverflow.com/questions/52572852/deprecationwarning-collection-findandmodify-is-deprecated-use-findoneandupdate