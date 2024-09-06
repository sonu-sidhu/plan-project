require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRoute');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({ origin: 'http://localhost:3008' }));

app.use('/api/v1/sub', userRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

mongoose.connect(process.env.database)
.then(() => console.log('Database connected'))
.catch((err) => console.log('something went wrong', err))

app.listen(process.env.port, () => {
    console.log(`Server listen in ${process.env.port}`);
});
