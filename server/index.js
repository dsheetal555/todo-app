const tasks = require("./routes/tasks");
const connection = require("./db");
const cors = require("cors");
const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require('./swagger');
const app = express();


connection();

app.use(express.json());
app.use(cors());

// Serve Swagger documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use("/api/tasks", tasks);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
