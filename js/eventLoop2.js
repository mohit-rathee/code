console.log("A"); //logs immediately

setTimeout(() => console.log("B"), 0); //micro task enque

Promise.resolve().then(() => console.log("C")); //micro task enque

console.log("D"); //logs immediately

//micro task deque

//micro task deque


//SOLUTION:
//A
//D
//B
//C
