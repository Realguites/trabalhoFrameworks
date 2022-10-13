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

    @OneToMany(() => Funcionario, (funcionario) => funcionario.departamento)
    funcionario: Funcionario[]
}
