let fs = require('fs/promises');                //объект промис асинхр
let path = require('path');


let folder = path.join(__dirname, 'files');        //пути к папкам
let folderCopy = path.join(__dirname, 'files-copy');

fs.rm(folderCopy, {                                //удаляем копию папки
    recursive: true,
    force: true

}).finally(function() {                         //создаем папку
    fs.mkdir(folderCopy, {
        recursive: true});
    fs.readdir(folder, {                           //получаем список файлов
        withFileTypes: true                     //с инфой
    }).then(function(data) {
        data.forEach(function(item) {
            if (item.isFile()) {                                          //если файл
                let pathFolder = path.join(folder, item.name);           //формируем пути к файлу и копии
                let pathFolderCopy = path.join(folderCopy, item.name);
                fs.copyFile(pathFolder, pathFolderCopy);} }); }); });    //копируем из ориг в копию
        
    
