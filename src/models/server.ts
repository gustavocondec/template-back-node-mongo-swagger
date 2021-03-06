import {NextFunction, Response,Request} from 'express';
import * as express from 'express'
import {sql} from '../databaseSql/config';
import * as cors from 'cors'
import * as swaggerJsdoc from 'swagger-jsdoc'
import * as swaggerUiExpress from 'swagger-ui-express'
import {dbConnection} from '../databaseMongo/config'
import * as path from 'path';
import {CustomError} from '../utils/Error';
import {ResponseError} from '../descriptions/IDescriptions';

export class Server {
  public app;
  private port: string | number;
  private apiUsersPath: string;
  private apiAuthPath: string;
  private apiRolesPath: string;

  constructor() {
    this.app = express()
    this.port = process.env.PORT || 3000
    this.apiUsersPath = '/api/users'
    this.apiAuthPath = '/api/auth'
    this.apiRolesPath= '/api/roles'
  }

  async initialize() {
    this.middlewares()
    this.routes()
    this.swagger()
    this.handleErrors()
    await this.connectMongoDB()
      .then(() => console.log('Conectado a MongoDB'))
      .catch(() => console.error('Error conectando a MongoDB'))
    await this.connectSql()
      .then(() => console.log('Conectado a SQL'))
      .catch(() => console.error('Error conectando a SQL'))
  }

  async connectMongoDB() {
    //se puede switchear segun ambiente , conecta bd prod o development
    await dbConnection()
  }

  async connectSql() {
    await sql.authenticate()
    await sql.sync({
      alter: true,
    })
  }

  swagger() {
    const options: swaggerJsdoc.Options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Template Backend',
          version: require('../../package.json').version,
        }
      },
      apis: ['index.js', ' ./routes/*.js',path.join(__dirname,'../../src/routes/*.yaml'),path.join(__dirname, '../../src/descriptions/*.yaml')]
      // apis: ['index.js','./routes/*.js', "./routes/*.yaml"], // files containing annotations as above
    }
    const swaggerDocs = swaggerJsdoc(options)
    this.app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocs, {
      explorer: true
    }))
  }

  middlewares() {
    // CORS
    this.app.use(cors())

    // Read and parse body

    this.app.use(express.json())

    /**
     * @description express.static sirve content in path '/',
     * if exist get('/') will be ignored
     */
    this.app.use(express.static('public'))

  }

  routes() {
    this.app.use(this.apiUsersPath, require('../routes/users'))
    this.app.use(this.apiAuthPath, require('../routes/auth'))
    this.app.use(this.apiRolesPath, require('../routes/roles'))
  }

  handleErrors() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.app.use((err:any, req:Request, res:Response, next:NextFunction) => {
      let responseError: ResponseError
      if (err instanceof CustomError) {
        responseError ={
          msg: err.message,
          status: err.status,
          errors: err.errors
        }
      } else { //instanceof Error
        responseError = {
          msg: 'Ocurrio un error inesperado',
          status: 500,
          errors: []
        }
      }
      res.status(responseError.status||500).send(responseError);
    })
  }

  async listen() {
    await new Promise((resolve, reject) => {
      try {
        this.app.listen(Number(this.port), () => {
          console.log('Se levanto servidor')
          resolve('')
        })
      } catch (e) {
        reject(e)
      }
    })
  }
}
