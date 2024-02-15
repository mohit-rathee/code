
struct Node<T> {
    value: T,
    height: isize,
    left : Option<Box<Node<T>>>,
    right: Option<Box<Node<T>>>,
}

struct Tree<T> {
    root: Option<Box<Node<T>>>
}

impl<T:Ord> Tree<T> {
    fn new(val:Option<T>) -> Tree<T> {
        match val{
            Some(value) => Tree{root:
                Some(Box::new(Node{value,height:1,left:None,right:None}))
            },
            None => Tree{
                root: None
            }
        }
    }
}

fn main() {
    let tree:Tree<usize> = Tree::new(Some(50));
    println!("tree is :{}",tree.root.unwrap().value);
}
