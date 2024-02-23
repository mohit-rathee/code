type Link<T> = Option<Box<Node<T>>>;
struct Node<T> {
    value: T,
    height: isize,
    left: Link<T>,
    right: Link<T>,
}
pub struct AVLTree<T> {
    root: Link<T>,
}
impl<T: Ord+Clone> AVLTree<T> {
    pub fn new() -> Self {
        AVLTree { root: None }
    }
    fn height(&self, node: &Link<T>) -> isize {
        match node {
            None => 0,
            Some(ref boxed_node) => boxed_node.height,
        }
    }
    fn balance_factor(&self, node: &Node<T>) -> isize {
        self.height(&node.left) - self.height(&node.right)
    }
    fn rotate_right(&self, mut y: Box<Node<T>>) -> Box<Node<T>> {
        let mut x = y.left.take().unwrap();
        y.left = x.right.take();
        x.right = Some(y);
        x.height = 1 + std::cmp::max(self.height(&x.left), self.height(&x.right));
        x.right.as_mut().unwrap().height = 1 + std::cmp::max(self.height(&x.right.as_ref().unwrap().left), self.height(&x.right.as_ref().unwrap().right));
        x
    }
    fn rotate_left(&self, mut x: Box<Node<T>>) -> Box<Node<T>> {
        let mut y = x.right.take().unwrap();
        x.right = y.left.take();
        y.left = Some(x);
        y.height = 1 + std::cmp::max(self.height(&y.left), self.height(&y.right));
        y.left.as_mut().unwrap().height = 1 + std::cmp::max(self.height(&y.left.as_ref().unwrap().left), self.height(&y.left.as_ref().unwrap().right));
        y
    }
    pub fn insert(&mut self, value: T) {
        let new_root = self.root.take().map(|node| self.insert_rec(Some(node), value)).flatten();
        self.root = new_root;    }
    fn insert_rec(&self, node: Link<T>, value: T) -> Link<T> {
        let new_val = value.clone();
        let mut node = match node {
            None => return Some(Box::new(Node {
                value,
                height: 1,
                left: None,
                right: None,
            })),
            Some(mut boxed_node) => {
                if value < boxed_node.value {
                    boxed_node.left = self.insert_rec(boxed_node.left, new_val);
                } else if value > boxed_node.value {
                    boxed_node.right = self.insert_rec(boxed_node.right, new_val);
                } else {
                    return Some(boxed_node); // Duplicates not allowed
                }
                boxed_node
            }
        };
        node.height = 1 + std::cmp::max(self.height(&node.left), self.height(&node.right));
        let balance = self.balance_factor(node.as_ref());
        // Left Left Case
        if balance > 1 && value < node.left.as_ref().unwrap().value {
            return Some(self.rotate_right(node));
        }
        // Right Right Case
        if balance < -1 && value > node.right.as_ref().unwrap().value {
            return Some(self.rotate_left(node));
        }
        // Left Right Case
        if balance > 1 && value > node.left.as_ref().unwrap().value {
            node.left = Some(self.rotate_left(node.left.take().unwrap()));
            return Some(self.rotate_right(node));
        }
        // Right Left Case
        if balance < -1 && value < node.right.as_ref().unwrap().value {
            node.right = Some(self.rotate_right(node.right.take().unwrap()));
            return Some(self.rotate_left(node));
        }
        Some(node)
    }
}
fn main() {
    let mut avl = AVLTree::new();
    avl.insert(10);
    avl.insert(20);
    avl.insert(30);
    avl.insert(40);
    avl.insert(50);
    avl.insert(25);
    // Note: Printing is omitted for brevity. You can implement an in_order function similar to the BST for visualization.
}
