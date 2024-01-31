use std::io;

#[derive(Debug)]
struct Node {
    data: i32,
    next: Option<Box<Node>>,
}
#[derive(Debug)]
struct List {
    len: i32,
    head: Option<Box<Node>>,
}
impl Node {
    fn new(item:Option<i32>,nxt:Option<Box<Node>>) -> Option<Box<Node>>{
        if let Some(num) = item{
            Some(Box::new(Node{data:num,next:nxt}))
        }else{
            None
        }
    }
}

impl List {
    fn new() ->List {
        List{ len:0, head:Node::new(None,None) }
    }
    fn print(&self) {
        println!("printing");
        println!("Lenght : {}",self.len);
        let mut node = &self.head;
        loop{
            match node {
                Some(value) => {
                    println!("{}",value.data);
                    node = &value.next;
                },
                None => {
                    break;
                }
            }
        }
    }
    fn append (&mut self,num:i32) {
        let mut x = self.head.as_mut();
        let y = x.take();
        println!("{:?}",y);
        match self.head.take(){
            Some(head)=>{
                let new_node = Node::new(Some(num),Some(head));
                self.head = new_node;
                self.len += 1;
            },
            None => {
                let new_node = Node::new(Some(num),None);
                self.head = new_node;
                self.len = 1;
            }
        }
    }
    fn pop (&mut self) {
        match self.head.take(){
            Some(head)=>{
                self.head = head.next;
                self.len -= 1;
            },
            None => {
                self.head = None;
                self.len = 0;
            }
        }
    }
}

fn main() {
    let mut list = List::new();
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
        if user_input == 0 {
            println!("removed the head.");
            list.pop();
        }else{
            println!("{} added.",user_input);
            list.append(user_input);
        }
    }
    list.print();
}
