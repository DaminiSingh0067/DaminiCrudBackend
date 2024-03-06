const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express());
app.use(express.json());

app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/ins")
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const UserModel = mongoose.model("class", UserSchema);
app.get("/", (req, res) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/DBUSER", (req, res) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.post("/create", (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});
app.get("/", (req, res) => {
  res.send("Home Page");
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    { _id: id },
    { name: req.body.name, email: req.body.email, age: req.body.age }
  )

    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/getuser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});



app.delete("/delete/:id", (req,res)=>{
    const id=req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then((users)=> res.json(users))
    .catch((err)=>res.json(err))

})

port = 4000;
app.listen(port, () => {
  console.log(`web server run on this port :${port}`);
});
