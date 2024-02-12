#[derive(Debug)]
struct Node {
    buffer: Vec<char>,
    gap_start: usize,
    gap_size : usize
}

impl Node {
    fn init(bufstr:&str) -> Node {
        let mut buffer:Vec<char> = bufstr.chars().collect();
        buffer.extend(std::iter::repeat(' ').take(6));
        Node{
            buffer, gap_start:bufstr.len(), gap_size:6
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
            if string.len()>self.gap_size{
                //insert vec<string+new_gap>
                //new_gap should reset to normal.
                if self.gap_size<6{
                    let new_gap = 6-self.gap_size;
                    let mut new_string = String::from(string);
                    if new_gap > 0{
                        for _ in 0..new_gap{
                            new_string.push(' ');
                        }
                    }
                    self.gap_size+=new_gap;
                }
                self.buffer.splice(self.gap_start..self.gap_start,string.chars());
                self.gap_start+=string.len();
            }else{
                for (i,char_value) in string.chars().enumerate(){
                    self.buffer[self.gap_start+i]=char_value;
                }
                self.gap_start+=string.len();
                self.gap_size-=string.len();
            }
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
        let mut to_replace_from_left=0;
        if gap_start>pos{
            to_replace_from_left = (gap_start-pos).min(string.len());
        }
        if to_replace_from_left > 0{
            for (i,char_value) in string.chars().take(to_replace_from_left).enumerate(){
                self.buffer[pos+i]=char_value;
            }
        }
        //println!("left->{}",to_replace_from_left);
        let to_replace_from_right = string.len()-to_replace_from_left;
        //println!("right->{}",to_replace_from_right);
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
    x.insert(10,",");
    x.print();
    x.delete(2,2);
    x.print();
    x.delete(5,2);
    x.print();
    x.delete(2,3);
    x.print();
    x.insert(4,"nothing");
    x.insert(3,"HELLO SIR!!!");
    x.print();
    x.replace(1,"I");
    x.print();
    x.replace(2,"xyz");
    x.print();
    x.insert(15,"xyzabc");
    x.insert(0,"M");
    x.print();
}
