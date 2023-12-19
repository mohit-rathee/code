// async function is called inside a non-async function (i.e GEC)
const anything = dosomething() // ==> JUMP TO dosomething function.  <== came back from dosomething2
// <== CAME back from dosomething function.
//   anything = PENDING promise.

//attach a callback function
anything.then((res)=>console.log(res)) // call this callback function

for(let i=0;i<10;i++){
    let s=i+i
}

console.log('main loop end')

// STACK CALL IS EMPTY NOW, moving to dosomething2
async function dosomething(){ // <== dosomething execution starts syncronusly
    for(let i=0;i<10;i++){
        let s=i+i
    }
    console.log('loop end')
    const res =dosomething2(); //==> JUMP TO dosomething2 function.
    console.log(res)  // PENDING promise

    await res;   //encounters a promise, so it suspends and JUMP TO GEC with PENDING promise.

    // it it spawned just after call stack was empty.when dosomething2 was executing.
    // <== CAME FROM dosomething2.

    console.log('processing ...')
    return res +1 //FULLFILLES the promise , JUMP TO GEC
}

async function dosomething2(){ //<== dosomething2 execution starts syncronusly
    for(let i=0;i<10;i++){
        let s=i+i
    }
    console.log('processing2 ...')
    const res = dosomething3(); // JUMP TO dosomething3 function.
    // CAME FROM dosomething3.
    console.log('------')
    console.log(res) //FULLFILLED promise
 
    await res  //encounters a promise, so it suspends and JUMP TO dosomething.
        // <== came back after main block was executed.
    console.log('------')
    console.log(res) // FULLFILLED promise
    return res + 1; //  FULLFILLES the  promise, JUMP TO dosomething.
}
async function dosomething3(){ //<== dosomething3 execution starts syncronusly
    for(let i=0;i<10;i++){
        let s=i+i
    }
    console.log("processing3 ...")
    return 1;  // RETURN A PROMISE (FULLFILLED)
} // ==> JUMP TO dosomething2.


