# node.js-social-network
This is a dummy social network based on node.js and mysql database meant for learning purpose.

### Initiating the inevitables
```bash
npm i express mongoose passport passport-jwt jsonwebtoken body-parser bcryptjs validator
npm i -D nodemon
npm i mysql
npm run server
```

### Required changes in package.json
```json
"scripts": {
    "start": "node server.js",
    "server": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
},
```