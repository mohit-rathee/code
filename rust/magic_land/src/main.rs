use magic::magic;
fn main() {
    let s = "hello";
    println!("{}",magic::cmp::is_gtr(5,4));
    println!("{}",magic::len::length(&s));
    magic::congrats();
}
