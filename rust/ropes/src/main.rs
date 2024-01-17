struct Ropes {
    left :String,
    right :String
}

impl Ropes {
    fn new(left:String,right:String) -> Ropes{
        Ropes{left,right}
    }
    fn print(&self){
        println!("{}",self.left);
        println!("{}",self.right);
    }
}

fn main() {
    let left = String::from("A");
    let right= String::from("B");
    let my_ropes = Ropes::new(left,right);
    my_ropes.print();
}
