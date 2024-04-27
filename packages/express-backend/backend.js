// backend.js
import express, { json } from "express";
import {addUser, getUsers, findUserById, findUserByName, findUserByJob,} from "user-service.js";
import cors from "cors";

const app = express();
const port = 8000;
const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
};

app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => { // get by name and/or job
  const name = req.query.name;
  const job = req.query.job;
  getUsers(name, job)
  .then(result => res.send({ users_list: result }))
  .catch((error) => {
    console.log(error);
  })
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  findUserById(id)
  .then(result => res.send(result))
  .catch(error => {
    console.log(error);
  }) 
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd)
  .then(json => res.status(201).send(json))
  .catch(error => {
    console.log(error);
  }) 
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"]; 
  findUserById(id)
  .then(result => { 
    users["users_list"].pop(result);
    res.status(204).send();
  })
  .catch(res.status(404).send("Resource not found."))
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});