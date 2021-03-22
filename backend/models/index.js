const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user")(sequelize, Sequelize);
db.posts = require("./post")(sequelize, Sequelize);
db.comments = require("./comment")(sequelize, Sequelize);
db.likes = require("./like")(sequelize, Sequelize);
db.follows = require("./follow")(sequelize, Sequelize);

db.images = require('../models/image.js')(sequelize, Sequelize);

db.users.hasMany(db.posts, { foreignKey: 'userId', as: 'user_post', onDelete: 'cascade', hooks: true  });
db.users.hasMany(db.comments, { foreignKey: 'userId', as: 'user_comment', onDelete: 'cascade', hooks: true  });

db.users.hasOne(db.images, { foreignKey: "userId", as: 'userImage', onDelete: 'cascade', hooks: true });

db.posts.hasMany(db.comments, { as: 'postComment', onDelete: 'cascade', hooks: true });
db.comments.belongsTo(db.posts, {foreignKey: "postId", as: "post"});

db.users.hasMany(db.likes, { as: 'userLike', onDelete: 'cascade', hooks: true });
db.posts.hasMany(db.likes, { as: 'postLike', onDelete: 'cascade', hooks: true });

db.users.hasMany(db.follows, { as: 'userFollow', onDelete: 'cascade', hooks: true });

module.exports = db;




