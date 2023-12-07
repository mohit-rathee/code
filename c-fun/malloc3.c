#include <stdio.h>
#include <stdlib.h>
int main(){
    int a = 1;
    while(a){
        scanf("%d",&a);
        int *b = malloc(a);
        *b=a;
    }
}
