import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import routedb from './routes/dbRoute.js'
import userRoute from './routes/userRoute.js'
import productRoute from "./routes/productRoute.js"
import authRoute from "./routes/authRoute.js"

dotenv.config();

const app = express()
const port = 3004

app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: 'localhost:3000'
}))

app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res) => res.send('Hello World!'))

app.use('/create', routedb);
app.use('/api', userRoute);
app.use('/api', productRoute);
app.use('/api', authRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))