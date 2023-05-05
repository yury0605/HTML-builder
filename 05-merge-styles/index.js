let fs = require('fs');
let path = require('path');  //импорт модулей

let allCss = path.join(__dirname, 'styles');
let newBundle = path.join(__dirname, 'project-dist', 'bundle.css');  //пути к файлам

fs.readdir(allCss, 'utf-8', function (error, files) {  //считываем файлы
    if (error) {throw error;}
    fs.writeFile(newBundle, '', function (error) {     //создаем файл
    if (error) {throw error;}});

  files.forEach(function (file) {
    if (path.parse(path.join(allCss, file)).ext === '.css') {      //выбираем css
      let stream = fs.createReadStream(path.join(allCss, file));
      stream.on('data', function(data) {
        fs.appendFile(newBundle, data, function(error) {           //записываем поток в конец
          if (error) {throw error;}});});}});});