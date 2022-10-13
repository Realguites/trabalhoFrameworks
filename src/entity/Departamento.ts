import { Entity, ObjectIdColumn, ObjectID, Column, OneToMany } from "typeorm"
import Funcionario from "./Funcionario"

@Entity()
export default class Departamento {

    @ObjectIdColumn()
    id: ObjectID

    @Column()
    descricao: string

    @Column()
    sala: number

    @Column((type) => Funcionario)
    funcionarios: Funcionario[]
}
