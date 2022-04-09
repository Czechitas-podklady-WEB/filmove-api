import express from 'express';

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});

app.listen(port, () => console.log(`Listening on ${port}`));
