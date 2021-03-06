import { Entity, Column, OneToMany } from 'typeorm';

import { BaseEntity } from '../base.entity';
import { ListEntity, ListItemEntity } from '../';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
    @Column({ unique: true })
    public email: string;

    @Column({ length: 60 })
    public password: string;

    @Column({ name: 'image_url', nullable: true })
    public imageUrl: string;

    @OneToMany(type => ListEntity, list => list.author, { onDelete: 'CASCADE' })
    public lists: ListEntity[];

    @OneToMany(type => ListItemEntity, listItem => listItem.author, {
        onDelete: 'CASCADE',
    })
    public listItems: ListItemEntity[];
}
