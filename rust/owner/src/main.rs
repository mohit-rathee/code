















fn main(){
    let string1 = String::from("hello"); // s = "hello"

    let string2 = takes_ownership(string1);  
    //string1 dies ,but still exists in memomy.
    print!("{}\n",string2); // print(take_ownership(s))
    // print!("{}\n",string1); // Error
    
} 

fn takes_ownership(anything: String)-> String {
        // this will copy the string and return new string
        return anything
}

