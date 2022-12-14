import "reflect-metadata"
import { DataSource } from "typeorm"
import Departamento from "./entity/Departamento"
import Funcionario from "./entity/Funcionario"
import  User  from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mongodb",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [User, Funcionario, Departamento],
    migrations: [],
    subscribers: [],
})
