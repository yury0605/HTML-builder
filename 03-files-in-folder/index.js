let fs = require('fs');
let path = require('path');   //импорт модулей


let getInfo = function (file) {
  let fileInfo = [];

  if (file.isFile()) {
    fs.stat(path.resolve(__dirname, 'secret-folder', file.name), function (error, stats) {  //возвр инфа о файле в массив
      if (error) {
        return console.log(error);}
        
      fileInfo.push(file.name.split('.').slice(0, -1).join('.'));                       
      fileInfo.push(path.extname(file.name).slice(1));
      fileInfo.push((Math.round(stats.size/1024)) + 'Kb');
      console.log(fileInfo.join(' - '));});}

};

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, function (error, files) { //нашу папку передаем в ф-ию
  if (error) {
    return console.log(error);}
    
  files.forEach(item => {
    getInfo(item);});
    
});