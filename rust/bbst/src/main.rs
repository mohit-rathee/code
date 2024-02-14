use std::cmp::Ordering;

#[derive(Debug)]
struct Node {
    val: usize,
    left: Option<Box<Node>>,
    right: Option<Box<Node>>,
}
impl Node {
    fn new(val: usize) -> Node {
        Node {
            val,
            left: None,
            right: None,
        }
    }
}

struct BBST {
    root: Option<Box<Node>>,
}
impl BBST {
    fn new(val: Option<usize>) -> BBST {
        if let Some(value) = val {
            BBST {
                root: Some(Box::new(Node::new(value))),
            }
        } else {
            BBST { root: None }
        }
    }
    fn add(&mut self, val: usize) {
        if let Some(_) = self.root {
            self.insert(val);
        } else {
            self.root = Some(Box::new(Node {
                val,
                left: None,
                right: None,
            }));
        }
    }

    fn insert(&mut self, val: usize) -> bool {
        let mut curr_tree = &mut self.root;
        while let Some(curr_node) = curr_tree {
            match curr_node.val.cmp(&val) {
                Ordering::Less => curr_tree = &mut curr_node.right,
                Ordering::Equal => {
                    return false;
                }
                Ordering::Greater => curr_tree = &mut curr_node.left,
            }
        }
        *curr_tree = Some(Box::new(Node{val,right:None,left:None}));
        true
    }
}
fn main() {
    let mut my_bbst = BBST::new(None);
    my_bbst.add(30);
    my_bbst.add(10);
    my_bbst.add(40);
}
