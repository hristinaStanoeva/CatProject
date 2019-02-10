import { dirname, join } from 'path';

export const projectRoot = join(dirname(process.mainModule.filename), '..');

export const envFile = join(projectRoot, '.env');
