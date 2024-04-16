const express = require('.pnpm/express@4.19.2/node_modules/express');
const cors = require('.pnpm/cors@2.8.5/node_modules/cors');
const PORT = process.env.PORT || 3000;
const authentif = require('./middleware/authMiddleware');
const userRoute = require('./routes/userRoute');
const connectDB = require('./config/database');

connectDB();

process.env.ACCESS_TOKEN_SECRET;

const app = express();
app.use(cors());

app.use(express.json());

// Routes
app.use('/api/users', userRoute);
app.use(authentif);

app.get('/', (req,res)=>{
    res.send('Hello Word');
});

app.listen(PORT, ()=>{
    console.log(`Server listening on port: ${PORT}`);
});