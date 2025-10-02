// ================================
// Hoisting and Scope in JavaScript
// ================================

// Variables are hoisted to the top of their scope based on declarations(not assignment)
// var → hoisted & initialized with undefined immediately.
// let / const → hoisted too, but placed in the Temporal Dead Zone (TDZ) until their declaration line executes. Accessing them before that gives a ReferenceError.

// --------- VAR HOISTING -------------
console.log(a); // undefined, because `a` is hoisted but not initialized yet
var a = 10;
console.log(a); // 10, after assignment

// --------- LET & CONST HOISTING -------------
let b = 20;
console.log(b); // 20, works normally
const c = 30;
console.log(c); // 30, works normally

// Note: accessing let/const before declaration would throw ReferenceError
// e.g. console.log(d); let d = 5; // ReferenceError

// --------- FUNCTION DECLARATION HOISTING -------------
sayHI(); // works even before definition
function sayHI() {
  console.log("hi");
}

// --------- FUNCTION EXPRESSION HOISTING -------------
var sayHello = () => console.log('hello');
sayHello(); // works after assignment
// If you call `sayHello()` before this line, you get:
// TypeError: sayHello is not a function
// because only the variable `sayHello` is hoisted, not the arrow function

// --------- HOISTING INSIDE FUNCTIONS -------------
function test() {
  // Function expression inside function
  sayHello(); // Works because `sayHello` is found in outer/global scope if already defined
  console.log(subject); // undefined, var is hoisted within its function scope
  var subject = 'subject';
}

// Call test
test();

// If we try calling sayHello before its definition in global scope
// sayHello(); // TypeError if above arrow function not yet assigned

// --------- HOW HOISTING WORKS -------------
// 1. During creation phase:
//    - JS scans the code
//    - Variables declared with var are hoisted as `undefined`
//    - Function declarations are hoisted with full body
// 2. During execution phase:
//    - Assignments happen
//    - Functions expressions/arrow functions are assigned

// --------- FUNCTION OBJECT STORED ---------
// Function declarations store:
// - The executable code (not string)
// - Reference to its lexical scope (closure)
// - Parameters info
// This is why you can call them before their declaration

// --------- SCOPE OF FUNCTION ---------
// Scope is determined **lexically** at creation time
// A function can access:
// - Its own local variables
// - Variables from the parent scope
// - Global variables
// Closure retains these references even after parent function has finished



console.log(foo);   //undefined
var foo = 1;

function outer() {
  //var foo;
  // console.log(foo); // undefined as foo in this scopes adds a var foo on the top
                    // so foo is present in current scope as undefined
  var foo = 2;

  inner();

  function inner() {
    console.log(foo); // undefined
    var foo = 3;
    console.log(foo); // 3
  }

  console.log(foo); // 2
}

outer();
console.log(foo); // 1



// var and function are allowed multiple declaration,
// they just overwrite and uses last binding

function outer() {
  //var foo;
  // console.log(foo); // ReferenceError, foo is in Temporal Dead Zone
  let foo = 2;

  inner();

  function inner() {
    // console.log(foo); // ReferenceError
    let foo = 3;
    console.log(foo); // 3
  }

  console.log(foo); // 2
}

outer();
console.log(foo); // 1
