import { dirname, join } from 'path';

export const project = dirname(process.mainModule.filename);

export const projectRoot = join(project, '..');

export const envFile = join(projectRoot, '.env');
