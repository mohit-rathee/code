function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {
  return `Hello, I'm ${this.name}`;
};

const p = new Person("Alice");

console.log(p.greet());
console.log(p.__proto__ === Person.prototype);

