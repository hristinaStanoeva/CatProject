import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from '../base.entity';
import { UserEntity, ListItemEntity } from '../';

@Entity({ name: 'lists' })
export class ListEntity extends BaseEntity {
    @Column()
    public title: string;

    @ManyToOne(type => UserEntity, user => user.lists, {
        onDelete: 'CASCADE',
        cascade: true,
        nullable: false,
    })
    @JoinColumn({ name: 'author_id' })
    public author: UserEntity;

    @OneToMany(type => ListItemEntity, listItem => listItem.list, {
        onDelete: 'CASCADE',
    })
    public items: ListItemEntity[];
}
