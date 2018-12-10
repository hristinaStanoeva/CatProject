import { dirname, join } from 'path';

const projectRoot = join(dirname(process.mainModule.filename), '..');
export const path = {
    projectRoot
};
