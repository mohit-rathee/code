use rand::Rng;
use std::cmp::Ordering;

pub struct Secret {
    value: u32,
    pub counter: u32,
}

impl Secret {
    pub fn new(rng: u32) -> Secret {
        let range = 10u32.pow(rng);
        println!("Selected Range: [0,{}]", range);
        let max_count = range.ilog2() as u32;
        let secret = rand::thread_rng().gen_range(1..=range);
        Secret {
            value: secret,
            counter: max_count + 1,
        }
    }
    pub fn check(& self, guess: u32) -> bool {
        match self.value.cmp(&guess) {
            Ordering::Greater => {
                print!("It's Smaller.\n");
                false
            }
            Ordering::Less => {
                print!("It's bigger.\n");
                false
            }
            Ordering::Equal => true
        }
    }
}
