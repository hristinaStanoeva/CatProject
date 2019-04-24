import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../base.entity';
import { UserEntity } from '../';

@Entity({ name: 'lists' })
export class ListEntity extends BaseEntity {
    @Column()
    public title: string;

    @ManyToOne(type => UserEntity, user => user.lists, {
        cascade: true,
        nullable: false,
    })
    @JoinColumn({ name: 'author_id' })
    public author: UserEntity;
}
