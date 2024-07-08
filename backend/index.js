const connectToMongo=require('./db');
const express = require('express')
require('dotenv').config();
const path = require("path");
const bodyParser = require('body-parser');
const app = express();
const swaggerJSDoc =require('swagger-jsdoc');
const swaggerUi=require('swagger-ui-express');
var cors = require('cors');
app.use(express.json());
app.use(cors());
app.use('/displaypics', express.static(path.join(__dirname, './public/images/displaypictures')));
app.use('/posts', express.static(path.join(__dirname, './public/images/posts')));
connectToMongo();
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Instagram Clone APIs Documentation',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        Authorization: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
      },
    },
    servers:[{url:'https://social-media-backend-86dn.onrender.com/'},
      {
      url:'http://localhost:4000/'
  }]
  },
  apis: ['./index.js', './Routes/*.js'],
};

const swaggerspec=swaggerJSDoc(options);
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerspec));
/**
 * @swagger
 * /:
 *   get:
 *     summary: Home page of all APIs
 *     description: Check the working condition of the backend server.
 *     responses:
 *       '200':
 *         description: Server is running.
 */
app.use('/api/auth',require('./Routes/auth'));
app.use('/api/user',require('./Routes/user'));
app.use('/api/post',require('./Routes/post'));

app.get('/', (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials","true");
  res.send({Message:"Hello Welcome To Instagram Clone",
           Website_name:"Social Media App",
});
})

app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`)
})
