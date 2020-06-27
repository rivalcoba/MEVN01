// Importing env manager package
import dotenv from 'dotenv';

// Load configuration variables
dotenv.config();

export default {
    databaseUrl:
        process.env.DATABASE_URL || 'mongodb://localhost:27017/mevnmongo',
};
