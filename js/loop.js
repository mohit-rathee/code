function hello(){
    for(var i=0;i<=5000000;i++){
        setTimeout(function (){
            console.log(i);
        },1000);
    }
    console.log('i m done');
}
hello()
