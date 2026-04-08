// js/products-data.js
const products = [
    {
        id: 1,
        name: "Холодильник Samsung RB37",
        price: 54990,
        category: "refrigerators",
        image: "https://via.placeholder.com/300x200/27ae60/ffffff?text=Samsung",
        features: ["Объем: 367 л", "No Frost", "Энергопотребление: A+"],
        badge: "sale"
    },
    {
        id: 2,
        name: "Телевизор LG OLED 65\"",
        price: 129990,
        category: "tvs",
        image: "https://via.placeholder.com/300x200/e74c3c/ffffff?text=LG+TV",
        features: ["Диагональ: 65 дюймов", "4K UHD", "OLED технология"],
        badge: "hit"
    },
    {
        id: 3,
        name: "Блендер Philips HR3652",
        price: 8990,
        category: "kitchen-utensils",
        image: "https://via.placeholder.com/300x200/9b59b6/ffffff?text=Blender",
        features: ["Мощность: 1400 Вт", "6 скоростей", "Объем: 2 л"],
        badge: "new"
    },
    {
        id: 4,
        name: "Кухонная мойка Blanco",
        price: 18990,
        category: "sinks",
        image: "https://via.placeholder.com/300x200/f39c12/ffffff?text=Sink",
        features: ["Нержавеющая сталь", "2 чаши", "Антибактериальное покрытие"],
        badge: ""
    },
    {
        id: 5,
        name: "Смеситель Grohe Eurosmart",
        price: 8990,
        category: "faucets",
        image: "https://via.placeholder.com/300x200/34495e/ffffff?text=Faucet",
        features: ["Латунь", "Хром покрытие", "Керамический картридж"],
        badge: ""
    },
    {
        id: 6,
        name: "Фен Dyson Supersonic",
        price: 39990,
        category: "hair-care",
        image: "https://via.placeholder.com/300x200/e91e63/ffffff?text=Hair+Dryer",
        features: ["Мощность: 1600 Вт", "3 скорости", "4 насадки"],
        badge: "premium"
    },
    {
        id: 7,
        name: "Антенна комнатная Selenga",
        price: 1290,
        category: "antennas",
        image: "https://via.placeholder.com/300x200/795548/ffffff?text=Antenna",
        features: ["ДМВ диапазон", "Встроенный усилитель", "30 км"],
        badge: ""
    }
];

const categories = [
    { id: 'all', name: 'Все товары', icon: 'fa-th-large' },
    { id: 'refrigerators', name: 'Холодильники', icon: 'fa-snowflake' },
    { id: 'tvs', name: 'Телевизоры', icon: 'fa-tv' },
    { id: 'kitchen-utensils', name: 'Кухонная утварь', icon: 'fa-blender' },
    { id: 'sinks', name: 'Мойки', icon: 'fa-faucet' },
    { id: 'faucets', name: 'Краны', icon: 'fa-tint' },
    { id: 'hair-care', name: 'Приборы для волос', icon: 'fa-user' },
    { id: 'antennas', name: 'Антенны', icon: 'fa-satellite-dish' }
];