// 5/17 - Henry - Updated this file to include dependencies for login and registration.

// 5/15 - Henry - server.js file has been modified and successfully ran (nodemon server.js).

const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('./config/mongoose.config');
require('dotenv').config();

app.use(express.json(), express.urlencoded({extended: true}));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());

const PostRoutes = require('./routes/post.route');
PostRoutes(app);

const UserRoutes = require('./routes/user.route');
UserRoutes(app);

app.listen(8000, () => {console.log("The server is all fired up on port 8000.")});