/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// DB Connection

const URI = `mongodb+srv://tomask:${process.env.MONGODBPW}@cluster0.rjxok.mongodb.net/demo3?retryWrites=true&w=majority`;

const client = new MongoClient(URI);

app.get('/products', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db('demo3').collection('products').find().toArray();
    await con.close();
    res.send(data);
  } catch (err) {
    res.status(500).send({ err: 'Please try again' });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('demo3')
      .collection('products')
      .find(ObjectId(req.params.id))
      .toArray();
    await con.close();
    res.send(data);
  } catch (err) {
    res.status(500).send({ err: 'Please try again' });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is running on port ${port}`));
