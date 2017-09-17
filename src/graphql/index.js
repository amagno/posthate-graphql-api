import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import mockSchema from './mock.graphql'
import mocks from './mocks'
import resolvers from './resolvers'



const schema = makeExecutableSchema({
    typeDefs: mockSchema,
    resolvers
})

addMockFunctionsToSchema({
    schema,
    mocks,
    preserveResolvers: true
})

export default schema