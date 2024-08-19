import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json" assert { type: "json" };
import { envoriment } from "./env/envoriment.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(envoriment.appPort, () => {
  console.log(
    `Server running on port http://localhost:${envoriment.appPort}/api-docs`,
  );
});
