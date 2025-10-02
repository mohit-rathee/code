// ===============================
// JAVASCRIPT SCOPE CONCEPTS
// ===============================

// -------------------------------
// 1. Function Scope vs Block Scope
// -------------------------------

// var is function scoped
function functionScopeExample() {
  if (true) {
    var x = 10; // accessible throughout the function
  }
  console.log(x); // 10
}

// let and const are block scoped
function blockScopeExample() {
  if (true) {
    let y = 20; // only accessible inside this block
    const z = 30; // only accessible inside this block
    console.log(y, z); // 20, 30
  }
  // console.log(y); // ReferenceError
  // console.log(z); // ReferenceError
}

// -------------------------------
// 2. Nested Scopes
// -------------------------------

let outer = 1;

function nestedScope() {
  let outer = 2; // shadows outer variable
  console.log(outer); // 2

  if (true) {
    let outer = 3; // new block scope
    console.log(outer); // 3
  }

  console.log(outer); // 2
}

// -------------------------------
// 3. Loops and Scope
// -------------------------------

// var in for loops
for (var i = 0; i < 3; i++) {
  console.log(i); // 0 1 2
}
console.log(i); // 3, because var is function scoped

// let in for loops
for (let j = 0; j < 3; j++) {
  console.log(j); // 0 1 2
}
// console.log(j); // ReferenceError, let is block scoped

// const in for loops
// const cannot be reassigned in the loop, so normal increment fails
// for (const k = 0; k < 3; k++) { console.log(k); } // TypeError

// -------------------------------
// 4. For..of and For..in
// -------------------------------

const arr = [10, 20, 30];

// for..of iterates over values
for (const value of arr) {
  console.log(value); // 10, 20, 30
}

// for..in iterates over keys (indices for arrays)
for (const index in arr) {
  console.log(index); // 0, 1, 2
}

// -------------------------------
// 5. Shadowing and Block Scope in Loops
// -------------------------------

let outerValue = 100;

for (let outerValue = 0; outerValue < 3; outerValue++) {
  console.log(outerValue); // 0, 1, 2
}

console.log(outerValue); // 100, outerValue outside loop unaffected

// -------------------------------
// 6. Key Takeaways
// -------------------------------

// - var is function scoped, can be accessed outside blocks but inside functions
// - let and const are block scoped, cannot be accessed outside their block
// - Nested scopes create new environments for variables (shadowing)
// - for..of iterates values, for..in iterates keys
// - Loops with let/const create a new scope per iteration for closures

