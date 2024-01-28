#include <stdio.h>
#include <stdlib.h>
int main(void){
    int* a = malloc(4);
    printf("%p\n",a);
    for(int i=0;i<100;i++){
        int*b = malloc(4);
        free(b);
    }
    free(a);
    int*b = malloc(4);
    printf("%p\n",b);
}
