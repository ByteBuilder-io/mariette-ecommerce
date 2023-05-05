export const styleSlider = `
    .swiper-pagination-bullet {
        opacity: 0.5;
        background-color: #fff;
    }

    .swiper-pagination-bullet-active {
        background-color: #997d6c;
        opacity: 1;
    }

    .swiper-button-prev,
    .swiper-button-next {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 40px;
        height: 40px;
        background-color: #fff;
        opacity: 0.5;
        border-radius: 50%;
        z-index: 10;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s ease;
        font-weight: 900;
    }

    :root {
        --swiper-theme-color: #997d6c;
    }

    :root {
        --swiper-navigation-size: 25px;
    }
`;
