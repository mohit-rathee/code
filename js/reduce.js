const user = [
    {firstName:"Mohit", lastName:"Rathee", age:19},
    {firstName:"vikas", lastName:"siwach", age:99},
    {firstName:"Honey", lastName:"singh", age:48},
    {firstName:"Sunny", lastName:"Rathee", age:19},
    {firstName:"Amitab", lastName:"Bachan", age:999}
]

// number of people of same age.
const ageObj = user.reduce((acc,curr)=>{
        if(acc[curr.age]){
            acc[curr.age]+=1
        }else{
            acc[curr.age]=1
        }
        return acc;
    },
    {});

// names of people whose age is less than 50.

// by reduce only
const validNames1 = user.reduce((acc,curr)=>{
        if(curr.age<50){
            acc.push(curr.firstName);
        }
        return acc;
    },
    []);

// with reduce & filter
const validNames2 = user.filter((obj)=>obj.age<50)
    .reduce((acc,curr)=>{
        acc.push(curr.firstName)
        return acc
    },[])

// with map & filter
const validNames3 = user
        .filter((obj)=>obj.age<50)
        .map((validObj)=>validObj.firstName)

console.log(ageObj)
console.log(validNames1)
console.log(validNames2)
console.log(validNames3)
