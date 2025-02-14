# README - Documentation API REST

## 📌 Introduction
Cette documentation présente les concepts clés pour développer une API RESTful, l'importance du linter pour garantir un code propre, l'utilisation de JWT pour la sécurité, ainsi que les bases des requêtes HTTP. Elle inclut également des informations sur Postman, Swagger, Socket.io et le modèle de maturité de Richardson.

---

## 📖 API REST
### 🔹 Définition
Une **API REST (REpresentational State Transfer)** est une API respectant des principes spécifiques, permettant l'échange de données entre un client et un serveur, généralement au format JSON.

### 🔹 Principes de conception REST
- **Format de réponse standardisé** (souvent JSON).
- **Utilisation des en-têtes HTTP** pour transmettre des informations (authentification, cookies, URI, etc.).
- **Séparation des rôles** entre client et serveur.
- **Auto-découvrabilité** : les réponses peuvent contenir des informations pour guider le client sur les requêtes suivantes.

### 🔹 Structure d'une URI REST
Une bonne API REST doit avoir des **URI bien structurées**. Exemple :
```
GET /users/{id}  # Récupère un utilisateur spécifique
POST /users      # Crée un nouvel utilisateur
PUT /users/{id}  # Modifie complètement un utilisateur
PATCH /users/{id} # Modifie partiellement un utilisateur
DELETE /users/{id} # Supprime un utilisateur
```

---

## 📏 Linter (ESLint & Prettier)
Le **linter** est un outil qui vérifie la qualité du code et applique des conventions pour garantir sa lisibilité et sa maintenabilité.

### 🔹 Installation et Configuration
Dans le fichier `package.json`, nous définissons les scripts :
```json
"scripts": {
    "lint": "eslint .",
    "lint-fix": "eslint . --fix"
}
```

Fichier `.eslintrc.cjs` :
```js
module.exports = {
    root: true,
    env: { browser: true, es2021: true, node: true },
    extends: ["eslint:recommended", "airbnb", "plugin:prettier/recommended"],
    plugins: ["@stylistic"],
    rules: { "no-console": ["warn", { allow: ["error"] }] }
};
```

---

## 🔐 JWT (JSON Web Token)
Le **JWT** est une méthode sécurisée pour l'authentification. Il se compose de 3 parties :
1. **Header** (Type et algorithme de chiffrement)
2. **Payload** (Les données transmises)
3. **Signature** (Permet d’assurer l’intégrité du token)

### 🔹 Installation
```sh
npm install jsonwebtoken --save
```

### 🔹 Utilisation
Un **middleware** d’authentification peut être mis en place pour valider les tokens JWT :
```js
const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).send("Token manquant");
    jwt.verify(token, "secret_key", (err, decoded) => {
        if (err) return res.status(401).send("Token invalide");
        req.user = decoded;
        next();
    });
}
```

---

## 🌐 HTTP et Sécurité
### 🔹 Méthodes HTTP
- **GET** : Récupération de données
- **POST** : Envoi de nouvelles données
- **PUT** : Modification complète d’une ressource
- **PATCH** : Modification partielle
- **DELETE** : Suppression d’une ressource

### 🔹 Codes de statut HTTP
- `200 OK` → Succès
- `201 Created` → Ressource créée
- `400 Bad Request` → Mauvaise requête
- `401 Unauthorized` → Authentification requise
- `403 Forbidden` → Accès interdit
- `404 Not Found` → Ressource introuvable
- `500 Internal Server Error` → Erreur serveur

### 🔹 HTTPS et Sécurité
- HTTPS utilise un **certificat SSL** pour chiffrer les échanges de données.
- Permet d'éviter l'interception de données sensibles.

---

## 🛠️ Postman, Swagger et Socket.io
### 🔹 Postman
- Permet de tester les API facilement.
- Automatisation du **Bearer Token** avec un script :
```js
var responseBody = pm.response.json();
var token = responseBody.token;
pm.collectionVariables.set("token", token);
```

### 🔹 Swagger
- Génère une documentation interactive des API.
- Permet de tester les endpoints via une interface graphique.

🔗 [Tutoriel Swagger](https://dev.to/kabartolo/how-to-document-an-express-api-with-swagger-ui-and-jsdoc-50do)

### 🔹 Socket.io
- Permet la communication en temps réel entre le client et le serveur via WebSockets.
- Exemple d’installation et d’utilisation :
```sh
npm install socket.io
```
```js
const io = require("socket.io")(server);
io.on("connection", (socket) => {
    console.log("Nouvelle connexion");
    socket.on("message", (data) => {
        console.log("Message reçu :", data);
    });
});
```

🔗 [Documentation officielle Socket.io](https://socket.io/docs/)

---

## 🔥 Modèle de Maturité de Richardson
### 🔹 Niveau 0 : The Swamp of POX
- Un seul point d’entrée et un seul verbe HTTP utilisé (GET ou POST).

### 🔹 Niveau 1 : Resources
- Multiples URIs pour représenter les ressources, mais toujours un seul verbe HTTP.

### 🔹 Niveau 2 : HTTP Verbs
- Utilisation des méthodes HTTP standard (GET, POST, PUT, DELETE, PATCH).

### 🔹 Niveau 3 : Hypermedia Controls (HATEOAS)
- Les réponses contiennent des **liens hypermédia** pour guider le client.

🔗 [Guide détaillé](https://guide-api-rest.marmicode.fr/api-rest/le-modele-de-maturite-de-richardson)

---

## ✅ Conclusion
Cette documentation vous fournit les bases essentielles pour concevoir une **API RESTful robuste**, sécurisée et bien documentée. Suivez les bonnes pratiques présentées ici pour améliorer la qualité et la maintenabilité de vos projets.

🚀 **Bon développement !**

