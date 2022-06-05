
//**********************************************************
//----------------------------------------------------------
//**********************************************************
//Selectors
//**********************************************************
//**********************************************************
//----------------------------------------------------------


console.log("Running main.js...") ;
// Taking values in input field 
const todoInput = document.querySelector('.todo-input'); 
// Taking button action
const todoButton = document.querySelector('.todo-button'); 
// Taking the ul to display the list in it
const todoList = document.querySelector('.todo-list'); 
// Taking the filter-todo select field to attac to function
const filterOption = document.querySelector('.filter-todo'); 




//**********************************************************
//----------------------------------------------------------
//**********************************************************
//Event Listeners
//**********************************************************
//----------------------------------------------------------
//**********************************************************

//Event listeners for when page (or document) is reloaded
document.addEventListener("DOMContentLoaded",getTodos);
//Event Listeners for click
todoButton.addEventListener("click",addTodo);
todoList.addEventListener("click",deleteCheckEdit);
filterOption.addEventListener("click",filterTodo);



//**********************************************************
//----------------------------------------------------------
//**********************************************************
//Functions
//**********************************************************
//----------------------------------------------------------
//**********************************************************
//----------------Functions for UI---------------------------
//**********************************************************

//-------------------------( 1 )----------------------------
//---------------TO ADD A TODO ON THE WEB PAGE--------------
function addTodo(e)
{
        
    //prevent from submitting form on clicking button
    e.preventDefault();
    
    //Creating this structure for every item on list-
    // <div class="todo">
    // <li></li>
    // <button>add</button>
    // <button>delete</button>
    // </div>
    if (todoInput.value.length == 0) {
        alert("field can't be empty");
        return false;
      }
    else
    {
        //Todo Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //Create LI
        const newTodo= document.createElement('li');
        newTodo.innerText=todoInput.value; 
        newTodo.classList.add('todo-item');
        newTodo.setAttribute('contenteditable', 'false');
        todoDiv.appendChild(newTodo);

        //Add todo to localStorage
        saveLocalTodos(todoInput.value);
        
        //Create check mark button
        const completedButton= document.createElement('button');
        completedButton.innerHTML='<i class="fas fa-check"> </i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        
        //Create trash button
        const trashButton= document.createElement('button');
        trashButton.innerHTML='<i class="fas fa-trash"> </i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);    

        //Create edit-save button
        const editButton= document.createElement('button');
        editButton.innerHTML='<i class="fa-solid fa-pen-to-square"></i>';
        editButton.classList.add('edit-btn');
        todoDiv.appendChild(editButton);    

        //Append to ul with class='todo list'
        todoList.appendChild(todoDiv);

        //Clear Todo Input Value
        todoInput.value="";
    }
}

//-------------------------( 2 )----------------------------
//-TO DELETE/CHECK OFF AND EDIT VIA BUTTONS ON THE WEB PAGE-

function deleteCheckEdit(event)
{
    //target is where user clicks
    const item=event.target;

    //Delete Todo
    //checking if the target class is trash-btn 
    if(item.classList[0]==="trash-btn")
    {
        const todo=item.parentElement;
        removeLocalTodos(todo);
        todo.remove();
    }
    //Check todo
    //checking if the target class is complete-btn 
    if(item.classList[0]==="complete-btn")
    {
        const todo=item.parentElement;
        todo.classList.toggle('completed');
    }
    //Edit todo
    //checking if the target class is edit-btn 
    if(item.classList[0]==="edit-btn")
    {
        const todo=item.parentElement.firstElementChild;
        if (todo.contentEditable == "false") {
            todo.contentEditable = "true";
            item.innerHTML = '<i class="fa-regular fa-floppy-disk"></i>';
            editLocalTodos(todo);
          } else {
            todo.contentEditable = "false";
            item.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
            SaveEditedLocalTodos(todo);
          }
    }
}

//-------------------------( 3 )-----------------------------
//-----TO ADD A FUNCTION TO FILTER OUT THE TASKS ON THE PAGE-

function filterTodo(e)
{
    //we get the array for all the children under our <ul> list
    const todo=todoList.children ;

    console.log(todo);
    
    //checking each element of list
    todo.forEach(function(singleTodo){
        switch(e.target.value)
        {
            case "all":
                console.log('here');
                singleTodo.style.display="block";
                break;
            case "completed":
                console.log('completed');
                //target.value means the place where user clicks on scroll down button
                if(singleTodo.classList.contains("complete"))
                {
                    singleTodo.style.display="block" ;                    
                }
                else{
                    singleTodo.style.display="none";
                }
                break;
            case "uncompleted":
                console.log('uncompleted');
                if(!singleTodo.classList.contains("complete"))
                {
                    singleTodo.style.display="block";                    
                }
                else{
                    singleTodo.style.display="none";
                }
                break;
        }

    })
}


