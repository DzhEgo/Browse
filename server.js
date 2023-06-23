const express = require("express")
const WebSocket = require("ws")
const { Worker } = require("worker_threads")
const app = express()
const wss = new WebSocket.Server({ noServer: true })

const keywordMap = {
	python: ["https://www.python.org/", "https://ru.wikipedia.org/wiki/Python", "https://pythonworld.ru/samouchitel-python"],
	php: ["https://www.php.net/", "https://ru.wikipedia.org/wiki/PHP", "https://habr.com/ru/hub/php/"],
	go: ["https://go.dev/", "https://ru.wikipedia.org/wiki/Go", "https://blog.skillfactory.ru/glossary/golang/"],
	kotlin: ["https://kotlinlang.org/", "https://ru.wikipedia.org/wiki/Kotlin", "https://skillbox.ru/media/code/yazyk-programmirovaniya-kotlin/"],
}

wss.on("connection", (ws) =>{
	ws.on("message", (message) =>{
		const data = JSON.parse(message)
		const keyword = String(data.keyword).trim().toLowerCase()
		const urls = keywordMap[keyword]

		if (urls){
			ws.send(JSON.stringify(urls))
		} else if (data.action === "download"){
			const url = data.url;
			const threads = data.threads || 1

			for (let i = 0; i < threads; i++) {
				const worker = new Worker("./download-worker.js", {
					workerData: { url }
				})

				worker.on("message", (message) =>{
					ws.send(JSON.stringify(message))
				})

				worker.on("error", (error) =>{
					console.error(`Worker error: ${error}`)
				})
			}
		}
	})
})

app.get('/', (req, res) =>{
	res.sendFile(__dirname + '/index.html')
})

const server = app.listen(3000, () =>{
	console.log("Началось прослушивание сервера на 3000 порту...")
})

server.on("upgrade", (req, socket, head) => {
	wss.handleUpgrade(req, socket, head, (ws) => {
		wss.emit("connection", ws, req)
	})
})
