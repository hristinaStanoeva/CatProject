import { getRepository, Repository } from 'typeorm';
import { ListEntity } from './';

export const getListRepository: () => Repository<ListEntity> = () => getRepository(ListEntity);
