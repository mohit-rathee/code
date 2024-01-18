use std::io;

struct Node {
    data: i32,
    next: Option<Box<Node>>,
}
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
}

impl List {
    fn new() ->List {
        List{ len:0, head:Node::new(None) }
    }
    fn append(&mut self, item: i32,pos:i32) {
        let mut current = &mut self.head;
        if pos==0{
            let temp = self.head;
            self.head = Node::new(Some(item));
            self.head.unwrap().next = temp;
            return;
        }
        loop {
            current = match current {
                Option::Some(ref mut nod) => &mut nod.next,
                Option::None => {
                    current = &mut Node::new(Some(item));
                    return;
                },
            };
            //pos-=1;
            //if pos == 0{
            //let temp = current.next;
            //current = Some(Box::new(Node {
            //    data: item,
            //    next: None,
            //}));
            //current.next = temp;
            //}
        }
    }
    fn print(&self) {
        let mut list = self.head;
        loop {
            match list {
                Option::None => break,
                Option::Some(ref mut ls) =>{
                    println!("{}", ls.data);
                    list = ls.next;
                } 
            }
        }
    }
}

fn main() {
    let mut list = List::new();
    let mut user_input = String::new();
    loop {
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
        list.append(user_input,0);
    }
    list.print();
}
