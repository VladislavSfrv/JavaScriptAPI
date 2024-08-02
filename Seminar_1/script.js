// JSON объект

const articleData = [
    {
        title: "Занятие 1",
        time: "Время проведения занятия 1",
        maxPeople: 5,
        tempPeople: 3,
        id: 0
    },
    {
        title: "Занятие 2",
        time: "Время проведения занятия 2",
        maxPeople: 10,
        tempPeople: 4,
        id: 1
    },
    {
        title: "Занятие 3",
        time: "Время проведения занятия 3",
        maxPeople: 6,
        tempPeople: 1,
        id: 2
    }
];

//Добавляем JSON расписания занятий на страницу

// Функция по созданию DOM элементов
let uniqueID = 0;
function createArticle(title, time, maxPeople, tempPeople) {
    const articleItem = document.createElement('li');
    articleItem.classList.add("article-li");

    const articleTitle = document.createElement('h2');
    articleTitle.textContent = title;
    articleTitle.classList.add('articke-title');

    const articleTime = document.createElement('p');
    articleTime.textContent = time;
    articleTime.classList.add('article-time');

    const articlePeople = document.createElement('p');
    articlePeople.textContent = `Количество записей на занятие - ${tempPeople} / ${maxPeople}`;
    articlePeople.classList.add(`article-people-${uniqueID}`);

    const articleButtonUp = document.createElement('button');
    articleButtonUp.textContent = "Записаться на занятие";
    articleButtonUp.classList.add('article-button');
    articleButtonUp.setAttribute('id', uniqueID);

    const articleButtonRemove = document.createElement('button');
    articleButtonRemove.textContent = "Удалить запись";
    articleButtonRemove.classList.add('article-button');
    articleButtonUp.classList.add(`btn-remove-${uniqueID}`);
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
                    const elementID = element.id;
                    if (articleData[elementID].tempPeople < articleData[elementID].maxPeople) {
                        articleData[elementID].tempPeople++;
                        document.querySelector(`.article-people-${elementID}`).textContent = `Количество записей на занятие - ${articleData[elementID].tempPeople} / ${articleData[elementID].maxPeople}`;
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
                    const elementID = element.id;
                    if (articleData[elementID].tempPeople !== 0 ) {
                        articleData[elementID].tempPeople--;
                        document.querySelector(`.article-people-${elementID}`).textContent = `Количество записей на занятие - ${articleData[elementID].tempPeople} / ${articleData[elementID].maxPeople}`;
                        document.getElementById(buttonID).disabled = false;
                    }else{
                        document.querySelector(`.btn-remove-${buttonID}`).disabled = true;
                    }
                }
            });
        }
    }
})