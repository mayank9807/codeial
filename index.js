const express = require('express');//requiring expresss
const app = express();

const port = 8000;//a constant port

//for database
const db = require('./config/mongoose');
const Todo  = require('./models/todo');


// set up the view engine
app.set('view engine' , 'ejs');
app.set('views', './views');


app.use(express.urlencoded());//middleware

// express will look for static files in assets folder
app.use(express.static('assets'));


//Routes goes here (following RESTFUL Routes Convention)
app.get('/' , function(req, res){
    
    Todo.find({} , function(err , todos){
        if(err){
            console.log('Error in fetching todos from db');
            return;
        }
        return res.render('home' , {
            title : "TODO App",
            todo_list : todos
    });

    });

});


app.post('/add-task' , function(req , res){

    Todo.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
    },function(err , newTodo){
        if(err){
            console.log('error in creating a todo');
            return;
        }
        console.log('*********',newTodo);
        return res.redirect('back');
    });
  
});

// for deleting a task
app.post('/delete-task', function(req, res){
      
// GET THE ID IN TASK AND DELETE SELECTED USING  findByIdAndDelete 
    Object.keys(req.body).forEach(function(key){
        Todo.findByIdAndDelete(key,function(err){
            if(err){
                console.log('Error in deleting an list from database',err);
                return;
            }
            console.log('One list is deleted');
            
        });
    });
    return res.redirect('back');

});


app.listen(port , function(err){
    if(err){
        // interpolation
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
});