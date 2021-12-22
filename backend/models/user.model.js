module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    username: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
    isAdmin: { type: Sequelize.BOOLEAN },
  });

  User.associate = (models) => {
    User.belongsToMany(models.games, {
      through: "user_games",
    });
  };

  return User;
};
