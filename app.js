const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// DB Connection

const URI = `mongodb+srv://tomask:${process.env.MONGODBPW}@cluster0.rjxok.mongodb.net/demo3?retryWrites=true&w=majority`;

const client = new MongoClient(URI);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is running on port ${port}`));
