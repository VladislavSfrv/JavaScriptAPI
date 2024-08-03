// JSON объект

const articleData = [
    {
        title: "JavaScript",
        time: "10:10",
        maxPeople: 5,
        tempPeople: 3,
        id: 0
    },
    {
        title: "NodeJS",
        time: "15:30",
        maxPeople: 10,
        tempPeople: 4,
        id: 1
    },
    {
        title: "JavaScript API браузеров",
        time: "19:00",
        maxPeople: 6,
        tempPeople: 1,
        id: 2
    },
    {
        title: "Математика",
        time: "15:10",
        maxPeople: 15,
        tempPeople: 10,
        id: 3
    }
];

//Добавляем JSON расписания занятий на страницу

// Функция по созданию DOM элементов
let uniqueID = 0;
function createArticle(title, time, maxPeople, tempPeople) {
    const articleItem = document.createElement('li');
    articleItem.classList.add("article-li", "bg-info-subtle","text-center", "row", "border", "border-info", "border-3");


    const articleTitle = document.createElement('h2');
    articleTitle.textContent = title;
    articleTitle.classList.add('articke-title');

    const articleTime = document.createElement('p');
    articleTime.textContent = time;
    articleTime.classList.add('article-time', 'fs-2');

    const articlePeople = document.createElement('p');
    articlePeople.textContent = `Количество записей на занятие - ${tempPeople} / ${maxPeople}`;
    articlePeople.classList.add(`article-people-${uniqueID}`, 'fs-3', 'text-decoration-underline');

    const articleButtonUp = document.createElement('button');
    articleButtonUp.textContent = "Записаться на занятие";
    articleButtonUp.classList.add('btn', 'btn-success', 'btn-lg');
    articleButtonUp.setAttribute('id', uniqueID);

    const articleButtonRemove = document.createElement('button');
    articleButtonRemove.textContent = "Удалить запись";
    articleButtonRemove.classList.add('btn', `btn-remove-${uniqueID}`, 'btn-danger');
    articleButtonRemove.setAttribute('id', uniqueID);
    uniqueID++;


    articleItem.append(articleTitle);
    articleItem.append(articleTime);
    articleItem.append(articlePeople);
    articleItem.append(articleButtonUp);
    articleItem.append(articleButtonRemove);

    return articleItem;
}

// Передача обьекта в функцию и добавление на страничку 
articleData.forEach(element => {
    const articleItem = createArticle(element.title, element.time, element.maxPeople, element.tempPeople);
    articleList.append(articleItem);
});

// Добавление обработчика событий на кнопку, для записи и удаления записи на занятие

articleList.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        if(e.target.textContent === 'Записаться на занятие'){
            const buttonID = Number(e.target.id);
            articleData.forEach(element => {
                if (element.id === buttonID) {
                    if (articleData[element.id].tempPeople < articleData[element.id].maxPeople) {
                        articleData[element.id].tempPeople++;
                        document.querySelector(`.article-people-${element.id}`).textContent = `Количество записей на занятие - ${articleData[element.id].tempPeople} / ${articleData[element.id].maxPeople}`;
                        document.querySelector(`.btn-remove-${buttonID}`).disabled = false;
                    }else{
                        alert('Свободных мест для записи нет!');
                        document.getElementById(buttonID).disabled = true; 
                    }
                }
            });
        }else{
            const buttonID = Number(e.target.id);
            articleData.forEach(element => {
                if (element.id === buttonID) {
                    if (articleData[element.id].tempPeople !== 0 ) {
                        articleData[element.id].tempPeople--;
                        document.querySelector(`.article-people-${element.id}`).textContent = `Количество записей на занятие - ${articleData[element.id].tempPeople} / ${articleData[element.id].maxPeople}`;
                        document.getElementById(buttonID).disabled = false;
                    }else{
                        document.querySelector(`.btn-remove-${buttonID}`).disabled = true;
                    }
                }
            });
        }
    }
})