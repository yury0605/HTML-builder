const { pipeline } = require('stream/promises'); //импорт модуля потоков
const { join } = require('path');                //модуля путей   
const { createReadStream } = require('fs');      //модуля файловой системы

const filePath = join(__dirname, 'text.txt');     //путь к файлу
const streamRead = createReadStream(filePath);   //создание потока. принимает путь, возвращает поток
const streamWrite = process.stdout;              //поток записи в консоль

pipeline(streamRead, streamWrite);              //принимает потоки записи и чтения, из чтения в запись передается