use crate::gap_buffers::GapBuffer;

#[allow(dead_code)]
pub struct Rope {
    pub prev_len: usize,          // length of string stored in left subtree
    pub height: usize,            // height
    pub gap_buffer: GapBuffer,    // gap buffer
    pub left: Option<Box<Rope>>,  // leftSubtree
    pub right: Option<Box<Rope>>, // rightSubtree
}

#[allow(dead_code)]
impl Rope {
    pub fn new(prev_len: usize, string: &str) -> Self {
        Self{
            prev_len,
            height : 1,
            gap_buffer : GapBuffer::new(string),
            left : None,
            right : None,
        }
    }
}

// NOTE:
// every node will contain string instead of just leaves.
