import fs from "fs"
import path from "path";

import { Sequelize } from "sequelize";
import Books from "../model/books.js";
import Customer from "../model/customer.js";

export default  class Repository {
      
        config =()=>  new Promise((resolve,reject)=>{
            fs.readFile(path.normalize("src\\config\\config.json"),'utf8',(err,data)=>{
                if(err){
                    reject(err);
                }else{
                    const {development} = JSON.parse(data);
                    resolve(development);
                }
            });
        });

        createDb= async()=>{
            try{
               let development = await this.config();
      
               let sequelize = new Sequelize(development.database, development.username, development.password, {
                  host: development.host,
                     dialect: development.dialect
                });
  
              let db={
                models:{}
              }

              db.sequelize = sequelize;
              db.Sequelize = Sequelize;
              db.models.Books = Books(sequelize);
              db.models.Customer = Customer(sequelize);

            //   db.models.Customer.hasMany(db.models.Books,{
            //     onDelete: 'CASCADE',
            //     as:'fk_customer_id',
            //     foreignKey:{
            //         fieldName:'customer_id',
            //         allowNull:false
            //     },
            // });
            // db.models.Books.belongsTo(db.models.Customer,{
            //     as:'fk_customer_id',
            //     foreignKey:{
            //         fieldName:'customer_id',
            //         allowNull:false
            //     },
            // });

              return db;
              
            }catch(e){
              throw new  Error(e);
            }
        }

};