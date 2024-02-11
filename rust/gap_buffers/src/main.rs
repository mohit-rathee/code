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
    fn left_shift(&mut self, pos:usize,gap_end:usize){
            //move buffer[pos..gap_start] -> buffer[gap_end-len..]
            let len = self.gap_start-pos;
            self.buffer.copy_within(pos..self.gap_start,gap_end-len);
            self.gap_start=pos;
    }
    fn right_shift(&mut self, pos:usize,gap_end:usize){
            //move buffer[gap_end..len] -> buffer[gap_start..]
            self.buffer.copy_within(gap_end..pos+self.gap_size,self.gap_start);
            self.gap_start=pos;
    }
    fn point_cursor(&mut self,pos:usize){
        let gap_end = self.gap_size+self.gap_start;
        if pos > self.buffer.len()-self.gap_size{
            return
        }
        if self.gap_start>pos{
            self.left_shift(pos,gap_end);
        }else{
            self.right_shift(pos,gap_end);
        }
    }
    fn insert(&mut self,pos:usize,string:&str){
        if pos==self.buffer.len()-self.gap_size{
            self.buffer.extend(string.chars());
        }else{
            self.point_cursor(pos);
            for (i,char_value) in string.chars().enumerate(){
                self.buffer[self.gap_start+i]=char_value;
            }
            self.gap_start+=string.len();
            self.gap_size-=string.len();
        }
    }
    fn delete(&mut self,pos:usize,len:usize){
        let gap_end = self.gap_size+self.gap_start;
        if self.gap_start>pos{
            self.left_shift(pos+len,gap_end);
            self.gap_start-=len;
            self.gap_size+=len;
        }else{
            self.right_shift(pos,gap_end);
            self.gap_size+=len;
        }
    }
    fn replace(&mut self,pos:usize,string:&str){
        let gap_size = self.gap_size;
        let gap_start = self.gap_start;
        let gap_end = gap_start+gap_size;
        let rep_end = pos+string.len();
        if rep_end>self.buffer.len()-gap_size{return}
        let to_replace_from_left = (gap_start-pos).min(string.len());
        let to_replace_from_right = string.len()-to_replace_from_left;
        if to_replace_from_left > 0{
            for (i,char_value) in string.chars().take(to_replace_from_left).enumerate(){
                self.buffer[pos+i]=char_value;
            }
        }
        if to_replace_from_right > 0{
            for (i,char_value) in string.chars().skip(to_replace_from_left).enumerate(){
                self.buffer[gap_end+i]=char_value;
            }
        }
    }
    fn print(&self){
        print!("==> ");
        for i in 0..self.gap_start {
            print!("{}",self.buffer[i]);
        }
        print!("[_{}_]",self.gap_size);
        for i in (self.gap_start+self.gap_size)..self.buffer.len() {
            print!("{}",self.buffer[i]);
        }
        println!();

    }
}


fn main() {
    let mut x = Node::init("hello");
    x.print();
    x.insert(5,"ld!");
    x.print();
    x.insert(5," wor");
    x.print();
    x.insert(5,",");
    x.print();
    x.delete(2,2);
    x.print();
    x.delete(5,2);
    x.print();
    x.delete(2,3);
    x.print();
    x.replace(0,"HELLO");
    x.print();
}