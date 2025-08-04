document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('newTask');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');


    const addTask = () => {
        const taskText = newTaskInput.value.trim();


        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }


        const li = document.createElement('li');
        li.className = "flex justify-between items-center bg-white p-3 rounded-lg shadow-md transition-all duration-300";


        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        taskSpan.className = "flex-grow cursor-pointer text-gray-700";


        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = "flex items-center gap-2 ml-4";


        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = "edit-btn bg-yellow-500 text-white px-3 py-1 text-sm font-semibold rounded-md hover:bg-yellow-600 transition-colors";

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = "delete-btn bg-red-500 text-white px-3 py-1 text-sm font-semibold rounded-md hover:bg-red-600 transition-colors";


        buttonsDiv.appendChild(editButton);
        buttonsDiv.appendChild(deleteButton);

        li.appendChild(taskSpan);
        li.appendChild(buttonsDiv);


        taskList.appendChild(li);


        newTaskInput.value = "";
        newTaskInput.focus();
    };


    const handleTaskListClick = (event) => {
        const target = event.target;
        const li = target.closest('li');
        if (!li) return;

        const taskSpan = li.querySelector('span');


        if (target === taskSpan) {
            taskSpan.classList.toggle('line-through');
            taskSpan.classList.toggle('text-gray-400');
        }


        if (target.classList.contains('delete-btn')) {
            li.style.transform = 'translateX(100%)';
            li.style.opacity = '0';
            setTimeout(() => {
                li.remove();
            }, 300);
        }


        if (target.classList.contains('edit-btn')) {
            const currentText = taskSpan.textContent;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentText;
            input.className = 'flex-grow p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500';


            li.replaceChild(input, taskSpan);
            input.focus();


            target.textContent = 'Save';
            target.classList.remove('edit-btn', 'bg-yellow-500', 'hover:bg-yellow-600');
            target.classList.add('save-btn', 'bg-green-500', 'hover:bg-green-600');
        }

        else if (target.classList.contains('save-btn')) {
            const input = li.querySelector('input[type="text"]');
            const newText = input.value.trim();

            if (newText) {
                const newSpan = document.createElement('span');
                newSpan.textContent = newText;
                newSpan.className = "flex-grow cursor-pointer text-gray-700";


                if (li.querySelector('.line-through')) {
                    newSpan.classList.add('line-through', 'text-gray-400');
                }


                li.replaceChild(newSpan, input);


                target.textContent = 'Edit';
                target.classList.remove('save-btn', 'bg-green-500', 'hover:bg-green-600');
                target.classList.add('edit-btn', 'bg-yellow-500', 'hover:bg-yellow-600');
            } else {

                li.remove();
            }
        }
    };


    addTaskButton.addEventListener('click', addTask);


    newTaskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });


    taskList.addEventListener('click', handleTaskListClick);
});