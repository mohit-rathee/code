

struct List{
    data:i32,
    next:Option<Box<List>>
}

fn main() {
    println!("Hello, world!");
    let list = List{data:5,
        next:Option::Some(
            Box::new(List{data:4,
            next:Option::None})
        )
    };
    print(list);
}
fn print(mut my_list:List) {
    loop{
        println!("{}",my_list.data);
        match my_list.next{
            Option::None => break,
            Option::Some(list) => my_list=*list,
        }
    }
}
