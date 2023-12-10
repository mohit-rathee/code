fn main(){
    let s = String::from("hello");
    print!("{}\n",takes_ownership(s))
} 

fn takes_ownership(some_string: String)->String {
    fn makes_copy(some_str: String)->String{ 
        some_str
    }
    makes_copy(some_string)
}


