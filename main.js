import { Fancybox } from "@fancyapps/ui";
import Swiper from 'swiper/bundle';
import { Mask, MaskInput } from "maska"

import './sass/_app.scss';
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import 'swiper/css/bundle';

Fancybox.bind("[data-fancybox]", {})

new MaskInput("[data-maska]") // for masked input

if(document.querySelectorAll('.scheme__item')) {
    const schemeItems = document.querySelectorAll('.scheme__item')

    schemeItems.forEach(item => {
        const images = [...item.querySelectorAll('.scheme__images_item')];
        const maxVisible = 5;

        if (images.length > maxVisible) {
            const hiddenCount = images.length - maxVisible;
            images.forEach((el, index) => {
                if (index >= maxVisible) {
                    el.style.display = 'none';
                }
            });

            const lastVisible = images[maxVisible - 1];
            lastVisible.classList.add('scheme__images_item--more');

            const overlay = document.createElement('div');
            overlay.className = 'scheme__images_more';
            overlay.textContent = `+${hiddenCount} фото`;
            lastVisible.appendChild(overlay);
        }
    })
}

ymaps.ready(init);

function init() {
    const maps = [];
    const mapContainers = ['map1', 'map2', 'map3', 'map4'];
    
    // Путь к вашей иконке (замените на свой)
    const iconPath = './public/scheme/mapico.svg';
    
    // Координаты для каждой карты (по одному адресу на карту)
    const addresses = [
        [55.758215, 37.768453], // Москва, Красная площадь
        [55.758215, 37.768453], // СПб, Эрмитаж
        [55.758215, 37.768453], // Казань, Кремль
    ];
    
    mapContainers.forEach((containerId, index) => {
        const map = new ymaps.Map(containerId, {
            center: addresses[index], // центр карты = адрес метки
            zoom: 12 // увеличенный zoom для точного отображения адреса
        });
        
        maps.push(map);
        
        // Добавляем ОДНУ метку с кастомной иконкой
        addSingleMarkerToMap(map, addresses[index], iconPath, `Адрес ${index + 1}`);
    });
}

function addSingleMarkerToMap(map, coordinates, iconPath, title) {
    // Создаем ОДНУ метку с кастомной иконкой
    const placemark = new ymaps.Placemark(coordinates, {
        balloonContent: title,
        hintContent: title
    }, {
        // Настройки иконки
        iconLayout: 'default#image',
        iconImageHref: iconPath, // путь к вашей иконке
        iconImageSize: [40, 40], // размер иконки
        iconImageOffset: [-20, -20] // смещение (центрирование)
    });
    
    map.geoObjects.add(placemark);
}

//toggle catalog
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('show-catalog')?.addEventListener('click', () => {
        const jalousie = document.querySelector('.jalousie');
        if (window.innerWidth > 992) {
            jalousie?.classList.toggle('active');
        } else {
            jalousie?.classList.remove('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('show-catalog')?.addEventListener('click', () => {
        const basket = document.querySelector('.basket');
        const cross = document.querySelector('.cross');
        const body = document.body;
        document.querySelector('.header__discount-dropdown').classList.remove('active');

        document.getElementById('show-catalog').classList.toggle('is_active');
    
   
        document.querySelector('.burger-menu').classList.remove('active');
        document.querySelector('.header__burger').classList.remove('is-active');
        document.querySelector('.catalog-menu').classList.toggle('active');

        body.classList.toggle('locked');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const firstListItem = document.querySelector('.catalog-menu__list_item');
    const firstInnerItem = document.querySelector('.catalog-menu__inner_item');
    if (firstListItem) firstListItem.classList.add('active');
    if (firstInnerItem) firstInnerItem.classList.add('active');

    document.addEventListener('click', (e) => {
        const listItem = e.target.closest('.catalog-menu__list_item');
        if (listItem) {
            if (window.innerWidth < 992) {
                listItem.classList.toggle('opened');
                const subMenu = listItem.querySelector('.catalog-sub-menu');
                if (subMenu) subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';
            } else {
                document.querySelectorAll('.catalog-menu__list_item').forEach(item => item.classList.remove('active'));
                document.querySelectorAll('.catalog-menu__inner_item').forEach(item => item.classList.remove('active'));
                listItem.classList.add('active');
                const innerItem = document.querySelector(`.catalog-menu__inner_item[data-tab="${listItem.dataset.tab}"]`);
                if (innerItem) innerItem.classList.add('active');
            }
        }
    });
});

//burger
document.addEventListener('DOMContentLoaded', () => {
    const toggleClass = (elem, cls) => elem.classList.toggle(cls);

    [document.getElementById('mobile-burger'), document.querySelector('.burger-menu__close')].forEach(btn => {
        btn?.addEventListener('click', () => {
            toggleClass(btn, 'is-active');
            toggleClass(document.querySelector('.burger-menu'), 'active');
            toggleClass(document.documentElement, 'lock');
        });
    });

    document.querySelectorAll('.burger-menu__menu_trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            toggleClass(trigger.parentElement, 'is-active');
            const submenu = trigger.nextElementSibling;
            submenu && (submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block');
        });
    });
});

