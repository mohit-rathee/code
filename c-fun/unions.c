#include <stdio.h>
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
