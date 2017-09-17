import { MockList } from 'graphql-tools'
import casual from 'casual'


export default {
    Query: () => ({
        users: () => new MockList(50),
        posts: () => new MockList([1, 10])
    }),
    User: () => ({
        id: casual.uuid,
        name: casual.name,
        email: casual.email
    }),
    Post: () => ({
        id: casual.uuid,
        title: casual.title,
        content: casual.text,
        likes: casual.integer(1, 1000),
        dislikes: casual.integer(1, 1000),
        comments: () => new MockList([0, 10]),
        tags: () => new MockList([0, 7])
    }),
    Comment: () => ({
        id: casual.uuid,
        content: casual.text
    }),
    Tag: () => ({
        id: casual.uuid,
        name: casual.username
    })
}