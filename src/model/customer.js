import { Sequelize } from "sequelize";

export default (sequelize)=>{

    class Customer extends Sequelize.Model{}

    Customer.init({
        id:{
            type:Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement:true
        },

        name:{
            type:Sequelize.STRING,
            allowNull:false,
            validate: {
                notNull:{
                    msg: 'Name can not be null!'
                },
                notEmpty:{
                    msg:'Name can not be empty!'
                },
            },
        },
        email:{
            type:Sequelize.STRING,
            allowNull:false,
            validate: {
                notNull:{
                    msg: 'Email can not be null!'
                },
                notEmpty:{
                    msg:'Email can not be empty!'
                },
            },
        },

        password:{
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
        
    },{
        sequelize,
        timestamps:false,
        createdAt:false,
        updatedAt:false,
    });

    return Customer;
};