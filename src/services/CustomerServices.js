
export default class CustomerService{
      
    constructor({Customer},{sequelize}){
          this.customer = Customer;
          this.sequelize = sequelize;
    }

    getAll= async ()=>{
          
      try{
        let books = await this.customer.findAll();
     

        if(books.length == 0){
            throw new Error("Nu exista customer in baza de date!");
        }
 
        return books;
          
      }catch(e){
        throw new Error(e);
      }

    }

    getById = async(id)=>{
        let book = await this.customer.findByPk(id);
        
        if(!book){
            throw new Error("Nu exista customer cu acest id!");
        }
        return book;

    }

    createP= async(book)=>{

        if(book.name == null || book.email == null || book.password == null){
            throw new Error("Propietati invalide!");
        }
        if(!book.name){
            throw new Error('Campul name este gol!');
        }
        else if(!book.email){
            throw new Error('Campul email este gol!');
        }
        else if(!book.password){
            throw new Error('Campul password este gol!');
        }
        else{
            await this.customer.create(book);

        }

    }

    deleteP=async(id)=>{
        let book = await this.getById(id);
                
        if(book){
            await book.destroy();
        }else{
            throw new Error("Nu s-a gasit customer cu acest ID pentru a putea fii stearsa!");
        }
    }

    updateP= async(id, user)=>{
        let book = await this.getById(id);
        
        if(user.name == '' && user.email=='' && user.passwrod == ''){
            throw new Error("Nu exista propietati pentru update!");
        }
        if(book){

            if(user.name){
                book.name = user.name;
            }
            if(user.email){
                book.email = user.email;
            }
            if(user.passwrod){
                book.passwrod = user.passwrod;
            }

            await book.save();

        }else{
            throw new Error("Nu s-a gasit Cusotmer cu acest ID pentru a putea face Update!");
        }
    }




}