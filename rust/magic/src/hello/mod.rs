mod hello;
pub fn returnstr() -> String{
    String::from("hello")
}
pub fn sendmod100(x: i32) -> i32{
    mod100(hello::say::sendint(x))
}
fn mod100(x: i32) -> i32{
    x%100
}