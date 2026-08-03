import { comments } from "./comments.js";

// 2. Создать массив чисел от 1 до 10. Отфильтровать его таким образом, чтобы мы получили массив чисел, начиная с 5.
const numbers = [1,2,3,4,5,6,7,8,9,10];
const filteringFromFive = numbers.filter(number => number >= 5 );

console.log(filteringFromFive);

// 3. Создать массив строк, относящихся к любой сущности (названия фильмов/книг, кухонные принадлежности, мебель и т. д.), и проверить, есть ли в массиве какая-то конкретная сущность.
const materials = ['грунтовка','штукатурка','саморез','дюбель','шпатель'];
const tools = materials.includes('шпатель');

console.log(tools);

// 4. Написать функцию, которая аргументом будет принимать массив и изменять его порядок на противоположный ("переворачивать") . Два вышеуказанных массива с помощью этой функции перевернуть.
function reverseArray(array) {
  return array.reverse()
};

console.log(reverseArray(numbers));
console.log(reverseArray(materials));

// 7. Вывести в консоль массив тех комментариев, почта пользователей которых содержит ".com"
const commentsWithCom = comments.filter(comment => comment.email.includes('.com'));

console.log(commentsWithCom);

// 8. Перебрать массив таким образом, что бы пользователи с id меньше или равно 5 имели postId: 2, а те, у кого id больше 5, имели postId: 1
const updatedComments = comments.map(comment => {
  return {
    ...comment,
    postId: comment.id <= 5 ? 2 : 1
  };
});

console.log(updatedComments);

// 9. Перебрать массив, что бы объекты состояли только из айди и имени
const simplifiedComments = comments.map(comment => {
  return {
    id: comment.id,
    name: comment.name
  };
});

console.log(simplifiedComments);

// 10. Перебираем массив, добавляем объектам свойство isInvalid и проверяем: если длина тела сообщения (body) больше 180 символов - устанавливаем true, меньше - false.
const validatedComments = comments.map(comment => {
  return {
    ...comment,
    isInvalid: comment.body.length > 180
  };
});

console.log(validatedComments);

// 11. Почитать про метод массива reduce. Используя его, вывести массив почт и провернуть тоже самое с помощью метода map
const emails = comments.reduce((acc, comment) => {
  acc.push(comment.email);
  return acc;
}, []);

console.log(emails);

const emailsWithMap = comments.map(comment => comment.email);

console.log(emailsWithMap);

// 12. Почитать про методы toString(), join() и перебрав массив с задания №11, привести его к строке.
const emailsStringWithToString = emails.toString();
console.log(emailsStringWithToString);
const emailsString = emails.join(', ');
console.log(emailsString);
