import { getRepository, Repository } from 'typeorm';
import { UserEntity } from './';

export const getUserRepository: () => Repository<UserEntity> = () => getRepository(UserEntity);
