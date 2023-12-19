function car(brand,color){ // base class
    this.brand = brand;
    this.color = color;
}

car.prototype.introduce = function(){ // Basic Implementations
    console.log("This is a "+this.color+" "+this.brand+".")
}

function audi(color){ //child class
    car.call(this,"Audi",color)
}
audi.prototype = Object.create(car.prototype); // Inheriting from base class

audi.prototype.introduce = function(){ // child specific function
    console.log("Hey I have a "+this.color+" Audi"+".")
}

const myCar1 = new car("Swift","Cyan");
myCar1.introduce(); //only access to basic implementations

const myAudi = new audi("Black");
myAudi.introduce(); // access to implementations specific for child class only

console.log(myCar1); 
console.log(myAudi); 
