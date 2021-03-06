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

// Products

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

// Orders
app.get('/orders', async (req, res) => {
  try {
    const con = await client.connect();
    const orders = await con.db('demo3').collection('orders').find().toArray();
    await con.close();
    res.send(orders);
  } catch (err) {
    res.status(500).send({ err: 'Please try again' });
  }
});

app.post('/orders', async (req, res) => {
  const { name, email, product_id, price } = req.body;
  if (!name || !email || !product_id || !price) {
    return res.status(400).send({ err: 'Incorrect data passed' });
  }
  try {
    const con = await client.connect();
    const dbRes = await con.db('demo3').collection('orders').insertOne({
      name,
      email,
      product_id,
      price,
    });
    await con.close();
    res.send({ msg: 'Order added successfully!', dbRes });
  } catch (err) {
    res.status(500).send({ err: 'Please try again' });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is running on port ${port}`));
