#[derive(Debug)]
struct Node{
    val  : usize,
    left : Option<Box<Node>>,
    right: Option<Box<Node>>,
}
impl Node {
    fn new(val:usize) -> Node { Node{val,left:None,right:None} }
}

struct BBST {
    root: Box<Node>,
}
impl BBST {
    fn new(val:usize) -> BBST {
        BBST{ root : Box::new(Node::new(val)) }
    }
}
fn main() {
    let my_bbst = BBST::new(50);
    println!("{}",my_bbst.root.val);
}
