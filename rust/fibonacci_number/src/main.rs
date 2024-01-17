fn main() {
    let ans = fibonaci(10000000000000000000);
    println!("{}",ans);
}
fn fibonaci(x:u64)-> u64{
    const MOD:u64=100;
    let mut a = 1;
    let mut b = 1;
    for _i in 2..x{
        let s = b;
        b = (b+a)%MOD;
        a = s;
    }
    return b
}
