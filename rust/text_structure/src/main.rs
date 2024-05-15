//use bbst::AVLTree;
use gap_buffers::Buffer;

fn main() {
    let mut x = Buffer::init("hello");
    x.insert(5,"ld!");
    x.print();
    x.insert(5," wor");
    x.print();
    x.insert(10,",");
    x.print();
    x.delete(2,2);
    x.print();
    x.delete(5,2);
    x.print();
    x.delete(2,3);
    x.print();
}
