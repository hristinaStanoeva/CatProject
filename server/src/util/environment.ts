import dotenv from 'dotenv';
import { envFile } from './path';

// environment variables are set before any other imports in order for them to be applied properly
dotenv.config({ path: envFile });
