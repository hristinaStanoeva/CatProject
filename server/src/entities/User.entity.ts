import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ unique: true, nullable: false })
    public email: string;

    @Column({ width: 60, nullable: false })
    public password: string;

    @Column({ name: 'image_url' })
    public imageUrl: string;

    @CreateDateColumn({ name: 'created_at' })
    public createDate: Date;

    @UpdateDateColumn()
    public updateDate: Date;
}
