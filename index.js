import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import db from "db"

let database = db();
let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//post
app.post("/item", (req, res) => {
  if (req.body.hasOwnProperty("name")) {
    database.create();
  } else res.sendStatus(400);
});

//delete
app.delete("/item/:id", (req, res) => {
  let ID = +req.params.id;
  console.log(ID);
  let file = fs.readFileSync("database.json");
  let myobj = JSON.parse(file);
  console.log(myobj);
  if (myobj) {
    let result = myobj.filter((item) => item.id !== ID);
    console.log(result);
    fs.writeFileSync("database.json", JSON.stringify(result));
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

//get
app.get("/item/:id", (req, res) => {
  let ID = req.params.id;
  let file = fs.readFileSync("database.json");
  let myobj = JSON.parse(file);
  console.log(myobj);
  myobj.forEach((element) => {
    if (ID === element.id) {
      res.send(element);
    }
  });
});

//patch
app.patch("/item/:id", (req, res) => {
  let ID = req.params.id;
  let file = fs.readFileSync("database.json");
  let myobj = JSON.parse(file);

  myobj.forEach((element) => {
    if (ID === element.id) {
      Object.keys(element).forEach((key) => {
        if (req.body[key] !== undefined) {
          element[key] = req.body[key];
        }
      });

      // Save the updated data back to the file
      fs.writeFileSync("database.json", JSON.stringify(myobj));

      res.sendStatus(200);
    }
  });
});

app.listen(2416, () => console.log("server running"));
