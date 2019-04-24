import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { BaseEntity } from '../base.entity';

@Entity({ name: 'lists' })
export class ListEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;
}
