# Invitation Creator Web App

## 📌 Опис
Invitation Creator – це вебдодаток для створення та надсилання персоналізованих запрошень. Додаток дозволяє користувачам швидко створювати цифрові запрошення на різні заходи та надсилати їх гостям.

## 🚀 Функціонал
- 📜 **Створення запрошень** – створення запрошень за допомогою заповнення короткого опитувальника.
- 🎨 **Редагування дизайну** – можливість змінювати інформацію та надсилати запрошення повторно.
- ✉️ **Надсилання запрошень** – відправка запрошень електронною поштою.
- 📊 **Видалення події** – відміна події із повідомленням про це всіх учасників.

## 🛠️ Технології
- **Frontend:** React
- **Backend:** Next.js
- **База даних:** MongoDB
- **Інші:** (?)SendGrid (розсилка email)

# Проект: Вебдодаток для генерації та відправки запрошень

Цей проект - вебдодаток для створення та відправки запрошень, розроблений на **Next.js** із використанням **MongoDB**.

## Встановлення та налаштування

### 1. Встановлення необхідного програмного забезпечення
Перед початком роботи переконайтеся, що у вас встановлені:
- [Node.js (LTS версія)](https://nodejs.org/) (рекомендовано **18.x або вище**)
- [Git](https://git-scm.com/)
- [MongoDB Community Edition](https://www.mongodb.com/try/download/community) або використовуйте [MongoDB Atlas](https://www.mongodb.com/atlas/database)

Перевірте встановлені версії командою:
```sh
node -v
git --version
mongod --version
```

### 2. Клонування репозиторію
```sh
git clone https://github.com/oSobolieva/invitations-nextjsApp.git
cd invitations-nextjsApp
```

### 3. Встановлення Next.js та залежностей
Якщо у вас ще немає Next.js, встановіть його командою:
```sh
npx create-next-app@latest .
```
Далі встановіть всі залежності:
```sh
npm install
```

### 4. Налаштування змінних середовища
Створіть файл `.env` у кореневій папці проєкту та додайте:
```
NEXTAUTH_SECRET = '2b+OTh7vCMTYmzv8X61FVtz6bML80wQ0T6WW/IKDoWU='
NEXTAUTH_URL = 'http://localhost:3000/'
MONGO_URL = 'mongodb+srv://sobolieva364:sobolieva364@learndb.qltkemg.mongodb.net/'
```

### 5. Запуск MongoDB
База Даних завжди активна у MongoDB Atlas.

### 6. Запуск проєкту у режимі розробки
```sh
npm run dev
```
Проєкт буде доступний за адресою: [http://localhost:3000]

## Основні команди

### Запуск у режимі розробки
```sh
npm run dev
```

### Збірка для продакшена
```sh
npm run build
```

### Запуск у продакшен-режимі
```sh
npm start
```




## 🎯 Використання
1. Зареєструйтеся або увійдіть у свій акаунт.
2. Натисніть кнопку "+" в правому нижньому кутку для відкриття форми створення запрошення.
3. Заповніть форму.
4. Надішліть запрошення гостям.
5. При необхідності змінюйте інформацію або відміняйте подію.


# Керівництво з документування коду в проекті
## Загальні принципи
Щоб забезпечити єдиний стиль і зрозумілість коду, в нашому проекті слід дотримуватися наступних принципів документування:
- Використовуйте JSDoc для опису функцій, компонентів та їх параметрів.
- Документація має бути короткою, але інформативною.
- Всі функції, компоненти та змінні, які експортуються, повинні мати опис.
- Дотримуйтеся єдиного стилю коментарів по всьому проекту.

---
## Документування React-компонентів
### Структура JSDoc для компонентів:
```javascript
/**
 * Короткий опис компонента.
 *
 * Додатковий опис про те, що робить компонент.
 *
 * @component
 * @param {Object} props - Вхідні пропси компонента.
 * @returns {JSX.Element} - JSX-елемент компонента.
 */
function MyComponent({ title }) {
    return <h1>{title}</h1>;
}
```

### Основні теги для React-компонентів:
- `@component` - позначає, що це React-компонент.
- `@param {type} name - опис` - описує пропси компонента.
- `@returns {JSX.Element}` - вказує, що функція повертає JSX.

---
## Документування функцій
### Структура JSDoc для функцій:
```javascript
/**
 * Описує, що робить функція.
 *
 * @param {string} text - Текстове значення.
 * @param {number} count - Числовий параметр.
 * @returns {string} - Повертає відформатований рядок.
 */
function formatText(text, count) {
    return `${text} (${count})`;
}
```

### Основні теги для функцій:
- `@param {type} name - опис` - описує параметри функції.
- `@returns {type}` - описує, що повертає функція.
- `@async` - позначає асинхронні функції.

---
## Документування API-запитів
### Приклад JSDoc для функції, яка взаємодіє з API:
```javascript
/**
 * Отримує список користувачів з API.
 *
 * @async
 * @function fetchUsers
 * @returns {Promise<Array<Object>>} - Масив користувачів.
 */
async function fetchUsers() {
    const response = await fetch('/api/users');
    return response.json();
}
```

---
## Додаткові рекомендації
- Використовуйте прості речення для опису функціоналу.
- Уникайте зайвих коментарів, якщо код і так очевидний.
- Оновлюйте документацію при зміні логіки функцій або компонентів.
- Дотримуйтеся узгодженості у стилі написання.


## 📝 Ліцензія
Проєкт розповсюджується під ліцензією MIT. Детальніше див. у файлі [LICENSE](LICENSE).

## 👥 Контакти
- 📧 Email: sasha_364@ukr.net
- 🌐 Вебсайт: --
- 🐙 GitHub: https://github.com/oSobolieva


