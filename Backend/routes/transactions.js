const express = require("express")
const router = express.Router()

const Transaction = require("../models/Transaction")

router.get("/", async (req, res) => {

    const transactions = await Transaction.find()

    res.json(transactions)

})

router.post("/", async (req, res) => {

    const newTransaction = new Transaction(req.body)

    await newTransaction.save()

    res.json(newTransaction)

})

router.delete("/:id", async (req,res)=>{

await Transaction.findByIdAndDelete(req.params.id)

res.json({message:"Transaction deleted"})

})

module.exports = router