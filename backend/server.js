import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.get("/api/suggestions", async (req, res) => {
  try {
    const data = await fetch(
      "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=" +
        req.query.q
    );
    const json = await data.json();
    res.json(json);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server at ${port}`);
});
