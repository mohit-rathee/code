pub mod magic{
    pub mod cmp{
        pub fn is_gtr(a: i32,b: i32) ->bool{
            if a>b{
                return true;
            }else {
                return false;
            }
        }
    }
    pub mod len{
        pub fn length(s: &str) -> usize{
            return s.len();
        }
    }
    pub fn congrats(){
            println!("Congratulation You WON!!!");
    }
    
}

// #[cfg(test)]
// mod tests {
//     use super::*;

//     #[test]
//     fn it_works() {
//         let result = magic::cmp::is_gtr(3, 2);
//         assert_eq!(result, true);
//     }
// }
