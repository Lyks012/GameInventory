module.exports = (app) => {
  const games = require("../controllers/game.controller");
  let router = require("express").Router();

  router.get("/", games.findAll);
  router.get("/:name", games.findByName);

  router.post("/", games.create);

  router.put("/", games.update);

  router.delete("/:id", games.delete);

  app.use("/api/games", router);
};
