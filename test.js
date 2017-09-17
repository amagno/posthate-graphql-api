const mongoose = require('mongoose')
const casual = require('casual')

mongoose.connect('mongodb://localhost:27017/posthate')

const db = mongoose.connection

db.on('error', () => {
    console.log('error db')
})
db.on('open', () => {
    console.log('connect to db success')
})
const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})
const User = mongoose.model('User', userSchema)
const saveUser = () => {
    const fake = {
        name: casual.name,
        email: casual.email,
        password: casual.password
    }
    console.log('Saving user')
    console.log(fake)
        const user = new User(fake).save()
        .then(user => {
            console.log(user)    
        })
        .catch(error => {
            console.log(error)
        })
}
saveUser()
