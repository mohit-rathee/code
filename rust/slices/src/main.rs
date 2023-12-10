fn main() {
    let word= "  Hello";
    for (i, &item) in word.as_bytes().iter().enumerate() {
        print!("{:?},{:?}\n",i,item);
    }
}
