module.exports = (sequelize, Sequelize) => {
  const Game = sequelize.define("games", {
    name: { type: Sequelize.STRING },
    price: { type: Sequelize.FLOAT },
  });

  Game.associate = (models) => {
    Game.belongsTo(models.category, {
      onDelete: "CASCADE",
      foreignKey: "category_id",
    });
  };

  return Game;
};
