let calendar=document.querySelector('.calendar')
calendar.addEventListener("click",function() {
    location.assign('https://calendar.google.com/calendar/u/0/r?pli=1')
} )
const hourHand = document.getElementById('hour-hand');
const minuteHand = document.getElementById('minute-hand');
const secondHand = document.getElementById('second-hand');

function updateClock() {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const secondDeg = (seconds / 60) * 360;
    const minuteDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
    const hourDeg = (hours / 12) * 360 + (minutes / 60) * 30;

    secondHand.style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
    hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
}

setInterval(updateClock, 1000);

updateClock();

// Локальное хранилище
let tasks = JSON.parse(localStorage.getItem('tasks')) || {
    schedule: [],
    homework: [],
    grades: [],
    plans: []
};

// Элементы модального окна
const modal = document.getElementById('modal');
const modalContentList = document.getElementById('modal-content-list');
const modalTitle = document.getElementById('modal-title');
const addTaskForm = document.getElementById('add-task-form');
const taskCategoryInput = document.getElementById('task-category');
const taskContentInput = document.getElementById('task-content');
const closeModal = document.getElementById('close-modal');

// Функция для отображения модального окна с задачами
function openModal(category) {
    modal.style.display = 'block';
    modalTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    addTaskForm.style.display = 'none';
    modalContentList.innerHTML = '';

    tasks[category].forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;
        modalContentList.appendChild(li);
    });
}

// Функция для открытия формы добавления задачи
function openAddTaskModal() {
    modal.style.display = 'block';
    modalTitle.textContent = 'Add New Task';
    addTaskForm.style.display = 'block';
    modalContentList.innerHTML = '';
}

// Обработчик формы добавления задачи
addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const category = taskCategoryInput.value;
    const content = taskContentInput.value;

    if (content.trim()) {
        tasks[category].push(content);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        alert('Task added successfully!');
        modal.style.display = 'none';
        taskContentInput.value = '';
    }
});

// Закрытие модального окна
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Добавление обработчиков для открытия модального окна с задачами
document.getElementById('schedule').addEventListener('click', () => openModal('schedule'));
document.getElementById('homework').addEventListener('click', () => openModal('homework'));
document.getElementById('grades').addEventListener('click', () => openModal('grades'));
document.getElementById('plans').addEventListener('click', () => openModal('plans'));

// Добавление обработчика для кнопки добавления задач
document.getElementById('add-task-btn').addEventListener('click', openAddTaskModal);
