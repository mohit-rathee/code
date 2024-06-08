use crate::ropes::Rope;

#[allow(dead_code)]
pub struct GapRope {
    pub root: Option<Box<Rope>>,
}

impl GapRope {
    #[allow(dead_code)]
    pub fn new(str: Option<&str>) -> Self {
        if let Some(str) = str {
            Self {
                root: Some(Box::new(Rope::new(0, str))),
            }
        } else {
            Self { root: None }
        }
    }
    #[allow(dead_code)]
    pub fn insert(&mut self, index: usize, str: &str) {
        let mut root = self.root.as_mut();
        loop {
            if let Some(node) = root {
                if node.prev_len > index {
                    root = node.left.as_mut();
                }else if node.prev_len+node.gap_buffer.length > index {
                    // insert into it 
                    println!("editing into node");
                    node.gap_buffer.insert(index-node.prev_len,str);
                    break
                }else{
                    root = node.right.as_mut();
                }

            };
        }
    }
    #[allow(dead_code)]
    fn eval_rec(&self, node: &Option<Box<Rope>>, string: &mut Vec<char>) {
        let node = &node;
        if let Some(rope) = node {
            self.eval_rec(&rope.left, string);
            let gap_buf = &rope.gap_buffer;
            for c in 0..gap_buf.gap_start{
                if gap_buf.buffer[c]!=' '{
                    string.push(gap_buf.buffer[c]);
                }
            }
            for c in gap_buf.gap_start+gap_buf.gap_size..gap_buf.buffer.len(){
                if gap_buf.buffer[c]!=' '{
                    string.push(gap_buf.buffer[c]);
                }
            }
            self.eval_rec(&rope.right, string);
        }
    }
    #[allow(dead_code)]
    pub fn evalute(&self) -> Vec<char> {
        let mut string: Vec<char> = Vec::new();
        if let Some(..) = &self.root {
            self.eval_rec(&self.root, string.as_mut());
        }
        return string;
    }
}
