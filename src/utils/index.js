
export const getEnv = (string) => {
    const env = process.env[string] || undefined
    
    if(!env) {
        throw new Error(`Please define ${string} on your env`)
    }
    return env
}
export const isDev = () => {
    const env = getEnv('NODE_ENV')

    if(env === 'production') {
        return false
    }

    return true
}