import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(
  cors({
    origin: "*"
  })
);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.get("/api/suggestions", async (req, res) => {
  try {
    const data = await fetch(
      "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=" +
        req.query.q
    );
    if (!data.ok) {
      res.status(data.status).json({
        error: `HTTP error, ${data.status} ${data.statusText} at ${data.url} 
        (${new Date().toISOString()})`
      });
      return;
    }

    const json = await data.json();
    res.json(json);
  } catch (error) {
    res.status(500).json({ error: `Network error: ${error}` });
  }
});

// const port = process.env.PORT || 3001;
// app.listen(port, () => {
//   console.log(`Server at ${port}`);
// });

export default app;
