let fs = require('fs');
let path = require('path');                         //пути
let pathCSS = path.join(__dirname, 'styles');
let folderPath = path.join(__dirname, 'components');
let pathAssets = path.join(__dirname, 'assets');
let pathCopyFolder = path.join(__dirname, 'project-dist');
let pathAssetsCopy = path.join(pathCopyFolder, 'assets');


fs.readdir(pathCSS, {withFileTypes: true}, async (error, files) => {
  if (error) {
    console.log(error);}
  else {files.forEach(function(file, index) {
      let filePath = path.join(pathCSS, file.name);
      if (file.isFile() && file.name.split('.')[1] === 'css') {   //считываются все файлы css
        fs.readFile(filePath, 'utf8', function (error, data) {
          if(error) {console.log(error);
          } else if (index === 0) {
            fs.writeFile(path.join(pathCopyFolder, 'style.css'), data, function (error) {   //создается новый css
              if(error) console.log(error);});
          }  else {
            fs.appendFile(path.join(pathCopyFolder, 'style.css'), data, function(error) {   //записывается содержимое
              if(error) console.log(error);});}});}});}});

function copyAssets(dir, exit) {                                 //копируем assets
  fs.readdir(dir, {withFileTypes: true}, function (error, files) {
    if (error) throw error;
    files.forEach(function(file) {
      if (!file.isFile()) {
        fs.stat(path.join(exit, file.name), function(error) {       //проверка файл или папка
          if (error) {
            fs.mkdir(path.join(exit, file.name), function(error) {
              if (error) {
                return console.erroror(error);}});
            copyAssets(`${dir}\\${file.name}`, path.join(exit, file.name));  //на папку рекурсивно вызываем функцию
          } else {
            copyAssets(`${dir}\\${file.name}`, path.join(exit, file.name));
          }
        });
      } else {
        fs.copyFile(`${dir}\\${file.name}`, `${exit}\\${file.name}`, function(error){   //файл копируем
          if (error) throw error;});}});});}

fs.stat (pathCopyFolder, function (error) {     //проверка сущ ли файлы и папки
  if (error) {
    fs.mkdir(pathCopyFolder, function (error) { //создание если нет
      if (error) {
        return console.erroror(error);}});
    newHTML();                     //создание html и замена тегов
  } else {  fs.readdir(pathCopyFolder, function (error)  {
    if (error) console.log(error);
    else {newHTML();}});}});

fs.stat (pathAssetsCopy, function (error) {
  if (error) {
    fs.mkdir(pathAssetsCopy, function(error) {
      if (error) {
        return console.erroror(error);}});
    copyAssets(pathAssets, pathAssetsCopy);
  } else {
    copyAssets(pathAssets, pathAssetsCopy);}});

function newHTML() {                                                               //создание html и замена тегов
  fs.copyFile(`${__dirname}\\template.html`, `${pathCopyFolder}\\index.html`, function (error) {
    if (error) throw error;
    fs.readFile(`${pathCopyFolder}\\index.html`, 'utf8', function(error, data) {
      if(error) throw error;
      fs.readdir(folderPath, {withFileTypes: true}, function (error, files) {
        if (error) throw error;
        files.forEach(function(file) {
          fs.readFile(`${folderPath}\\${file.name}`, 'utf8', function(error, dataFile) {
            if(error) throw error;
            let tagName = `{{${file.name.split('.')[0]}}}`;
            data = data.replace(tagName, dataFile);
            fs.writeFile(`${pathCopyFolder}\\index.html`, data, function (error) {
              if(error) console.log(error);});});});});});});}