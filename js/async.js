

async function dosomething2(){
    for(let i=0;i<10000;i++){
        let s=i+i
    }
    console.log('processing2 ...')
    return "namaste javascript !!!";
}


async function dosomething(){
    for(let i=0;i<10000;i++){
        let s=i+i
    }
    console.log('loop end')
    await dosomething2();
    // awaiting will run dosomething2 but when
    // it's time to return result it will 
    // suspend the dosomething function and
    // starts with the main function
    console.log('processing ...')
    return "namaste javascript !!!";
}

const anything = dosomething()

anything
.then((anyThing)=>console.log(anyThing));

for(let i=0;i<10000;i++){
    let s=i+i
}
console.log('main loop end')

console.log('my block end')
