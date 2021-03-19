module.exports = (sequelize, DataTypes) => {
    const Follow = sequelize.define("follow", {
      userFollowed: {
        type: DataTypes.INTEGER,
      },
      userEmail: {
        type: DataTypes.STRING,
        allowNull: false
      },
    });
  
    return Follow;
};
