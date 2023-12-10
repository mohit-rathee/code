#[derive(Debug)]
struct Reactangle{
    height:u32,
    width:u32
}
impl Reactangle {
    fn area(&self)->u32 {
        self.height*self.width
    }
    fn can_hold(&self, other: &Reactangle) -> bool {
        (self.width > other.width && self.height > other.height)^(self.width>other.height&&self.height>other.width)
    }
    
}
fn main() {
    let react=Reactangle{
        height:30,
        width:50
       };
    println!(
        "The area of the rectangle is {} square pixels.",
        react.area()
    );
    dbg!(&react);
    let react2=Reactangle{height:49,width:29};
    print!("{}",react.can_hold(&react2));
}

