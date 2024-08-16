// //Задание 1

// const selectEl = document.getElementById('item-select');

// let tempValueEl = document.querySelector('.unactive');
// selectEl.addEventListener('click', (e) => {
//     if (e.target.value !== 'main-select') {
//         tempValueEl.classList.add('unactive');
//         document.querySelector(`.${e.target.value}`).classList.remove('unactive');
//         tempValueEl = document.querySelector(`.${e.target.value}`);
//     }
// })

// Задание 2
// let flag = false;
// let page = 1;
// const photoObjectEl = document.querySelector('.photo-object');

// const accessKey = "9pX2nuMJwg2u9X70p_zvpmlYf1Nsh57MOEaM72GJ1Q8";

// const fetchPhotos = async () => {
//     const responce = await fetch(
//         `https://api.unsplash.com/photos/?page=${page}&client_id=${accessKey}`
//     )
//     if (!responce.ok) {
//         throw new Error("Ошибка при загрузке данных");
//     }
//     const data = await responce.json();
//     return data;
// } 

// async function run(){
//     const data = await fetchPhotos();
//     addPhotoHTML(data);
//     flag = false;
// }

// function addPhotoHTML(data){
//     for(const obj of data)photoObjectEl.insertAdjacentHTML("beforeend", 
//         `<div class = "photo">
//             <img class = "photo-img" src="${obj.urls.full}" alt="${obj.urls_description}">
//          </div>`);
// }  


// window.addEventListener('scroll', () => {
//     const percentPage = (window.scrollY / (document.body.clientHeight - window.innerHeight)) * 100;
//     if (percentPage > 90 && !flag) {
//         flag = true;
//         page++;
//         run();  
//     }
// })

// run();

const accessKey = "9pX2nuMJwg2u9X70p_zvpmlYf1Nsh57MOEaM72GJ1Q8";
const photoContentEl = document.querySelector('.photo-content');
const mainPhotoEl = document.querySelector('.main-photo');
const aboutAuthorEl = document.querySelector('.about-author');
let page = getRandomArbitrary(1, 11);
let numberImage = getRandomArbitrary(0, 10);

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
// Создание массива json фото
const fetchPhotos = async () => {
    const responce = await fetch(
        `https://api.unsplash.com/photos/?page=${page}&client_id=${accessKey}`
    )
    if (!responce.ok) {
        throw new Error("Ошибка при загрузке данных");
    }
    const data = await responce.json();
    return data;
} 

//Добавление фото на страницу 
function addElemenHTML(data, numberImage) {
    mainPhotoEl.insertAdjacentHTML('afterbegin', 
        `<img class="img" src="${data[numberImage].urls.full}" alt = ${data[numberImage].alt_description}>`);
    document.querySelector('.author-name').insertAdjacentHTML('beforeend', 
        `<span class="span-author-name">
             <h3>Author's name:</h3> ${data[numberImage].user.first_name}.
        </span>
        `);
    document.querySelector('.div-likes-button').insertAdjacentHTML('beforeend',
        `<span class="span-likes">
            ${data[numberImage].likes}
         </span>
        `);
}

async function run() {
    try {
        const data = await fetchPhotos(); 
        addElemenHTML(data, numberImage);
    } catch (error) {
        console.log("Не удалось загрузить фото");
    }
}

document.querySelector('.like-button').addEventListener('click', (e) => {
    e.currentTarget.classList.toggle('liked');
    if (document.querySelector('.like-activ') === null) {
        document.querySelector('.like-button').classList.add('like-activ');
        document.querySelector('.span-likes').textContent++;
    }else{
        document.querySelector('.like-button').classList.remove('like-activ');
        document.querySelector('.span-likes').textContent--;
    }
});

document.querySelector('.forward').addEventListener('click', () => {
    if (numberImage < 9) {
        try {
            document.querySelector('.img').remove();
            document.querySelector('.span-author-name').remove();
            document.querySelector('.span-likes').remove();
            numberImage++;
        } catch (error) {
            console.log('Упс')
        }
        run();
    } else {
        try {
            document.querySelector('.img').remove();
            document.querySelector('.span-author-name').remove();
            document.querySelector('.span-likes').remove();
            numberImage++;
        } catch (error) {
            console.log('Упс')
        }
        run();
        numberImage = 1;
        page++;
    }
    if (document.querySelector('.like-activ') !== null) {
        document.querySelector('.like-button').classList.remove('like-activ');
    }
})

document.querySelector('.back').addEventListener('click', () => {
    if (numberImage > 1) {
        try {
            document.querySelector('.img').remove();
            document.querySelector('.span-author-name').remove();
            document.querySelector('.span-likes').remove();
            numberImage--;
        } catch (error) {
            console.log('Упс')
        }
        run();
    } else if (page > 1) {
        try {
            document.querySelector('.img').remove();
            document.querySelector('.span-author-name').remove();
            document.querySelector('.span-likes').remove();
            numberImage++;
        } catch (error) {
            console.log('Упс')
        }
        run();
        console.log(`numberImage = ${numberImage}`);
        console.log(`page = ${[page]}`);
    } else{
        alert("Нажми кнопку 'Следующее фото'");
    }
    if (document.querySelector('.like-activ') !== null) {
        document.querySelector('.like-button').classList.remove('like-activ');
    }
})

run();