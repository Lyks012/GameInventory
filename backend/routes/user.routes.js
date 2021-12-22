module.exports = (app) => {
  const users = require("../controllers/user.controller");
  const signin = require("../controllers/auth");

  let router = require("express").Router();

  router.get("/", users.findAll);
  router.get("/countMyGames", users.countMyGames);
  router.get("/getMyGames", users.getMyGames);

  router.post("/", users.create);
  router.post("/signin", signin.login);
  router.post("/:gameId", users.addAGame);

  router.put("/:id", users.update);

  router.delete("/removeAGame", users.removeAGame);

  app.use("/api/users", router);
};
