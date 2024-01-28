#include <stdio.h>
#include <stdlib.h>
int main(){
    int* value1 = malloc(4);
    int* value2 = malloc(4);
    printf("value1 is %d\n",*value1);
    printf("value2 is %d\n",*value2);
    free(value1);
    free(value2);
    int* _1 = malloc(4);
    int* _2 = malloc(4);
    *_1 = 168;
    *_2 = 64;
    printf("value1 is %d\n",*value1);
    printf("value2 is %d\n",*value2);

}
