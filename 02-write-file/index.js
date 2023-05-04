let fs = require('fs');         //импорт модулей
let path = require('path');

let wrStr = fs.createWriteStream(path.join(__dirname, 'text.txt'));  //созд поток записи
let { stdout, stdin, exit } = require('process');                    //импорт ст мод-ей вывод ввод выход

stdout.write('Напишите что-нибудь:');

stdin.on('data', (text) => {                    //запись
  if (text.toString().trim() === 'exit') {
    exitFrMod();
  }
  wrStr.write(text);
});

process.on('SIGINT', exitFrMod);              //Ctrl + C

function exitFrMod() {                        //вывод и выход
  stdout.write('Удачи в обучении!');
  exit();
}