// ---------------------------------header-discount-dropdown--------------------------------
document.addEventListener('DOMContentLoaded', function(){
    const headerDiscount = document.querySelector('.header__discount');
    const headerDiscountDropdown = document.querySelector('.header__discount-dropdown');
    const catalogMenu = document.querySelector('.catalog-menu');
    const headerCatTr = document.querySelector('.header__catalog_trigger');

    headerDiscount.addEventListener('click', () => {
        headerDiscountDropdown.classList.toggle('active');
        catalogMenu.classList.remove('active');
        headerCatTr.classList.remove('is_active');
    })
});
   
//sticky header
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const headerTop = document.querySelector('.header__top');
    const headerBottom = document.querySelector('.header__bottom');
    let headerBottomOffset = null;
    let headerBottomHeight = null;
    
    const handleScroll = () => {
        if (headerBottomOffset === null) {
            headerBottomOffset = headerTop.offsetHeight;
            headerBottomHeight = headerBottom.offsetHeight;
        }
        
        const scrollY = window.scrollY;
        
        if (scrollY >= headerBottomOffset) {
            header.classList.add('header-scrolled');
            headerBottom.classList.add('fixed');
            document.body.style.paddingTop = headerBottomHeight + 'px';
        } else {
            header.classList.remove('header-scrolled');
            headerBottom.classList.remove('fixed');
            document.body.style.paddingTop = '0';
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
});

// ----------------------------popup----------------------------

document.addEventListener('DOMContentLoaded', function(){
    const popup = document.querySelector('.popup')
    const popupShowBtns = document.querySelectorAll('.show-popup')
    const closeFormBtn = document.querySelector('.close-popup')
    const feedbackForm = document.querySelector('#feedback-popup form')
    const feedbackSuccess = document.querySelector('.feedback-success')
    const successBtn = document.querySelector('.success-btn')

    popupShowBtns.forEach(item => {
        item.addEventListener('click', () => {
            popup.classList.add('active')
            document.body.classList.add('no-scroll')
        })
    })

    closeFormBtn.addEventListener('click', () => {
        popup.classList.remove('active')
        document.body.classList.remove('no-scroll')
        // Сбросить состояние попапа при закрытии
        feedbackForm.style.display = 'block'
        feedbackSuccess.style.display = 'none'
    })

    // Обработчик отправки формы
    feedbackForm.addEventListener('submit', (event) => {
        event.preventDefault() // Предотвращаем стандартную отправку формы
        
        // Скрываем форму и показываем блок успеха
        feedbackForm.style.display = 'none'
        feedbackSuccess.style.display = 'block'
    })

    // Обработчик кнопки "Хорошо" в блоке успеха
    successBtn.addEventListener('click', () => {
        popup.classList.remove('active')
        document.body.classList.remove('no-scroll')
        // Сбрасываем состояние для следующего использования
        feedbackForm.style.display = 'block'
        feedbackSuccess.style.display = 'none'
        feedbackForm.reset() // Очищаем форму
    })

    document.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.classList.remove('active')
            document.body.classList.remove('no-scroll')
            // Сбросить состояние попапа при закрытии
            feedbackForm.style.display = 'block'
            feedbackSuccess.style.display = 'none'
        }
    });
});


// ---------------------------has-submenu-accordion----------------------------
document.addEventListener('DOMContentLoaded', function(){
    const hasSubListArrows = document.querySelectorAll('.has-sublist__arrow');


    hasSubListArrows.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');

            if (item.classList.contains('active')) {
                item.style.transform = 'rotate(-90deg)';
            } else {
                item.style.transform = 'rotate(90deg)';
            }

            const submenu = item.closest('.has-sublist').querySelector('.catalog-menu__sublist');

            if (submenu) {
                submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
            }
        })
    })
});