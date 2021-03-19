module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("comment", {
      commentText: {
        type: DataTypes.STRING,
        allowNull: false
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false
      },
      reported: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    });
  
    return Comment;
};