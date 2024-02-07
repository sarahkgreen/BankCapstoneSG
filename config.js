const config = {
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost:27017',
    privateKeyId: process.env.PRIVATE_KEY_ID,
    privateKey: process.env.PRIVATE_KEY,
};

export default config;