import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Server is ready");
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server at ${port}`);
});
