#include <stdio.h>
//typedef union{
//    int signedInt;
//    unsigned int unsignedInt;
//} myUnion ;
//int main(){
//    myUnion value;
//    value.signedInt = -22;
//    printf("%u\n",value.unsignedInt);
//    return 0;
//}
typedef union{
     int Int;
     char Chr[4];
 } myUnion ;
 int main(){
     myUnion value;
     value.Chr[0] = 'a';
     value.Chr[1] = 'b';
     value.Chr[2] = 'c';
     value.Chr[3] = 'd';
     printf("%d\n",value.Int);
     return 0;
 }
