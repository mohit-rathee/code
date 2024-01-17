fn main() {
    let str1 = String::from("abcd");
    let str2 = String::from("rrefg");
    let result: &str = longest(&str1,&str2);
    println!("The longest string is {}", result);

}

fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    let result = if y.len()<x.len() {
    x
    }else{
    y
    };
    result
}
