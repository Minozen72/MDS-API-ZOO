const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');



app.use(express.json());

function myMiddleware(req, res, next) {
  console.log('Middleware called');
  next();
}


// Use the middleware function
app.use(myMiddleware);
app.use('/api/users', userRoutes);

const port = 3000;
app.listen(port, () => console.log(`Serveur démarré sur le port ${port}...`));


