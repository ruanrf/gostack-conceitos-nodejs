const express = require("express");
const app = express();

const cors = require("cors");

const { v4: uuid } = require('uuid');


app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
   return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body
  var likes = 0
  repository = { id: uuid(), title, url, techs, likes }

  repositories.push(repository)

  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found! ಥ_ಥ'});
  };
 
  repositories[repositoryIndex].title = title
  repositories[repositoryIndex].url = url
  repositories[repositoryIndex].techs = techs
  return response.json(repositories[repositoryIndex])
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params
  
  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found! ಥ_ಥ'})
  }
  repositories.splice(repositoryIndex, 1)

  return response.status(204).send()
});

// LIKE
app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params
  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (repositoryIndex < 0) { 
    return response.status(400).json({ error: 'Repository not found! ಥ_ಥ'})
  }
  repositories[repositoryIndex].likes++

  return response.json(repositories[repositoryIndex])
});

module.exports = app;
