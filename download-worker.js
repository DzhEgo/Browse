const { workerData, parentPort } = require('worker_threads')
const axios = require('axios')
const url = workerData.url

axios.get(url, { responseType: 'document', onDownloadProgress })
    .then((res) =>{
        const content = res.data

        parentPort.postMessage({ status: 'finished', content })
        console.log('Успешно! Статус кода:', res.status)
    })
    .catch((error) => {
        console.error(`Ошибка в скачивании контента: ${error}`)
    })

function onDownloadProgress(event) {
    parentPort.postMessage({status: 'progress', progress: event.loaded, total: event.total})
}
