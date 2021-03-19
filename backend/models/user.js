module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      email: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING
      },
      lastName: {
        type: DataTypes.STRING
      },
      followers: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'user'
      },    
    },
    {
        indexes: [
          {
            unique: 'false',
            fields: ['firstName', 'lastName']
          }
        ]
    }
    );
  
    return User;
};