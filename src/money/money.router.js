import exress from "express";
import { moneyController } from "./money.controller.js";
const moneyRouter = exress.Router();

moneyRouter.get("/", moneyController.findAll);
moneyRouter.get("/:code", moneyController.convert);
moneyRouter.post("/", moneyController.create);
moneyRouter.delete("/:code", moneyController.remove);

export default moneyRouter;
