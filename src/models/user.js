const { sq } = require('../config/db')
const { DataTypes } = require('sequelize')

const User = sq.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
  role: {
    type: DataTypes.ENUM,
    values: ['user', 'admin'],
    defaultValue: 'user',
  },
  password: { type: DataTypes.STRING, allowNull: false },
  created: {type:DataTypes.DATE, allowNull:false,defaultValue:function(){
                                                                    let d = new Date()
                                                                    return d.toISOString()
                                                                          }}
},{
  timestamps:false,
  freezeTableName:true
})


module.exports = User
