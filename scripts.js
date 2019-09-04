
class ToDoClass {
    constructor() {
        /*tasks is assigned to a local storage variable in order to retrieve are stored data.
        We save our task in localStorage as a string with 'TASKS' as its key.
        So when the user opens the website for the first time we need to check if any data is present in local storage with the
        key TASKS. We use JSON.parse to convert the data retrieved from localStorage from a string to an object.
        */
        this.tasks = JSON.parse(localStorage.getItem('TASKS'));
        if(!this.tasks){
            this.tasks =  [
                { task: 'Go To Doctor', isComplete: false },
                { task: 'Do Homework', isComplete: true },
                { task: 'Put Gas in Car', isComplete: false },
            ];
        }
        
        this.loadTasks();
        
        //its best to call event listeners in the constructor, so that the event listeners are set up when the class is initialized
        this.addEventListener();
    }

    addEventListener(){
        document.getElementById('addTask').addEventListener('keypress', event => {
            if(event.keyCode === 13 ){
                this.addTask(event.target.value);
                event.target.value = "";
            }
        });
    }

    //changes the toggleStatus of the checkbox 
    toggleTaskStatus(index) {
        this.tasks[index].isComplete = !this.tasks[index].isComplete;
        this.loadTasks();
    }

    deleteTask(event, taskIndex){
        event.preventDefault();
        this.tasks.splice(taskIndex, 1);
        let x = localStorage.removeItem('TASKS');
        console.log(x);
        this.loadTasks();
    }
    
    addTaskClick(){
        let target = document.getElementById('addTask');
        this.addTask(target.value);
        target.value = "";
    }

    addTask(task){
        let newTask = {
            task,
            isCompleted: false,
        };
        
        //parent div is simply uses to add the effects around the insert label if there is a text or not
        let parentDiv = document.getElementById('addTask').parentElement;
        if(task === ''){
            parentDiv.classList.add('has-error');
        } else {
            parentDiv.classList.remove('has-error');
            parentDiv.classList.add('has-success')
            this.tasks.push(newTask);
            this.loadTasks();
        }
    }

    /*note if you want to use a css style inside a div in a class that also contains other default classes in boothstrap
        you have to use ES6 notation to apply it. This means  ${cssClassName}
    */
    generateTaskHtml(task, index) {
        return `
            <li class="list-group-item checkbox">
            <div class="row">
                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">
                <label><input id="toggleTaskStatus" type="checkbox" onchange="toDo.toggleTaskStatus(${index})" value="" class="" ${task.isComplete ? 'checked' : ''}></label>
                </div>
                <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 task-text ${task.isComplete ? 'complete' : ''}">
                ${task.task}
                </div>
                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">
                <a class="" href="" onClick="toDo.deleteTask(event, ${index})"><i id="deleteTask" data-id="${index}" class="delete-icon glyphicon glyphicon-trash"></i></a>
                </div>
            </div>
            </li>
        `;
    }

    loadTasks() {
        //we use local storage here just incase the value in the constructor is set to null,
        //then now we will add the 3 predefine values in the task variable to the local storage right away.
        localStorage.setItem('TASKS', JSON.stringify(this.tasks));

        //research more on reduce
        let taskHtml = this.tasks.reduce((html, task, index) => html += this.generateTaskHtml(task, index), '');
        document.getElementById('taskList').innerHTML = taskHtml;
    }
}

let toDo;
window.addEventListener("load", () => {
  toDo = new ToDoClass();
  
});
var today = new Date();
document.getElementById('dtText').innerHTML=today;


var Cal = function(divId) {

    //Store div id
    this.divId = divId;
  
    // Days of week, starting on Sunday
    this.DaysOfWeek = [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat'
    ];
  
    // Months, stating on January
    this.Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
  
    // Set the current month, year
    var d = new Date();
  
    this.currMonth = d.getMonth();
    this.currYear = d.getFullYear();
    this.currDay = d.getDate();
  
  };
  
  // Goes to next month
  Cal.prototype.nextMonth = function() {
    if ( this.currMonth == 11 ) {
      this.currMonth = 0;
      this.currYear = this.currYear + 1;
    }
    else {
      this.currMonth = this.currMonth + 1;
    }
    this.showcurr();
  };
  
  // Goes to previous month
  Cal.prototype.previousMonth = function() {
    if ( this.currMonth == 0 ) {
      this.currMonth = 11;
      this.currYear = this.currYear - 1;
    }
    else {
      this.currMonth = this.currMonth - 1;
    }
    this.showcurr();
  };
  
  // Show current month
  Cal.prototype.showcurr = function() {
    this.showMonth(this.currYear, this.currMonth);
  };
  
  // Show month (year, month)
  Cal.prototype.showMonth = function(y, m) {
  
    var d = new Date()
    // First day of the week in the selected month
    , firstDayOfMonth = new Date(y, m, 1).getDay()
    // Last day of the selected month
    , lastDateOfMonth =  new Date(y, m+1, 0).getDate()
    // Last day of the previous month
    , lastDayOfLastMonth = m == 0 ? new Date(y-1, 11, 0).getDate() : new Date(y, m, 0).getDate();
  
  
    var html = '<table>';
  
    // Write selected month and year
    html += '<thead><tr>';
    html += '<td colspan="7">' + this.Months[m] + ' ' + y + '</td>';
    html += '</tr></thead>';
  
  
    // Write the header of the days of the week
    html += '<tr class="days">';
    for(var i=0; i < this.DaysOfWeek.length;i++) {
      html += '<td>' + this.DaysOfWeek[i] + '</td>';
    }
    html += '</tr>';
  
    // Write the days
    var i=1;
    do {
  
      var dow = new Date(y, m, i).getDay();
  
      // If Sunday, start new row
      if ( dow == 0 ) {
        html += '<tr>';
      }
      // If not Sunday but first day of the month
      // it will write the last days from the previous month
      else if ( i == 1 ) {
        html += '<tr>';
        var k = lastDayOfLastMonth - firstDayOfMonth+1;
        for(var j=0; j < firstDayOfMonth; j++) {
          html += '<td class="not-current">' + k + '</td>';
          k++;
        }
      }
  
      // Write the current day in the loop
      var chk = new Date();
      var chkY = chk.getFullYear();
      var chkM = chk.getMonth();
      if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
        html += '<td class="today">' + i + '</td>';
      } else {
        html += '<td class="normal">' + i + '</td>';
      }
      // If Saturday, closes the row
      if ( dow == 6 ) {
        html += '</tr>';
      }
      // If not Saturday, but last day of the selected month
      // it will write the next few days from the next month
      else if ( i == lastDateOfMonth ) {
        var k=1;
        for(dow; dow < 6; dow++) {
          html += '<td class="not-current">' + k + '</td>';
          k++;
        }
      }
  
      i++;
    }while(i <= lastDateOfMonth);
  
    // Closes table
    html += '</table>';
  
    // Write HTML to the div
    document.getElementById(this.divId).innerHTML = html;
  };
  
  // On Load of the window
  window.onload = function() {
  
    // Start calendar
    var c = new Cal("divCal");			
    c.showcurr();
  
    // Bind next and previous button clicks
    getId('btnNext').onclick = function() {
      c.nextMonth();
    };
    getId('btnPrev').onclick = function() {
      c.previousMonth();
    };
  }
  
  // Get element by id
  function getId(id) {
    return document.getElementById(id);
  }