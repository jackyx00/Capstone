import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './db.js';
import runPokemonSetup from './pokemonSetup.js'

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())

connectDB().then(() => {
    runPokemonSetup();
})

app.get('/', (req, res) => {
    res.json('Hello from server')
})

// app.use("/pokemon", pokemonSetupRoute)

app.listen(port, () => {
    console.log('Listening on port: ' + port)
})