//**********************************************************
//---------------Functions for LocalStorage------------------
//**********************************************************

//-------------------------( 1 )----------------------------
//--TAKING VALUES FROM USER-INPUTS AS ARGUMENT NAMED TODO---

function saveLocalTodos(todo)
{
    //defining an array to store our input and storing in localStorage
        let todos;
    //Check-----If we have todos in localStorage   

    //checking if "todos" key is available in localStorage
    if(localStorage.getItem('todos') === null)
    {
        todos =[];
    }
    //else 
    else
    {
        //Taking the values against "todos" key in localStorage and saving it as an array
        todos=JSON.parse(localStorage.getItem('todos'));        
    }
    //pushing recent user input in our array
    todos.push(todo);

    //taking the todos array as value against "todos" key
    localStorage.setItem("todos",JSON.stringify(todos))
}

//-------------------------( 2 )----------------------------
//----------RENDERING UPDATED localStorage ON OUR UI--------
function getTodos()
{
        let todos;
    //Check-----If we have todos in localStorage   
    if(localStorage.getItem('todos') === null)
    {
        todos =[];
    }
    //else 
    else
    {
        todos=JSON.parse(localStorage.getItem('todos'));        
    }
    //we have our previous userInput in out todos array 
    todos.forEach(function(todo)
    {
        //Todo Div
        const todoDiv = document.createElement('div');
        
        todoDiv.classList.add('todo');
        //Create LI
        const newTodo= document.createElement('li');
        newTodo.innerText=todo; 
        newTodo.classList.add('todo-item');
        newTodo.setAttribute('contenteditable', 'false');
        todoDiv.appendChild(newTodo);

        //Create check mark button
        const completedButton= document.createElement('button');
        completedButton.innerHTML='<i class="fas fa-check"> </i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        
        //Create trash button
        const trashButton= document.createElement('button');
        trashButton.innerHTML='<i class="fas fa-trash"> </i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);    

        //Create edit-save button
        const editButton= document.createElement('button');
        editButton.innerHTML='<i class="fa-solid fa-pen-to-square"></i>';
        editButton.classList.add('edit-btn');
        todoDiv.appendChild(editButton);    

        //Append to ul with class='todo list'
        todoList.appendChild(todoDiv);
    })
}


//-------------------------( 3 )----------------------------
//REMOVING ITEMS FRM localStorage WHEN USER CLICKS ON DELETE

//The todo here is the div that has the delete button
function removeLocalTodos(todo)
{
    let todos;
    //Check-----If we have todos in localStorage   
    if(localStorage.getItem('todos') === null)
    {
        todos =[];
    }
    //else 
    else
    {
        todos=JSON.parse(localStorage.getItem('todos'));        
    }
    //here,we are selecting the first child element of the todo div,which is li
    //and getting its innerText

    const todoIndexElement= todo.firstElementChild.innerText;
    todos.splice(todos.indexOf(todoIndexElement),1);
    localStorage.setItem("todos",JSON.stringify(todos))
}
//-------------------------( 4 )----------------------------
//REMOVING ITEMS FROM localStorage WHEN USER CLICKS ON EDIT

//The todo here is the div that has the delete button
function editLocalTodos(todo)
{
    let todos;
    //Check-----If we have todos in localStorage   
    if(localStorage.getItem('todos') === null)
    {
        todos =[];
    }
    //else 
    else
    {
        todos=JSON.parse(localStorage.getItem('todos'));        
    }

    //here,we are selecting the first child element of the todo div,which is li
    //and getting its innerText

    const todoIndexElement= todo.innerText;
        todos.splice(todos.indexOf(todoIndexElement),0,'');
        
        console.log(todoIndexElement);
        console.log(todos.indexOf(todoIndexElement));
        todos.splice(todos.indexOf(todoIndexElement),1);
        
    localStorage.setItem("todos",JSON.stringify(todos));
   
}
function SaveEditedLocalTodos(todo)
{
    let todos;
    //Check-----If we have todos in localStorage   
    if(localStorage.getItem('todos') === null)
    {
        todos =[];
    }
    //else 
    else
    {
        todos=JSON.parse(localStorage.getItem('todos'));        
    }
    
        // const todoIndexElement= todo.innerText;
        todos.splice(todos.indexOf(''),0,todo.innerText);
        todos.splice(todos.indexOf(''),1);
    //todos.splice(todos.indexOf(todoIndexElement),0,todoIndexElement);
    localStorage.setItem("todos",JSON.stringify(todos));
}