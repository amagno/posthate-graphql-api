import jwt from 'jsonwebtoken'
import User from '../data/models/User'

const userReturn = (user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    password: user.password
})
const secret = 'shhhh'
const resolvers = {
    Query: {
        users: async (_, args, context, info) => {
           
            try {
                return await User.find().exec()
            } catch (error) {
                throw new Error(error)
            }
        }
    },
    Mutation: {
        addUser: async (_, args, context, info) => {
            try {
                const user = await new User(args.input).save()
                const token = await jwt.sign({ user }, secret)
                return {
                    error: false,
                    token,
                    msg: null,
                    user: userReturn(user)
                }
            } catch(error) {
                return {
                    error: true,
                    msg: error.errmsg,
                    token: null,
                    user: null
                }
            }

            
        },
        getUser: async (_, args, context, info) => {

            const { user } = await jwt.verify(args.token, secret)
            console.log(user)
            return {
                id:  user._id,
                name: user.name,
                email: user.email,
                password: user.password   
            }
        },
        login: async (_, args, context, info) => {
            console.log(args)
            const { email, password } = args.input

            try {
                const user = await User.findOne({ email, password }).exec()

                if(!user) {
                    return {
                        error: true,
                        msg: 'E-mail or password not found',
                        token: null,
                        user: null
                    }
                }
                const token = await jwt.sign({ user }, secret)                
                return {
                    error: false,
                    msg: null,
                    token,
                    user: userReturn(user)
                }
            }catch (error) {
                return {
                    error: true,
                    msg: error,
                    token: null,
                    user: null,
                }
            }
        }
    }
}

export default resolvers