// Функции для работы с авторизацией

// Проверка авторизации пользователя
function checkAuth() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// Выход из системы
function logout() {
    localStorage.removeItem('currentUser');
    window.location.reload();
}

// Получение данных пользователя
function getUserData() {
    return JSON.parse(localStorage.getItem('currentUser'));
}