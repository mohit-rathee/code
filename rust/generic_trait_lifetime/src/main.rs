:w#[derive(Debug)]
struct Number {
    _x:u32,
}
fn main() {
    println!("Hello, world!");
    let x = 3;
    let s = Number{_x:x};
    println!("{:?}",s);
}
