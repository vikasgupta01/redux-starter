// Redux Tutorial by Mosh
// Course URL : https://www.youtube.com/watch?v=poQXNp9ItL4

import { immerable } from "immer";
import { indexOf, wrap } from "lodash";
import { compose, pipe } from "lodash/fp";

let input = "       JavaScript      ";
let output1 = "<div>" + input.trim() + "</div>";

const trim = str => str.trim();
const toLowerCase = str => str.toLowerCase();
const wrapInDiv = str => `<div>${str}</div>`;
// now let's say we needed to create another function that wraps 'span' around 

const str = "Sample String";
const result = wrapInDiv(toLowerCase(trim(str)));

// to avoid such function nesting and parentheses, we can use compose, and feed the functions in order from right to left, 
// or use pipe function in the opposite order.
const transform1 = compose(wrapInDiv, toLowerCase, trim);
const transform2 = pipe(trim, toLowerCase, wrapInDiv);
let output2 = transform1(input);
let output3 = transform2(input);

// all three of output1, output2 and output3 will give same result.



// applying the currying tecnique in function taking two params. 
const wrap1 = (type, str) => `<${type}>${str}</${type}>`;
// this can be written as
const wrap2 = type => str => `<${type}>${str}</${type}>$`;
// with this new implementation in wrap2, we can replace div with any other passed element, and get a function.
const transform3 = pipe(trim, toLowerCase, wrap2("div"));


// ----------------------------------------- Practicing Immutability while Updating an object -----------------------------------------
// 41:30

// Method 1 : Re-assign the object to a new object, and pass the parameters need to be added/updated. 
// Other params remain unchanged.
const person1 = { firstName: "John", age: 30};
const updated1 = Object.assign({}, person1, {firstName: "Jane", lastName: "Doe"});
// console.log(updated1);


// But there is a better way to do that : Using Spread Operator
const person2 = { firstName: "Bilbo", lastName: "Baggins"};
const updated2 = { ...person2, firstName: "Frodo", age: 33};
// console.log(updated2);

// Now this spread operator does shallow copy of objects, i.e. the objects inside the copied object refer to same old object
// instead of creating new one. In order to overcome this, we have two options. 
    // 1. either create copy of all the inner objects as well using spread operator (deep copy). 
    // 2. Or use libraries available to handle such scenarios.

// example
const character1 = { name: "Aragorn", species: "Men", details: {
    weapon: "Anduril",
    firstAppearance: "The Fellowship of the ring",
    lastAppearance: "Unfinished Tales"    
} };

    // shallow copy case and issue faced
const character2 = { ...character1, name: "Boromir"};
character2.details.weapon = "Barrow-Blades";
// console.log(character1);
// console.log(character1);
character2.details.weapon = "Anduril";
// console.log(character1);
// console.log(character2);

    // changing weapon for character 2 also changes it for character1.
    // to solve this problem, we have to do a deep copy.

// deep copy
const character3 = { ...character1, name: "Boromir", details: {
    ...character1.details,
    weapon: "Barrow-Blades",
    home: "Gondor"
}};
// now as you can see, this approach is a bit verbose. The more nesting we have, the more verbose it is gonna be.
// this is why we have libraries specifically made for immutability.
console.log(character1);
console.log(character3);



// ----------------------------------------- Practicing Immutability while Updating an Array -----------------------------------------
// 46:10

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(numbers);

// Adding
const index = numbers.indexOf(4);
const added = [...numbers.slice(0, index), 20, ...numbers.slice(index)];
console.log(added);

// Removing
const removed = numbers.filter(n => n !== 7);
console.log(removed);

// updating
const updated = numbers.map(n => n === 3 ? 30 : n);
console.log(updated);
// if we had an array of objects here, we'll have to copy some object at the position of 30 in the line above.
// And we can use spread operator to create a full copy of that object.


// ----------------------------------------- Enforcing Immutability -----------------------------------------
// JS does not prevent object mutations because it's not a pure functional programming language.
// to work around this, we have to use libraries that offer real immutable data structures.
// The popular ones among tons of options are 1. Immutable, 2. Immer, 3. Mori

// These use Structural Sharing using tries to prevent copying everything, and creating huge computational and memory overhead.


// ------------------------- Mori -------------------------
// A library for using clojureScript persistent data structures and supporting API from the comfort of JavaScript.
// var mori = require("mori");

// ------ vector/array implementation
// var a = mori.vector(1, 2);  // [1 2]
// var a2 = mori.vector(a, 3); // [1 2 3]
// mori.count(a);              // 2
// mori.get(a2, 2);            // 3

// ------ hashmap implementation
// o = mori.hashMap("a", 1, "b", 2);    // { "a": 1, "b": 2 }
// o1 = mori.assoc(o, "a", 3);          // { "a": 3, "b": 2 }
// mori.get(o, "a");                    // 1
// mori.get(o1, "a");                   // 3


// ------------------------- Immutable.js -------------------------
// var Imjs = require("immutable");

// ------ vector/array implementation
// var b = Imjs.List.of(1, 2);      // [1 2]
// var b1 = b.push(3);              // [1 2 3]
// b.size;                          // 2
// b1.get(2);                       // 3

// ------ hashmap implementation
// var p = Imjs.Map({"a": 1, "b": 2});      // { "a": 1, "b": 2 }
// var p1 = p.set("a", 3);                  // { "a": 3, "b": 2 }
// p.get("a");                              // 1
// p1.get("a");                             // 3

// ------------------------- Mori vs Immutable.js -------------------------
// Mori
    // ClojureScript port
    // Functional API
    // Faster

// Immutable.js
    // JS through & through and hence OOPs
    // Object Oriented API
    // A bit smaller




// ------------------------- Immer -------------------------
import { produce } from 'immer';
let book = { title: "Harry Potter" };
function publish(book) {
    return produce(book, draftBook => {
        draftBook.isPublished = true;
    });
}

let updatedBook = publish(book);
console.log(book);
console.log(updatedBook);