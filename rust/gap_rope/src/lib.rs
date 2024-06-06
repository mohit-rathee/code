//struct GapRope {
//  size: usize // len of the whole string stored. For fast recovery
//  root: Node
//}
//
//struct Node {
//  prev_len: usize // length of string stored in left subtree 
//  gap_buffer: GapBuffer
//  left: Option<&Node>  // leftSubtree
//  Right: Option<&Node> // rightSubtree
//}
//
// MAX_BUFFER_CAPACITY = 50
//
//struct GapBuffer {
//  len: size of string in GapBuffer without gap
//  buffer: actuall string or vec<char> with gap
//  gap_size: size of gap
//  gap_start: index where gap starts
//}

// NOTE: 
// every node will contain string instead of just leaves.
