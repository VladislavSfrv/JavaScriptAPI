let photoArray = ["image/photome1.jpg",
                  "image/photome2.jpg",
                  "image/photome3.jpg",
                  "image/photome4.jpg",];

const btnForwardEl = document.querySelector('.btn-forward');
const btnBackEl = document.querySelector('.btn-back');

btnForwardEl.addEventListener('click', () => {
    if (document.querySelector('.image-me').attributes.src.textContent !== photoArray[photoArray.length - 1]) {
        const photoSrc = document.querySelector('.image-me').attributes.src.textContent;
        for (let i = 0; i < photoArray.length; i++) {
            if (photoSrc === photoArray[i]) {
                document.querySelector('.image-me').setAttribute('src', photoArray[i + 1]);
                document.querySelector('.photo-navigation-color').classList.remove('photo-navigation-color');
                document.getElementById(i + 1).classList.add('photo-navigation-color');
                break;
            }
        }
    }else{
        document.querySelector('.image-me').setAttribute('src', photoArray[0]);
        document.querySelector('.photo-navigation-color').classList.remove('photo-navigation-color');
        document.getElementById(0).classList.add('photo-navigation-color');
    }
})

btnBackEl.addEventListener('click', () => {
    if (document.querySelector('.image-me').attributes.src.textContent !== photoArray[0]) {
        const photoSrc = document.querySelector('.image-me').attributes.src.textContent;
        for (let i = 0; i < photoArray.length; i++) {
            if (photoSrc === photoArray[i]) {
                document.querySelector('.image-me').setAttribute('src', photoArray[i - 1]);
                document.querySelector('.photo-navigation-color').classList.remove('photo-navigation-color');
                document.getElementById(i - 1).classList.add('photo-navigation-color');
                break;
            }
        }
    }else{
        document.querySelector('.photo-navigation-color').classList.remove('photo-navigation-color');
        document.getElementById(photoArray.length - 1).classList.add('photo-navigation-color');
        document.querySelector('.image-me').setAttribute('src', photoArray[photoArray.length - 1]);
    }
})

const navigationLiEl = document.querySelectorAll('.photo-navigation');
const ulEl = document.querySelector('.ul');
for (let i = 0; i < navigationLiEl.length; i++) {
    navigationLiEl[i].setAttribute('id', i);
}

ulEl.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        document.querySelector('.image-me').setAttribute('src', photoArray[e.target.id]);
        document.querySelector('.photo-navigation-color').classList.remove('photo-navigation-color');
        e.target.classList.add('photo-navigation-color')
    }
})