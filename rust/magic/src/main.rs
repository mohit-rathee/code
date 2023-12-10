mod hello;
use magic::magic;
fn main(){
    magic::congrats();
    if magic::cmp::is_gtr(1,3){
        println!("it's greater")
    }else{
        println!("it's lesser")
    }
    println!("{}",hello::returnstr());
    println!("{}",hello::sendmod100(13212));
}
