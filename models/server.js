const express = require('express')
const cors = require('cors')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const { dbConnection } = require('../database/config')
class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT || 3000
        this.apiUsersPath = '/api/users'
        this.apiAuthPath = '/api/auth'
        this.conectarDB()
        this.middlewares()
        this.routes()
        this.swagger()

        this.handleErrors()
    }

    async conectarDB() {
        //se puede switchear segun ambiente , conecta bd prod o development
        await dbConnection()
    }

    swagger() {
        const options = {
            definition: {
                openapi: '3.0.0',
                info: {
                    title: 'Mystema',
                    version: require('../package.json').version,
                },
            },
            apis: ['index.js', './routes/*.js', "./routes/*.yaml", "./descriptions/*.yaml"]
            // apis: ['index.js','./routes/*.js', "./routes/*.yaml"], // files containing annotations as above
        }
        const swaggerDocs = swaggerJsdoc(options)
        console.log(swaggerDocs)
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
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
    }

    handleErrors() {
        this.app.use((err, req, res, next) => {
            console.log('ocurrio un error')
            res.status(500).send('Ocurrio un error en servidor');
        })
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Escuchando en ', this.port)
        })
    }

}

module.exports = Server
