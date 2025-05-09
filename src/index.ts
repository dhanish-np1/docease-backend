import express from "express";
import { config } from "./config/config";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import { connectToDatabase } from "./infrastructure/database/mongodb.connection";

const app = express();
const port = config.server.port;
const allowedOrigins = config.allowedOrigins || ["http://localhost:5173"];

app.use(bodyParser.json({ limit: "10mb",strict:true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true, parameterLimit: 10000 }));
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET,PUT,PATCH,POST,DELETE"],
    credentials: true,
  })
);
app.use(helmet());



// Connect to MongoDB and start the server
connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  });
