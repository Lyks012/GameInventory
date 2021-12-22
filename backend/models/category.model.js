module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("category", {
    name: { type: Sequelize.STRING },
  });

  Category.associate = (models) => {
    Category.hasMany(models.games, {
      onDelete: "CASCADE",
      foreignKey: "category_id",
      as: "",
    });
  };

  return Category;
};
