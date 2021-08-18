const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is running on port ${port}`));
