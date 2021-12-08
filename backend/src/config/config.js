require('dotenv').config();

module.exports = {
    port: process.env.PORT || 8000,
    db: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    },
    jwt: {
        secret: process.env.JWT_SECRET
    },
    cors: {
        origin: 'http://localhost:3000',
        credentials: true,
        optionsSuccessStatus: 200
    },
};
