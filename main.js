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