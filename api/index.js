import express from "express"

const app = express();
const port = 4045;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`);
});
