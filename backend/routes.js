import express, { Router } from "express";
import { credit , withdraw , transfer , loan } from "./controllers/transactions.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hey man");
});

/////////////////////////////////////////////////////////////////////////////////////////////
// credit
router.post("/credit", credit);

/////////////////////////////////////////////////////////////////////////////////////////////
// withdraw
router.post("/withdraw", withdraw);

/////////////////////////////////////////////////////////////////////////////////////////////
// transfer
router.post("/transfer", transfer);

/////////////////////////////////////////////////////////////////////////////////////////////
//loan
router.post("/loan", loan);

export default router;