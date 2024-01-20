use std::{io, thread::current};
#[derive(Debug)]
struct Node {
    data: i32,
    next: Option<Box<Node>>,
}#[derive(Debug)]
struct List {
    len: i32,
    head: Option<Box<Node>>,
}
impl Node {
    fn new(item:Option<i32>) -> Option<Box<Node>>{
        if let Some(num) = item{
            Some(Box::new(Node{data:num,next:None}))
        }else{
            None
        }
    }
    fn next(&self) -> Option<&Box<Node>> {
        match &self.next{
            Some(node) => Some(node),
            None => None
        }
    }
}

impl List {
    fn new() ->List {
        List{ len:0, head:Node::new(None) }
    }
    fn print(self)-> Self {
        println!("printing");
        self
    }
}

fn main() {
    let list = List::new();
    let mut user_input:String;
    loop {
        user_input="".to_string();
        io::stdin()
            .read_line(&mut user_input)
            .expect("Can't Read Number");
        let user_input: i32 = match user_input.trim().parse() {
            Ok(num) => num,
            Err(_) => {
                println!("Enter digits only!!!");
                break;
            }
        };
        println!("{} added.",user_input);
        //list.append(user_input);
    }
    list.print();
}
