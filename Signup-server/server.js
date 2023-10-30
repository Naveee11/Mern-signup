const express =require('express');
const connectDB = require('./Config/Database');
const app =express();
const cors = require('cors');
const crypto = require('crypto');
const keyBytes = 32; // 256 bits

const secretKey = crypto.randomBytes(keyBytes).toString('hex');


app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

connectDB();

require('dotenv').config();


const loginSign = require('./Routes/SignLogRoute')

const PORT = process.env.PORT || 4000

app.use('/api',loginSign)


app.listen(PORT, () => {
    console.log(`server running successfully port http://localhost:${PORT}`)
})