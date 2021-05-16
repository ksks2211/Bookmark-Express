const Sequelize = require('sequelize')

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
                allowNull:false,
                default:0,
            },
            visitedAt:{
                type:Sequelize.DATE,
                allowNull:false,
                defaultValue: Sequelize.NOW
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
                default:'no'
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
        db.Url.belongsTo(db.Category,{targetKey:'id'});
    }
}