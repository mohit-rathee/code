fn main() {
    //println!("hello guys");
    let mut counter:u32 = 10;
    loop {
        print!("{}\n",counter);
        counter=counter-1;
        if counter==0{
            print!("Launch\n");
            break;
        }
    }
    print!("mission successful\n");
}
