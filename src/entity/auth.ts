import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Auth{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;
}