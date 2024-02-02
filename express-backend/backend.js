const express = require('express');
const cors = require('cors');

const userServices = require('./models/user-services');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', async (req, res) => {
    const { name, job } = req.query;
    try {
        const result = await userServices.getUsers(name, job);
        res.send({ users_list: result });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred in the server.');
    }
});

app.post('/users', async (req, res) => {
    const user = req.body;
    const savedUser = await userServices.addUser(user);
    if (savedUser)
        res.status(201).send(savedUser);
    else
        res.status(500).end();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.delete('/users/:id', async (req, res) => {
    const id = req.params['id'];
    try {
        const result = await userServices.deleteUserById(id);
        if (result)
            res.send({message: 'User deleted successfully.'});
        else
            res.status(404).send('Resource not found.');
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred in the server.');
    }
});