import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { BaseEntity } from '../base.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ unique: true })
    public email: string;

    @Column({ width: 60 })
    public password: string;

    @Column({ name: 'image_url', nullable: true })
    public imageUrl: string;
}
