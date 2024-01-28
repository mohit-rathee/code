#include <stdio.h>
typedef union{
    int signedInt;
    unsigned int unsignedInt;
} myUnion ;
int main(){
    myUnion value;
    value.signedInt = 0;
    value.signedInt -= 1;
    printf("%d\n",value.signedInt);
    return 0;
}
