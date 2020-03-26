module.exports = {
    databaseCredentials: {
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE_NAME,
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
    },

    cloudinaryCredentials: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    },

    secretOrKey: process.env.AUTHORIZATION_SECRET_OR_KEY
};