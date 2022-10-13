import { Entity, ObjectIdColumn, ObjectID, Column, ManyToOne } from "typeorm"
import Departamento from "./Departamento"

@Entity()
export default class Funcionario {

    @ObjectIdColumn()
    id: ObjectID

    @Column()
    nome: string

    @Column()
    sobrenome: string

    @Column()
    age: number
}
