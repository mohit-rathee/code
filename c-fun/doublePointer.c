#include <stdio.h>
#include <stdlib.h>
void is_zero(int** num){
    if(**num == 0){
        *num = NULL;
    }
}
int main(){
    int* myInt = malloc(sizeof(int));
    *myInt = 0;
    is_zero(&myInt);
    if (myInt){
        printf("points to %d\n",*myInt);
    }else{
        printf("points to NULL\n");
    }
}

