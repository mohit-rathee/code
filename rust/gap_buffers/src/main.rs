#[derive(Debug)]
pub struct Buffer {
    buffer: Vec<char>,
    gap_start: usize,
    gap_size : usize,
    length: usize
}

impl Buffer {
    pub fn init(bufstr:&str) -> Buffer {
        let mut buffer:Vec<char> = bufstr.chars().collect();
        buffer.extend(std::iter::repeat(' ').take(6));
        Buffer{buffer, gap_start:bufstr.len(), gap_size:6, length:bufstr.len()}

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
    fn add_gap(&self,string:&mut String) -> usize {
        // new_gap is added to the new_string
        let new_gap = 6-self.gap_size;
        if new_gap > 0{
            for _ in 0..new_gap{
                string.push(' ');
            }
            return new_gap
        }
        return 0
    }
    pub fn insert(&mut self,pos:usize,string:&str){
        // Append if pos is end of buffer.
        if pos==self.buffer.len()-self.gap_size{
            self.buffer.extend(string.chars());
            self.length+=string.len();
            return
        }
        self.point_cursor(pos);
        if string.len()>self.gap_size{
            //insert vec<string+new_gap>
            let mut new_string = String::from(string);
            if self.gap_size<6{
                self.gap_size+=self.add_gap(&mut new_string);
            }
            //put new_string(string+new_gap) in place of gap_start
            self.buffer.splice(self.gap_start..self.gap_start,new_string.chars());
            self.gap_start+=string.len();
        }else{
            for (i,char_value) in string.chars().enumerate(){
                self.buffer[self.gap_start+i]=char_value;
            }
            self.gap_start+=string.len();
            self.gap_size-=string.len();
        }
        self.length+=string.len();
    }
    pub fn delete(&mut self,pos:usize,len:usize){
        let gap_end = self.gap_size+self.gap_start;
        if self.gap_start>pos{
            if self.gap_start<pos+len{
                self.gap_start=pos; //expand gap to where we start delete
                // len = left expansion + right_expansion
                self.gap_size+=std::cmp::min(self.length,len);
            }else{
                self.left_shift(pos+len,gap_end);
                self.gap_start-=len;
                self.gap_size+=len;
            }
        }else{
            self.right_shift(pos,gap_end);
            self.gap_size+=std::cmp::min(self.length,len);
        }
        self.length-=std::cmp::min(self.length,len);

    }
    pub fn replace(&mut self,pos:usize,string:&str){
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
    pub fn print(&self){
        //print!("==> ");
        for i in 0..self.gap_start {
            print!("{}",self.buffer[i]);
        }
        //print!("[{}",self.gap_size);
        //for i in self.gap_start..(self.gap_start+self.gap_size) {
        //    print!("{}",self.buffer[i]);
        //}
        //print!("]");
        for i in (self.gap_start+self.gap_size)..self.buffer.len() {
            print!("{}",self.buffer[i]);
        }
        println!();
        //println!("length : {}",self.length);

    }
}
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
    x.delete(0,7);
    x.print();
    x.insert(0,"hello world!");
    x.print();
    x.replace(0,"lksad");
    x.print();
    x.delete(3,2);
    x.print();
    x.replace(0,"lksaddfasa");
    x.print();
    x.insert(3,"boiboiboiboiboil");
    x.print();
    x.insert(3,"a");
    x.print();
}

