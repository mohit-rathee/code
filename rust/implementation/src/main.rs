struct Node<T>{
    value: T,
    child: Option<Box<Node<T>>>
}

impl<T: std::fmt::Debug+Copy> Node<T> {
    fn new(value:T) -> Node<T> {
        Node{value,child:Some(Box::new(Node{value,child:None}))}
    }
    fn take(&mut self){
        let child = self.child.take();
        match self.child{
            None=>println!("None"),
            Some(ref next)=>println!("{:?}",next.value)
        }
        match child{
            None=>println!("None"),
            Some(ref next)=>println!("{:?}",next.value)
        }
    }
    fn put(&mut self, val:T){
        let _b = match self.child {
            None => Node::new(val),
            Some(_) =>Node::new(val)
        };
    }

}


fn main() {
    let mut b = Node::new(5);
    b.take();
    b.put(2);
}
