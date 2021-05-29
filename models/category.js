const Sequelize = require('sequelize');
const moment = require('moment');
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
                get: function(){
                    return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD')
                }
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
        db.Category.hasMany(db.Url,{ sourceKey:'id',onUpdate: 'cascade',onDelete: 'set null'});
    }
}