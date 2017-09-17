import mongoose from 'mongoose'
import { isDev } from '../utils'

export const localConnection = () => {
    mongoose.connect('mongodb://localhost:27017/posthate')
    const connection = mongoose.connection
    mongoose.Promise = Promise

    if(isDev()) mongoose.set('debug', true)

    connection.on('error', () => {
        console.log('Local connection to mongodb error')
    })
    connection.on('open', () => {
        console.log('Local connection to mongodb success')
    })
    return connection
}