module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("post", {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      postContent: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      liked: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      commented: {
        type: DataTypes.INTEGER,
        defaultValue: 0
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
  
    return Post;
};
