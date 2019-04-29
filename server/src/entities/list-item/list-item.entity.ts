import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../base.entity';
import { UserEntity, ListEntity } from '../';

@Entity({ name: 'list_items' })
export class ListItemEntity extends BaseEntity {
    @Column()
    public content: string;

    @Column({ default: false })
    public checked: boolean;

    @ManyToOne(type => ListEntity, list => list.items, {
        onDelete: 'CASCADE',
        cascade: true,
        nullable: false,
    })
    @JoinColumn({ name: 'list_id' })
    public list: ListEntity;

    @ManyToOne(type => UserEntity, user => user.listItems, {
        onDelete: 'CASCADE',
        cascade: true,
        nullable: false,
    })
    @JoinColumn({ name: 'author_id' })
    public author: UserEntity;
}
