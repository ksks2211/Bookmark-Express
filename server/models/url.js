const Sequelize = require('sequelize')
const moment = require('moment');
module.exports = class Url extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            title:{
                type:Sequelize.STRING(12),
                allowNull:false,
            },
            url:{
                type:Sequelize.STRING(100),
                allowNull:false,
            },
            visit:{
                type:Sequelize.INTEGER.UNSIGNED,
                defaultValue:0,
            },
            visitedAt:{
                type:Sequelize.DATE,
                allowNull:false,
                defaultValue: Sequelize.NOW,
                get: function(){
                    return moment(this.getDataValue('visitedAt')).format('YYYY-MM-DD')
                }
            },
            hostname:{
                type:Sequelize.STRING(100),
                allowNull:false,
            },
            description:{
                type:Sequelize.STRING(150),
                allowNull:true,
            },
            fixed:{
                type:Sequelize.ENUM('yes','no'),
                allowNull:false,
                defaultValue:'no'
            }
        },{
            sequelize,
            timestamps: false,
            underscored: false,
            modelName:"Url",
            tableName:"urls",
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci',
        })
    }
    static associate(db){
        db.Url.belongsTo(db.Category,{targetKey:'id',onUpdate: 'cascade',onDelete: 'set null'});// "CategoryId"
    }
}