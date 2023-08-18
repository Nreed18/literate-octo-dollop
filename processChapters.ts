const constants = require("./constants");

// console.log(chapters);

// for (const c of constants.chapters) {
//   // console.log(c);
//   console.log(c.name[0]);

// }

// // Convert book to prefix
// function getPrefix(bookInput) {
//   let prefix = "not found"
//   for (const book of constants.books) {
//     for (const name of book.name) {
//       // console.log(name);
//       if (bookInput === name) {
//         prefix = book.prefix;
//         console.log(prefix);
//         return prefix;
//       }
//     }
//   }
//   return prefix;
// }

// console.log(getPrefix("Psalms"));

// Convert book to prefix
// [{name: {value: 'Genesis'}}, {name: {value: 'Exodus'}},]
function makeList() {
  let list = [];
  for (const book of constants.books) {
    for (const name of book.name) {
      list.push({ name: { value: name.toLowerCase() } });
      list.push({ name: { value: name } });

// Change this to synonyms
      console.log(`{ "name": { "value": "${name.toLowerCase()}"}},`);
      console.log(`{ "name": { "value": "${name}"}},`);
    }
  }
  return list;
}

// console.log(makeList());
console.log("[");
makeList();
console.log("]");
