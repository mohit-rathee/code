#include <stdio.h>
int main(){
    int y = 5;

    int* x = NULL;
    int* z = &y;

    printf("%p\n",z);
    printf("%d\n",*z);
    printf("%p\n",x);
    printf("%d\n",*x);
}
