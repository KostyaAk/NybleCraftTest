import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ unique: true })
    email:string;

    @Column()
    firstname:string;

    @Column()
    lastname:string;

    @Column()
    image:string

    @Column({ nullable: true, type: "mediumblob" })
    pdf: Buffer
}
