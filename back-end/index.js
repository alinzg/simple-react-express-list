import express from "express";
import fs from "fs/promises";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.listen(3001);

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());

const items = JSON.parse(await fs.readFile("../data/db.json", "utf-8"));

app.get("/api/items", (req, res) => {
  res.send(items);
});

app.post("/api/add", (req, res) => {
  items.push({ id: crypto.randomUUID(), ...req.body });
  fs.writeFile("../data/db.json", JSON.stringify(items, null, 2));
  res.send(201);
});

app.get("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  const index = items.findIndex((i) => i.id === id);
  items.splice(index, 1);
  fs.writeFile("../data/db.json", JSON.stringify(items, null, 2));
  res.send(202);
});
