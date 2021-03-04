import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1] // [1] is to get the actual token, [0] is the string 'bearer'
    const isCustomAuth = token.length < 500 // make sure if it's custom auth or google auth..if token length > 500 then it's a google provided token

    let decodedData

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, 'secret')

      req.userId = decodedData?.id
    } else {
      decodedData = jwt.decode(token)
      req.userId = decodedData?.sub // sub is an id provided by google to identify each user
    } 

    next()
  } catch (error) {
    console.log(error)
  }
}

export default auth