import router from "./routes/tasksRoute.js";
import connection from "./db.js";
import cors from "cors";
import express, { json } from "express";
import { serve, setup } from "swagger-ui-express";
import swaggerSpec from './swagger.js';
const app = express();
connection();

app.use(json());
app.use(cors());

// Serve Swagger documentation
app.use('/api-docs', serve, setup(swaggerSpec));

app.use("/api/tasks", router);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
