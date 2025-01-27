const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const stockRoutes = require('./routes/stockRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const clientRoutes = require('./routes/clientRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

app.use(express.static('public'));

app.use(express.json());

app.use('/api/users', userRoutes);

app.use('/api/products', productRoutes);

app.use('/api/stocks', stockRoutes);

app.use('/api/services', serviceRoutes);

app.use('/api/clients', clientRoutes);

const port = process.env.PORT || 3000;

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API documentation with Swagger',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./routes/*.js', './controllers/*.js'], // ajustez ce chemin selon la structure de votre projet
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const path = require('path');
app.get('/test-socket', (req, res) => {
    res.sendFile(path.join(__dirname, 'sockets/index.html'));
});
const server = http.createServer(app);
const io = socketIo(server);
io.on('connection', (socket) => {

    console.log('Un utilisateur est connecté');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Envoyer le message à tous les utilisateurs
    });

    socket.on('disconnect', () => {
        console.log('Un utilisateur s\'est déconnecté');
    });
});

server.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});


