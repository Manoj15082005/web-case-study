const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/petAbandonment", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const PetSchema = new mongoose.Schema({
    petName: String,
    petType: String,
    location: String,
    description: String,
    date: { type: Date, default: Date.now }
});

const PetReport = mongoose.model("PetReport", PetSchema);

app.post("/report", async (req, res) => {
    const newReport = new PetReport(req.body);
    await newReport.save();
    res.send({ message: "Report saved successfully!" });
});

app.get("/reports", async (req, res) => {
    const reports = await PetReport.find();
    res.json(reports);
});

app.listen(5000, () => console.log("Server running on port 5000"));
