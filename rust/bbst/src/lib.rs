pub struct AVLTree<T> {
    root: Link<T>,
}

type Link<T> = Option<Box<Node<T>>>;

struct Node<T> {
    value: T,
    height: isize,
    left: Link<T>,
    right: Link<T>,
}


impl<T: Ord + Clone + std::fmt::Debug> AVLTree<T> {
    pub fn new() -> Self {
        AVLTree { root: None }
    }

    fn height(&self, node: &Link<T>) -> isize {
        match node {
            None => 0,
            Some(ref boxed_node) => boxed_node.height,
        }
    }

    fn update_height(&self, node: &mut Box<Node<T>>) {
        node.height = 1 + std::cmp::max(self.height(&node.left), self.height(&node.right));
    }

    fn balance_factor(&self, node: &Node<T>) -> isize {
        self.height(&node.left) - self.height(&node.right)
    }

    fn rotate_right(&self, mut y: Box<Node<T>>) -> Box<Node<T>> {
        let mut x = y.left.take().unwrap();
        y.left = x.right.take();
        self.update_height(&mut y);
        x.right = Some(y);
        self.update_height(&mut x);
        x
    }

    fn rotate_left(&self, mut x: Box<Node<T>>) -> Box<Node<T>> {
        let mut y = x.right.take().unwrap();
        x.right = y.left.take();
        self.update_height(&mut x);
        y.left = Some(x);
        self.update_height(&mut y);
        y
    }

    pub fn insert(&mut self, value: &T) {
        let new_root = match &self.root {
            Some(..) => self.root.take().map(|node| self.insert_rec(Some(node), value)),
            None => Some(Box::new(Node {
                value: value.clone(),
                height: 1,
                left: None,
                right: None,
            })),
        };
        self.root = new_root;
    }

    fn insert_rec(&self, node: Link<T>, value: &T) -> Box<Node<T>> {
        match node {
            None => {
                Box::new(Node {
                    value: value.clone(),
                    height: 1,
                    left: None,
                    right: None,
                })
            }
            Some(mut boxed_node) => {
                if *value < boxed_node.value {
                    boxed_node.left = Some(self.insert_rec(boxed_node.left.take(), value));
                } else if *value > boxed_node.value {
                    boxed_node.right = Some(self.insert_rec(boxed_node.right.take(), value));
                }
                self.update_height(&mut boxed_node);
                let balance = self.balance_factor(&boxed_node);
                if balance > 1 {
                    if let Some(left_node) = boxed_node.left.as_ref() {
                        if *value < left_node.value {
                            return self.rotate_right(boxed_node);
                        } else {
                            boxed_node.left = Some(self.rotate_left(boxed_node.left.take().unwrap()));
                            return self.rotate_right(boxed_node);
                        }
                    }
                }
                if balance < -1 {
                    if let Some(right_node) = boxed_node.right.as_ref() {
                        if *value > right_node.value {
                            return self.rotate_left(boxed_node);
                        } else {
                            boxed_node.right = Some(self.rotate_right(boxed_node.right.take().unwrap()));
                            return self.rotate_left(boxed_node);
                        }
                    }
                }
                boxed_node
            }
        }
    }

    pub fn print(&self) {
        self.print_rec(&self.root);
        println!("");
    }

    fn print_rec(&self, node: &Link<T>) {
        match node {
            Some(node) => {
                self.print_rec(&node.left);
                println!("({:?} {:?})", node.value,node.height);
                self.print_rec(&node.right);
            }
            None => {}
        }
    }
}
