export default function db() {
  return {
    create: () => {
      let file = fs.readFileSync("database.json");
      let myobj = JSON.parse(file);
      myobj.push(req.body);
      let newData = JSON.stringify(myobj);
      fs.writeFile("database.json", newData, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Added :) ");
        }
      });
      res.sendStatus(201);
    },
  };
}
