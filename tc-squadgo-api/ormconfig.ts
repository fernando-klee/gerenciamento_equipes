import { DataSourceOptions } from 'typeorm'
import dotenv from 'dotenv'
 
dotenv.config()
 
const environment = process.env.NODE_ENV
 
const isOnCloud = environment === 'stage' || environment === 'prod'
 
if(!process.env.DB_HOST) throw new Error('Enviroment variable DB_HOST must be set.')
if(!process.env.DB_DATABASE) throw new Error('Enviroment variable DB_DATABASE must be set.')
if(!process.env.DB_PORT) throw new Error('Enviroment variable DB_PORT must be set.')
if(!process.env.DB_USER) throw new Error('Enviroment variable DB_USER must be set.')
if(!process.env.DB_PASS) throw new Error('Enviroment variable DB_PASS must be set.')
 
const cloudConfig: DataSourceOptions = {
    name: 'default1',
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    logging: false,
    entities: [
        './dist/src/modules/**/infra/typeorm/entities/*.js'
    ],
    migrations: [
        './dist/src/shared/infra/typeorm/migrations/*.js'
    ]
}
 
const localConfig: DataSourceOptions = {
    name: 'dsadsa',
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    logging: true,
    entities: [
        './src/modules/**/infra/typeorm/entities/*.ts'
    ],
    migrations: [
        './src/shared/infra/typeorm/migrations/*.ts'
    ]
}
 
export default isOnCloud ? cloudConfig : localConfig
 