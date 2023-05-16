// 05-15 - Henry - server.js file has been modified and successfully ran (nodemon server.js).

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json(), express.urlencoded({extended: true}));

require('./config/mongoose.config');
const PostRoutes = require('./routes/post.route');
PostRoutes(app);

app.listen(8000, () => {console.log("The server is all fired up on port 8000.")});