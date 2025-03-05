# Appeals System

Это система для работы с обращениями, реализованная на Node.js, Express, TypeORM и PostgreSQL.

## Функциональность

- Создание обращений
- Взятие обращения в работу
- Завершение обработки обращения с указанием решения
- Отмена обращения с указанием причины
- Получение списка обращений с фильтрацией по дате или диапазону дат
- Массовая отмена обращений, находящихся в статусе "В работе"

## Структура проекта

```
appeals-system/
├── src/
│   ├── app.ts                  # Конфигурация Express приложения
│   ├── config/
│   │   └── swagger.ts          # Swagger документация
│   ├── data-source.ts          # Настройка подключения к БД (TypeORM DataSource)
│   ├── entity/
│   │   └── Appeal.entity.ts    # Entity для обращения
│   ├── enums/
│   │   └── AppealStatus.enum.ts  # Перечисление статусов обращения
│   ├── index.ts                # Точка входа приложения
│   ├── middleware/
│   │   ├── asyncHandler.ts     # Middleware для обработки async функций
│   │   └── errorHandler.ts     # Глобальный обработчик ошибок
│   ├── routes/
│   │   └── appeals.ts          # Маршруты для работы с обращениями
│   └── services/
│       └── AppealService.ts    # Сервис для работы с обращениями
├── tests/
│   └── appeals.test.ts         # Тесты для API
├── .env                        # Переменные окружения
├── .gitignore                  # Исключения Git
├── Dockerfile                  # Сборка контейнера
├── docker-compose.yml          # Настройка Docker
├── package.json               
└── tsconfig.json              
```

## Настройка окружения

Создайте файл `.env` в корне проекта:

```properties
DB_HOST=localhost
DB_PORT=1000
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=appeals
PORT=3000
```

## Запуск проекта

### Локальный запуск

1. Установка зависимостей:

```bash
npm install
```

2. Сборка проекта:

```bash
npm run build
```

3. Запуск приложения:

```bash
npm start
```

Приложение будет доступно по адресу: <http://localhost:3000>  
Swagger документация: <http://localhost:3000/api-docs>

### Режим разработки

```bash
npm run dev
```

### Docker Compose

```bash
docker-compose up --build
```

## Подключение к БД (pgAdmin4)

- Host: `localhost`
- Port: `1000`
- Database: `appeals`
- Username: `postgres`
- Password: `postgres`

## Тестирование

```bash
npm test
```

## Технический стек

- Node.js + Express
- TypeScript
- TypeORM
- PostgreSQL
- Jest + Supertest
- Swagger
- Docker

## Особенности реализации

- REST API с документацией Swagger
- Архитектура с разделением на слои (routes, services, entities)
- Глобальная обработка ошибок
- Асинхронные операции с БД
- Контейнеризация приложения и БД
- Модульное тестирование
