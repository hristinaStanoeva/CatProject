import { Entity,  Column } from 'typeorm';

import { BaseEntity } from '../base.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
    @Column({ unique: true })
    public email: string;

    @Column({ length: 60 })
    public password: string;

    @Column({ name: 'image_url', nullable: true })
    public imageUrl: string;
}
