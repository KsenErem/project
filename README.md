Разработка программного обеспечения с графическим интерфейсом для бронирования шкафчиков в бассейне.

Реализовано:
1. Авторизация как посетитель и как администратор: 
метод post, 
url: `${window.apiUrl}/auth/login`, 
данные: логин – номер телефона, пароль, 
обращение к таблице Users по логину для проверки существования пользователя. Если пользователь существует, то возвращается токен, состоящий из id, имени, логина, гендера.
Токен создается с помощью функции SignToken.
2. Регистрация для новых посетителей, новых администраторов предполагается добавлять вручную:
метод post, 
url: `${window.apiUrl}/auth/register`,
данные: имя, логин – номер телефона, пароль, гендер
обращение к таблице Users и создает новую запись
3. Функция CheckToken была создана для того, что пользователь авторизован и чтобы определять гендер авторизованного пользователя и в зависимости от него отрисовывать фронт.
