const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');


app.use(express.json());

app.use('/api/users', userRoutes);

app.use('/api/products', productRoutes);



const port = 3000;
app.listen(port, () => console.log(`Serveur démarré sur le port ${port}...`));


