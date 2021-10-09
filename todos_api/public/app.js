/* global $ */
$(document).ready(() => {
    $.getJSON("/api/todos")
    .then(addTodos);
    
    $('#todoInput').keypress(event => {
        if(event.which == 13) {
            createTodo();
        }
    });
    
    $('.list').on('click', 'li', function(){
        updateTodo($(this));
    });
    
    $('.list').on('click', 'span', function(e){
        e.stopPropagation();
        removeTodo($(this).parent());
    });
});

function addTodos(todos) {
    //add todos to page here
    todos.forEach(todo => {
        addTodo(todo);
    });
}

function addTodo(todo) {
    let newTodo = $('<li class="task">'+ todo.name + '<span>X</span></li>');
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    if(todo.completed) {
        newTodo.addClass("done");
    }
    $('.list').append(newTodo);
}


function appendTodo(todo) {
    let newTodo = $('<li class="task">'+ todo + '<span>X</span></li>');
    $('.list').append(newTodo);
}

function createTodo(){
    //send request to create new todo
    let userInput = $('#todoInput').val();
    
    //append on the page first and delete if catching error
    // $('#todoInput').val('');
    // appendTodo(userInput);
    
    $.post('/api/todos', {name: userInput})
    .then(newTodo => {
        console.log(newTodo);
        $('#todoInput').val('');
        addTodo(newTodo);
    })
    .catch(err => {
        console.log(err);
        // $('li:contains(' + userInput + ')').remove();
    });
}

function removeTodo(todo) {
    let clickedId = todo.data('id');
    let deleteUrl = '/api/todos/' + clickedId;
    todo.remove();
    $.ajax({
        method: 'DELETE',
        url: deleteUrl
    })
    .then(data => {
        // todo.remove();
    });
}

function updateTodo(todo) {
    let updateUrl = '/api/todos/' + todo.data('id');
    let isDone = !todo.data('completed');
    let updateData = {completed: isDone};
    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData
    })
    .then(updatedTodo => {
        todo.toggleClass("done");
        todo.data('completed', isDone);
    });
}