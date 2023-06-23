Сайт доступен на http://37.46.129.121:3000
===========

Сайт реализован благодаря:
---------
Http клиенту и WebSocket Серверу.

Алгоритм:
---------
На сервере хранится список ключевых слов, которым соответствует несколько URL.
Клиент посылает ключевое слово на сервер.
Сервер передаёт клиенту список URL.
Клиент выбирает один URL из списка и через сервер в многопоточном режиме скачивает контент.
Клиент сохраняет контент в LocalStorage с возможностью чтения оффлайн.

Сервер должен:
--------------
Хранить соответствие ключевых слов с URLами.
При скачивании контента передавать статус загрузки: размер, кол-во запущенных потоков, прогресс загрузки.
Кол-во потоков и скорость на поток должно быть ограничено посредством конфига.

Клиент должен:
--------------
Иметь поле для ввода ключевого слова.
Иметь возможность показа списка URL с возможностью выбора пользователем нужного.
Показывать статус загрузки: размер, кол-во запущенных потоков, прогресс загрузки.
Иметь возможность показа списка загруженного контента с возможностью выбора пользователем нужного.
Показать выбранный загруженный контент.

Для выполнения использовал:
-----------
Node.js,
Express,
Axios,
ws,
worker_threads

Установка:
--------------
Для установки необходимых пакетов, перейдите в корневую папку проекта и в терминале пропишите команду: npm i

Ключевые слова и ссылки:
-----------
	python: "https://www.python.org/", "https://ru.wikipedia.org/wiki/Python", "https://pythonworld.ru/samouchitel-python";
	php: "https://www.php.net/", "https://ru.wikipedia.org/wiki/PHP", "https://habr.com/ru/hub/php/";
	go: "https://go.dev/", "https://ru.wikipedia.org/wiki/Go", "https://blog.skillfactory.ru/glossary/golang/";
	kotlin: "https://kotlinlang.org/", "https://ru.wikipedia.org/wiki/Kotlin", "https://skillbox.ru/media/code/yazyk-programmirovaniya-kotlin/";


