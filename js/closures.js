// I m learning from namaste javascript

function a(){
    for (var i=0;i<6;i++){
        setTimeout(function (){
            if(i==6) i=1;
            console.log(i);
            i++;
        },i*1000); 
    }
}

function b(){
    for(var i=0;i<6;i++){
        function magic(x){
            setTimeout(function(){
                console.log(x);
            },x*1000)

            }
        magic(i);
    }
}
a();
