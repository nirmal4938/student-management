import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Subject } from "./Subject";


export enum Status {
    LIVE = "Live",
    SUSPENDED = "Suspended",
}
@Entity()
export class Student {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    city: string;

    @Column("date")
    dateOfBirth: string;

    @Column()
    age: number;

    @Column()
    standard: number;

    @Column("simple-array")
    skills: string[];

    @Column()
    briefIntro: string;

    @Column("date")
    enrollmentFrom: string;

    @Column("date")
    enrollmentTo: string;

    @Column({
        type: "enum",
        enum: Status,
    })
    status: Status;

    @Column()
    isActive: boolean;


    @ManyToMany(() => Subject, subject => subject.id, {cascade: true, onDelete: 'NO ACTION'})
    @JoinTable()
    subjects: Subject[]
}