#include <stdio.h>
#include <stdlib.h>
int main(){
    for(int i=0;i<10;i++){
        void* ptr = malloc(10);
        printf("%p\n",ptr);
    }
}
