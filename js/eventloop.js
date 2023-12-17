setTimeout(
    ()=>{console.log('time outs !!!')},
    0
);
async function important(){
    console.log('response arrived');
}
important();


console.log('starting');

for(let i=0;i<5000000000;i++){
    //do something to aquire main thread.
    let some = i+i-i;
}

console.log('long long time later!!!');
