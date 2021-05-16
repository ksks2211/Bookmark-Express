const Sequelize = require('sequelize');

module.exports = class Category extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            title :{
                type: Sequelize.STRING(20),
                allowNull:false,
            },
            createdAt:{
                type: Sequelize.DATE,
                allowNull:false,
                defaultValue : Sequelize.NOW,
            }

        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:"Category",
            tableName:"categories",
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci',
        })
    }

    static associate(db){
        db.Category.hasMany(db.Url,{ sourceKey:'id'});
    }
}