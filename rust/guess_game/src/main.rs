use guessing_game::get::input;
use guessing_game::guess::Secret;
fn main() {
    println!("Welcome to the game");
    let range = input("Enter the power of 10, as range :");
    let mut secret = Secret::new(range);
    loop {
        let guess = input(format!("Enter your guess, remaining: {}", secret.counter).as_str());
        let result = secret.check(guess);
        if result == true {
            print!("YOU WIN!!!\n");
            break;
        } else if secret.counter == 1 {
            println!("YOU LOOSE!!!\n");
            break;
        }
        secret.counter -= 1;

    //     match guess.cmp(&secret_number) {
    //         Ordering::Less => println!("Too small!"),
    //         Ordering::Greater => println!("Too big!"),
    //         Ordering::Equal => println!("You win!"),
    //     }
    // }        
    }
}
