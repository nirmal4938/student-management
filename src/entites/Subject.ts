import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Subject {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    subjectName: string;
    
}
// subject => subject.students, 