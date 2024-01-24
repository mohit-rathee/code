#include<stdio.h>

int main(void){
    int a = 0;
    int b = 1;
    int result = 0;
    for(int i=0;i<10;i++){
        result = b+a;
        printf("%d\n",result);
        a = b;
        b = result;

    }
    printf("%d\n",result);
}
