$(document).ready(function() {

  $('#colorpicker').farbtastic('#color');

});

function addCategory(){           
    window.location.href = '/categories/add';
}
function addQuestion(){
    
    window.location.href = '/questions/add';
}
function addAnswer(){
	window.location.href = '/answers/add';
}
function addValQuestion(){  
    window.location.href = '/valquestions/add';
}
function cancelAddValQuestion(){
    window.location.href = '/valquestions';
}
function cancelAddCategory(){  
    window.location.href = '/categories';
}
function cancelAddQuestion(){
    window.location.href = '/questions';
}
function cancelAddAnswer(){
    window.location.href = '/answers';
}
function deleteCategory(id){
	window.location.href = '/categories/delete/' + id;
}
function deleteQuestion(id){
	window.location.href = '/questions/delete/' + id;
}
function deleteAnswer(id, pos, res){
	window.location.href = '/answers/delete/' + id + '/' + pos + '/' + res;
}
function deleteValQuestion(id){
	window.location.href = '/valquestions/delete/' + id;
}
function editCategory(id){
	window.location.href = '/categories/edit/' + id;
}
function editQuestion(id){
	window.location.href = '/questions/edit/' + id;
}
function editValQuestion(id){
	window.location.href = '/valquestions/edit/' + id;
}
function validateQuestion(id){
	window.location.href = '/valquestions/validate/' + id;
}

