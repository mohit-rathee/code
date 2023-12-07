#include <stdio.h>
#include <stdlib.h>
int main(){
    int size = 4;
    int *a = malloc(size);
    int *b = malloc(size);
    int *c = malloc(size);
    *a=1;
    *b=2;
    *c=3;
    printf("%p\n",a);
    printf("%p\n",b);
    printf("%p\n",c);
    free(a);
    free(b);
    free(c);
    a = malloc(size);
    b = malloc(size);
    c = malloc(size);
    *a=1;
    *b=2;
    *c=3;
    printf("%p\n",a);
    printf("%p\n",b);
    printf("%p\n",c);
}
