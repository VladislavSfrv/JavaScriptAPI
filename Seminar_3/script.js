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
let flag = false;
let page = 1;
const photoObjectEl = document.querySelector('.photo-object');

const accessKey = "9pX2nuMJwg2u9X70p_zvpmlYf1Nsh57MOEaM72GJ1Q8";

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

async function run(){
    const data = await fetchPhotos();
    addPhotoHTML(data);
    flag = false;
}

function addPhotoHTML(data){
    for(const obj of data)photoObjectEl.insertAdjacentHTML("beforeend", 
        `<div class = "photo">
            <img class = "photo-img" src="${obj.urls.full}" alt="${obj.urls_description}">
         </div>`);
}  


window.addEventListener('scroll', () => {
    const percentPage = (window.scrollY / (document.body.clientHeight - window.innerHeight)) * 100;
    if (percentPage > 90 && !flag) {
        flag = true;
        page++;
        run();  
    }
})

run();