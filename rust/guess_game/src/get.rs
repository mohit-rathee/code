use std::io;
pub fn input(msg: &str) -> u32 {
    loop {
        let mut value = String::new();
        println!("{}", msg);
        io::stdin()
            .read_line(&mut value)
            .expect("Can't Read Number");
        let value: u32 = match value.trim().parse() {
            Ok(num) => num,
            Err(_) => {
                println!("Enter digits only!!!");
                continue;
            },
        };
        return value;
    }
}
