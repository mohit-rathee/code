use std::io::{self};

enum Node {
    Node(Box<Rope>),
    End(String)
}
struct Rope {
    len : i32,
    left :Option<Node>,
    right :Option<Node>
}

impl Rope {
    fn new() -> Rope {
        Rope{left:None,right:None,len:0}
    }
    fn append(&mut self,str:String) {

        let head = self;
        loop{
            if let Some(x) = head.left.take() {
                if let Node::End(y) = x {
                    println!("{}",y);
                }
            };
            if let Some(x) = head.right {
                if let Node::End(y) = x {
                    println!("{}",y);
                }
            };
        }
        
    }
}


fn main() {
    let main_rope = Rope::new();
    loop {
        let mut buffer = String::new();

        io::stdin().read_line(&mut buffer).expect("Error reading input");

        let trimmed_input = buffer.trim();

        if trimmed_input == "q" {
            println!("Exiting the loop.");
            break;
        }

        println!("You entered: {}", trimmed_input);
    }
}

