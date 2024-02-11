use std::usize;

#[derive(Debug)]
struct Node {
    buffer: Vec<char>,
    gap_start: usize,
    gap_size : usize
}

impl Node {
    fn init(bufstr:&str) -> Node {
        let mut buffer:Vec<char> = bufstr.chars().collect();
        buffer.extend(std::iter::repeat(' ').take(50));
        Node{
            buffer,
            gap_start:bufstr.len(),
            gap_size:50
        }

    }
    fn point_cursor(&mut self,pos:usize){
        let gap_end = self.gap_size+self.gap_start;
        if pos > self.buffer.len()-self.gap_size{
            return
        }
        if self.gap_start>pos{
            //move buffer[pos..gap_start] -> buffer[gap_end-len..]
            let len = self.gap_start-pos;
            self.buffer.copy_within(pos..self.gap_start,gap_end-len);
        }else{
            //move buffer[gap_end..len] -> buffer[gap_start..]
            self.buffer.copy_within(gap_end..pos+self.gap_size,self.gap_start);
        }
        self.gap_start=pos;
    }

    fn print(&self){
        println!("{}",self.gap_start);
        print!("==> ");
        for i in 0..self.gap_start {
            print!("{}",self.buffer[i]);
        }
        print!("[_{}_]",self.gap_size);
        for i in (self.gap_start+self.gap_size)..self.buffer.len() {
            print!("{}",self.buffer[i]);
        }
        print!(".");
        println!();

    }
}


fn main() {
    let mut x = Node::init("hello");
    x.print();
    x.point_cursor(100);
    x.print();
    x.point_cursor(3);
    x.print();
}
