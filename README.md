# TestMiro

## Настройка проекта

- Для работы приложения установите пакеты через команду `npm install` в корневой директороии проекта
- Для запуска серевера выполните команду `npm start`;
- В браузере перейдите по адресу `http://localhost:8888/`

## Пример начала работы с компонентом
```let inputContainerNode = document.querySelector('#emails-input');
 let options = {
     emailList: [
         "sdfds@dfd.df",
         "dsfsdfds@dfd.gf",
         "sdfsdf@dfdf",
         "fdsgfdlfghfg@dfds.df"
     ],

     // подписки на события изменения списка емейлов
     onAddChip: handleAddChip,
     onDeleteChip: handleDeleteChip
 };
let emailsInput = new EmailsInput(inputContainerNode, options);
```
### Где:
- inputContainerNode - это узел DOM, в который необходимо поместить компонент;
- options - входные параметры для компонента.

### API
- `onGetEmails` - возвращает массив с почтовыми ящиками;
- `onSetNewEmailList(emailArray)` - устанавливает новый список почтовых ящиков, заменяя старый;
- `onAddChip` - функция обратного вызова при добавлении почтового ящика. Возвращает 2 аргумента: (chipEmailNode, emailName) - узел почтового ящика в компоненте и название почтового ящика;
- `onDeleteChip` - функция обратного вызова при удалении почтового ящика. Возвращает единственный аргумент: (emailName) - название удалённого почтового ящика; 