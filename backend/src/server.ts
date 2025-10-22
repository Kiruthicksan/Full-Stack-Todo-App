import express from "express"
import dotenv from "dotenv"
import { Connect } from "./config/db.js"
import taskRoutes from "./routes/taskRoutes.js"
import cors from "cors"

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors({origin : 'http://localhost:5173'}))
app.use("/api" , taskRoutes)

Connect()
const port = process.env.PORT

app.listen(port, () => console.log(`server running on http://localhost:${port}`))