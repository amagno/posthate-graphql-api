import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from './graphql'
import { isDev, getEnv } from './utils'
import session from 'express-session'
import connectMongo from 'connect-mongo'
import {localConnection} from './data/mongoConnection'

import bodyParser from 'body-parser'
import cors from 'cors'

//const MongoStore = connectMongo(session)
const app = express()
const port = getEnv('PORT')
const connection = localConnection()

// app.use(session({
//     secret: 'testing',
//     resave: false,
//     saveUninitialized: true,
//     store: new MongoStore({ mongooseConnection: connection }),
//     cookie: {
//         maxAge: 24 * 36000
//     }
// }))


app.use('/graphql-api', cors(), graphqlHTTP((req, res) => ({
    schema,
    graphiql: true,
    context: req.headers
})))
app.use((err, req, res, next) => {
    console.error(err.stack)
    next()
})
app.listen(port, () => {
    console.log(`GraphQL-API is running on port: ${port}`)
})