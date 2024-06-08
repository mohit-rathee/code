mod gap_buffers;
mod gap_rope;
mod ropes;
use crate::gap_rope::GapRope;
#[cfg(test)]
mod tests {
    use crate::gap_rope::GapRope;
    #[test]
    fn empty_init() {
        let gaprope = GapRope::new(None);
        assert_eq!(gaprope.evalute(), vec!());
    }
    #[test]
    fn full_init() {
        let string = "hello";
        let mut gaprope = GapRope::new(Some(string));
        assert_eq!(
            gaprope.evalute(),
            vec!('h', 'e', 'l', 'l', 'o')
        );
        gaprope.insert(5,"ld!");
        assert_eq!(
            gaprope.evalute(),
            vec!('h','e','l','l','o','l','d','!',)
        );
        gaprope.insert(5," wor");
        assert_eq!(
            gaprope.evalute(),
            vec!('h','e','l','l','o', 'w','o','r','l','d','!')
        );
        gaprope.insert(10,",");
        assert_eq!(
            gaprope.evalute(),
            vec!('h','e','l','l','o', 'w','o','r','l',',','d','!')
        );
//        gaprope.delete(2,2);
//        assert_eq!(
//            gaprope.evalute(),
//            vec!('h','e','o', 'w','o','r','l',,'d','!')
//        );
//        gaprope.delete(5,2);
//        assert_eq!(
//            gaprope.evalute(),
//            vec!('h','e','o', 'w','l',,'d','!')
//        );
//        gaprope.delete(2,3);
//        assert_eq!(
//            gaprope.evalute(),
//            vec!('h','e','l',,'d','!')
//        );
//        gaprope.delete(0,7);
//        assert_eq!(
//            gaprope.evalute(),
//            vec!()
//        );
//        gaprope.insert(0,"hello world!");
//        assert_eq!(
//            gaprope.evalute(),
//            vec!('h','e','l','l','o', 'w','o','r','l','d','!')
//        );
//        gaprope.replace(0,"lksad");
//        assert_eq!(
//            gaprope.evalute(),
//            vec!('l','k','s','a','d', 'w','o','r','l','d','!')
//        );
//        gaprope.delete(3,2);
//        assert_eq!(
//            gaprope.evalute(),
//            vec!('l','k','s', 'w','o','r','l','d','!')
//        );
//        gaprope.replace(0,"lksaddfasa");
//        assert_eq!(
//            gaprope.evalute(),
//            vec!('l','k','s','a','d','d','f','a','s','a')
//        );
//        gaprope.insert(3,"boiboiboiboiboil");
//        assert_eq!(
//            gaprope.evalute(),
//            vec!('l','k','s','b','o','i','b','o','i','b','o','i','b','o','i','b','o','i','l','a','d','d','f','a','s','a')
//        );
//        gaprope.insert(3,"a");
//        assert_eq!(
//            gaprope.evalute(),
//            vec!('l','k','s','a','b','o','i','b','o','i','b','o','i','b','o','i','b','o','i','l','a','d','d','f','a','s','a')
//        );
//        


    }
}


fn main() {
    let string = "hello";
    let insert_str = "!!!";
    let mut gaprope = GapRope::new(Some(string));
    gaprope.insert(1, insert_str);
    println!("{:?}",gaprope.evalute());
}
