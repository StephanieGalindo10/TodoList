var addList = document.getElementById('add-list');
var listContainer = document.getElementById('items-list');

//To add a new list //
addList.addEventListener('click', addEvent);
listContainer.addEventListener('click', removeEvent);
listContainer.addEventListener('click', crossOff);


function addEvent(e) {
  e.preventDefault();
  var displayList = document.createElement('li');
  var inputValue = document.getElementById('new-item').value;

  displayList.textContent = inputValue;
  displayList.className = 'list-group-item mb-2 w-75';

  var completeTask = document.createElement("img");
  completeTask.setAttribute('src', 'http://res.cloudinary.com/busayyyo/image/upload/v1521210917/checkmark_pnq3h6.png');
  completeTask.className = 'mr-2 img-margin btn btn-sm btn-info float-right';
  completeTask.style.height = '30px';


  var deleteTask = document.createElement('button');
  deleteTask.innerHTML = 'x';
  deleteTask.className = 'btn btn-sm btn-danger float-right mr-2';

  if(inputValue) {
    displayList.appendChild(completeTask);
    displayList.appendChild(deleteTask);
    listContainer.appendChild(displayList);
    addList.reset();
  }
}

//To delete list//
function removeEvent(e) {
  if(e.target.classList.contains('btn-danger')) {
    if (confirm('Are you sure?')) {
      var list = e.target.parentElement;
      listContainer.removeChild(list);
    }
  }
}


//To check-off list//
function crossOff(e) {
  if(e.target.classList.contains('img-margin')) {
    var list = e.target.parentElement;
    list.classList.toggle('cross');
  }
}
