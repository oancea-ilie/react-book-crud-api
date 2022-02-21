import  express from "express";

export default class BooksController{

     constructor(booksServices,app){

         this.booksServices = booksServices;

         this.route = express.Router();

         app.use("/api/v1/books", this.route);

         this.getAllBooks();
         this.getPersonById();
         this.createPerson();
         this.deletePerson();
         this.updatePerson();

         this.catchErr();
     }


     getAllBooks= async ()=>{

         this.route.get("/", async (req,res,next)=>{
             try{

                let books = await this.booksServices.getAll();

                res.status(200).json(books);

             }catch(e){
                 next(e);
             }
             
         });

    }

    getPersonById= async()=>{
        this.route.get("/:id", async (req,res,next)=>{
            try{
                let {id}= req.params;

                let book = await this.booksServices.getById(id);

                res.status(200).json(book);

            }catch(e){
                next(e);
            }

         });
    }

    createPerson = async()=>{
        this.route.post("/",async(req,res,next)=>{
            try{
                let book = req.body;

                await this.booksServices.createP(book);

                res.status(204).end();
            }catch(e){
                next(e);
            }
        })
    }

    deletePerson = async()=>{
        this.route.delete("/:id", async(req,res,next)=>{
            try{
                let {id} = req.params;
                let per = await this.booksServices.deleteP(id);

                res.status(204).end();

            }catch(e){
                next(e);
            }
        });
    }

    updatePerson = async()=>{
        this.route.put("/:id", async(req,res,next)=>{
            try{
                let {id} = req.params;
                let user = req.body;
                
                await this.booksServices.updateP(id,user);

                res.status(204).end();
                
            }catch(e){
                next(e);
            }
        });
    }

    catchErr=async()=>{
        this.route.use((err,req,res,next)=>{
            res.status(err.status || 500);
    
            res.json({
               error:{
                   message:err.message
               }
            });
         });
    }

}

