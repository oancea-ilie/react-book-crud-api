import { Sequelize } from "sequelize";

export default (sequelize)=>{

    class Books extends Sequelize.Model{}

    Books.init({
        id:{
            type:Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement:true
        },

        title:{
            type:Sequelize.STRING,
            allowNull:false,
            validate: {
                notNull:{
                    msg: 'title can not be null!'
                },
                notEmpty:{
                    msg:'title can not be empty!'
                },
            },
        },

        author:{
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'author can not be null!'
                },
                notEmpty:{
                    msg:'author can not be empty!'
                },
            },
        },

        genre:{
            type:Sequelize.STRING,
            allowNull:false,
            validate: {
                notNull:{
                    msg: 'genre can not be null!'
                },
                notEmpty:{
                    msg:'genre can not be empty!'
                },
            },
        },

        year:{
            type:Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'year can not be null!'
                },
                notEmpty:{
                    msg:'year can not be empty!'
                },
            },
        }
        
    },{
        sequelize,
        timestamps:false,
        createdAt:false,
        updatedAt:false,
    });

    return Books;
};