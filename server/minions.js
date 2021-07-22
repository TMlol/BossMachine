const minionsRouter = require("express").Router();

module.exports = minionsRouter;

const {
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");

minionsRouter.param("minionId", (req, res, next, id) => {
  const minionId = getFromDatabaseById("minions", id);
  if (minionId) {
    req.minion = minionId;
    next();
  } else {
    res.status(404).send();
  }
});

minionsRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("minions"));
});

minionsRouter.get("/:minionId", (req, res, next) => {
  res.send(req.minion);
});

minionsRouter.post("/", (req, res, next) => {
  const newMinion = addToDatabase("minions", req.body);
  res.status(201).send(newMinion);
});

minionsRouter.put("/:minionId", (req, res, next) => {
  const updatedMinion = updateInstanceInDatabase("minions", req.body);
  res.send(updatedMinion);
});

minionsRouter.delete("/:miniondId", (req, res, next) => {
  const deletedMinion = deleteFromDatabasebyId("minions", req.params.miniondId);
  if (deletedMinion) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});
