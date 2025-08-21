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