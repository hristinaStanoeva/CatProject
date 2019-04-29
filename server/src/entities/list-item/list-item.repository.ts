import { getRepository, Repository } from 'typeorm';
import { ListItemEntity } from './';

export const getListItemRepository: () => Repository<ListItemEntity> = () => getRepository(ListItemEntity);
