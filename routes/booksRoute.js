import express from "express";
import { Book } from "../models/bookModel.js";
const router = express.Router();


// New Route for POST to create new book in the database
router.post('/', async (request, response)=>{
    try {
    // check if all the reuired fields present in the request
    if( !request.body.title ||
        !request.body.author ||
        !request.body.publishYear)
    {
        // if not then return 
        return response.status(400).send(
            {
                message:`Send all the reuired fields: title, author, publishYear`
            }
        );
    
    }
    //else create a new book in the database
    else{
    
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
    
    
        }
        const book = await Book.create(newBook);
        return response.status(201).send(book);
    }
        
    } catch (error) {
    
        console.log("Error in the POST method to create new book "+error.message);
        response.status(500).send({message:error.message});
        
    }
    
    });

//Route for get all books from the database    
router.get('/', async (request,response)=>{
        try {
            const books = await Book.find({});
            return response.status(200).json({
                // count: books.length,
                data: books
            });
        } catch (error) {
           console.log(`Error occured in the GET method 
           for getting all books from the database ${error.message}`);
           response.send({message:error.message}); 
        }
    
    
    })
    
    
    //Route for get a specific book from the database
    router.get('/:id', async (request,response)=>{
        try {
            
            const {id} = request.params;
    
    
            const book = await Book.findById(id);
    
            return response.status(200).json(book);
        } catch (error) {
           console.log(`Error occured in the GET method 
           for getting specific book from the database ${error.message}`);
           response.send({message:error.message}); 
        }
    
    
    })
    
    
    //Route for updating the book in the database  
    router.put('/:id', async (request, response) =>{
    
        try {
    
            // check if all the reuired fields present in the request
    if( !request.body.title ||
        !request.body.author ||
        !request.body.publishYear)
    {
        // if not then return 
        return response.status(400).send(
            {
                message:`Send all the reuired fields: title, author, publishYear`
            }
        );
    
    }
    
    else{
    
        const {id} = request.params;
    
        const result = await Book.findByIdAndUpdate(id, request.body);
    
        if(!result)
        {
            return response.status(404).send({message:'Book not found'});
        }
        else{
            return response.status(200).send({message:'Book updated successfully !!'});
        }
    
    }
    
            
        } catch (error) {
            console.log(`Error in the PUT method for updating a specific book ${error.message}`);
    
            response.status(500).send({message:error.message});
        }
    
        
    })
    
    // Route for Delete a book
    router.delete('/:id', async(request,response)=>{
    
        try {
            const {id}  = request.params;
    
            const result = await Book.findByIdAndDelete(id);
    
            if(!result)
            {
                return response.send(404).send({message: 'Book not found'});
    
            }
            else{
    
                return response.status(200).send(`book deleted successfully`);
    
            }
    
    
            
        } catch (error) {
            
            console.log(`Error in the DELETE method ${error.message}`);
            response.status(500).send({message: error.message});
        }
    
    
    });

export default router;