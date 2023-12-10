fn main() {
    let ok = Option::Some(5);
    print!("{:?}\n",ok);
    let ok:Option<u32> = None;
 2    print!("{:?}\n",ok);
    let ok:Option<u32> = Option::None;
    print!("{:?}\n",ok);
    match ok {
        Option::Some(_) => print!("ok exist\n"),
        None => print!("thats wierd\n"),
    };
}
