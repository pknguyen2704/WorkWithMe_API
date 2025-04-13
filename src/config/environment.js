import 'dotenv/config'

export const env = {
    MONGODB_URI: process.env.MONGODB_URI,
    DATABASE_NAME: process.env.DATABASE_NAME,
    LOCALDEV_APP_HOST: process.env.LOCALDEV_APP_HOST,
    LOCALDEV_APP_PORT: process.env.LOCALDEV_APP_PORT,
    BUILD_MODE: process.env.BUILD_MODE
}