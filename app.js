const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const stockRoutes = require('./routes/stockRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const clientRoutes = require('./routes/clientRoutes');



app.use(express.json());

app.use('/api/users', userRoutes);

app.use('/api/products', productRoutes);

app.use('/api/stocks', stockRoutes);

app.use('/api/services', serviceRoutes);

app.use('/api/clients', clientRoutes);



const port = 3000;
app.listen(port, () => console.log(`Serveur démarré sur le port ${port}...`));


