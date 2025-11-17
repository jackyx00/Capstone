import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express()

const port = process.env.PORT

app.use(cors())

app.get('/', (req, res) => {
    res.json('Hello from server')
})

app.listen(port, () => {
    console.log('Listening on port: ' + port)
})