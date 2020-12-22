import { callApi } from "./TaskService.js";
import Task from "./models/Task.js";


const getEle = (id) => document.getElementById(id);


const getListTask = () => {
    callApi(`TASK`, "GET", null)
        .then((result) => {
            console.log(result.data)
            let content1 = "";
            let content2 = "";
            getEle("todo").innerHTML = '';
            getEle("completed").innerHTML = '';
            result.data.map((task, index) => {
                if (task.status === "todo") {
                    content1 += `
                <li>
                <span>${task.taskName}</span>
                <div class = "buttons">
                <button class = "complete" onclick = "editTodo('${task.id}')" ><i  class="fa fa-check-circle"></i></button>
                <button class = "remove" onclick = "deleteTodo('${task.id}')"><i class="fa fa-trash"></i></button>
                </div>
                </li>
                `;
                    getEle("todo").innerHTML = content1;
                }
                else if (task.status === "completed") {
                    content2 += `
                <li>
                <span>${task.taskName}</span>
                <div class = "buttons">
                <button class = "complete" onclick = "editTodo('${task.id}')" ><i  class="fa fa-check-circle"></i></button>
                <button class = "remove" onclick = "deleteTodo('${task.id}')"><i class="fa fa-trash"></i></button>
                </div>
                </li>                
                `;
                    getEle("completed").innerHTML = content2;
                }
            });
        })
}
getListTask();

window.deleteTodo = deleteTodo;
function deleteTodo(id) {
    callApi(`TASK/${id}`, "DELETE", null)
        .then(() => {
            getListTask();
        })
}

getEle("addItem").addEventListener("click", function () {
    const taskName = getEle("newTask").value;

    const task = new Task("", taskName, "todo");
    callApi(`TASK`, "POST", task)
        .then(() => {
            getListTask();
        })
})

window.editTodo = editTodo;
function editTodo(id) {
    const taskName = getEle("newTask").value;
    const task = new Task(id, taskName, "completed");
    callApi(`TASK/${id}`, "GET", null)
        .then((result) => {
            if (result.data.status === "todo")
                result.data.status = 'completed';
            return callApi(`TASK/${task.id}`, "PUT", task)
                .then(() => {
                    getListTask();
                })
        })
}










