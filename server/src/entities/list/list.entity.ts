import { Entity, Column } from 'typeorm';

import { BaseEntity } from '../base.entity';

@Entity({ name: 'lists' })
export class ListEntity extends BaseEntity {
    @Column()
    public title: string;
}
