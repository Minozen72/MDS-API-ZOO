const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const stockRoutes = require('./routes/stockRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const clientRoutes = require('./routes/clientRoutes');

app.use(express.static('public'));

app.use(express.json());

app.use('/api/users', userRoutes);

app.use('/api/products', productRoutes);

app.use('/api/stocks', stockRoutes);

app.use('/api/services', serviceRoutes);

app.use('/api/clients', clientRoutes);

const path = require('path');
app.get('/test-socket', (req, res) => {
    res.sendFile(path.join(__dirname, 'sockets/index.html'));
});
const server = http.createServer(app);
const io = socketIo(server);
let nbUsers = 0;
io.on('connection', (socket) => {
    nbUsers++;
    console.log('Un utilisateur est connecté');
    console.log('Nombre d\'utilisateurs connectés : ' + nbUsers);
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Envoyer le message à tous les utilisateurs
    });

    socket.on('disconnect', () => {
        console.log('Un utilisateur s\'est déconnecté');
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});


