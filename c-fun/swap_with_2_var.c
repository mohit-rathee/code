#include <stdio.h>
int main(){
    int a = 3;
    int b = 8;
    a = a+b;
    b = a - b; // b = a
    a = a - b; // a = b
    printf("%d\n",a);
    printf("%d\n",b);
    return 0;
}
