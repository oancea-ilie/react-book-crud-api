
export default class BooksService{
      
    constructor({Books},{sequelize}){
          this.book = Books;
          this.sequelize = sequelize;
    }

    getAll= async ()=>{
          
      try{
        let books = await this.book.findAll();
     

        if(books.length == 0){
            throw new Error("Nu exista carti in baza de date!");
        }
 
        return books;
          
      }catch(e){
        throw new Error(e);
      }

    }

    getById = async(id)=>{
        let book = await this.book.findByPk(id);
        
        if(!book){
            throw new Error("Nu exista book cu acest id!");
        }
        return book;

    }

    createP= async(book)=>{
        
        let allBooks = await this.book.findAll();

        if(book.title == null || book.author == null || book.genre == null || book.year == null){
            throw new Error("Propietati invalide!");
        }
        if(!book.title){
            throw new Error('Campul title este gol!');
        }
        else if(!book.author){
            throw new Error('Campul author este gol!');
        }
        else if(!book.genre){
            throw new Error('Campul genre este gol!');
        }
        else if(!book.year){
            throw new Error('Campul year este gol!');
        }
        else if(typeof book.year != 'number'){
            throw new Error('Campul year trebuie sa fie un numar!');
        }
        else{
            if(allBooks){
                for(let p of allBooks){
                    if(p.title == book.title){
                        throw new Error("Acesta carte exista deja in baza de date!");
                    }
                }
            }

            await this.book.create(book);

        }

    }

    deleteP=async(id)=>{
        let book = await this.getById(id);
                
        if(book){
            await book.destroy();
        }else{
            throw new Error("Nu s-a gasit book cu acest ID pentru a putea fii stearsa!");
        }
    }

    updateP= async(id, user)=>{
        let book = await this.getById(id);
        
        if(user.title == '' && user.author=='' && user.genre == '' && user.year == ''){
            throw new Error("Nu exista propietati pentru update!");
        }
        if(book){

            if(user.title){
                book.title = user.title;
            }
            if(user.author){
                book.author = user.author;
            }
            if(user.genre){
                book.genre = user.genre;
            }
            if(user.year){
                book.year = user.year;
            }

            await book.save();

        }else{
            throw new Error("Nu s-a gasit book cu acest ID pentru a putea face Update!");
        }
    }




}