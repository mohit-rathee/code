#include <stdio.h>
#include <stdlib.h>

int main(){
    long int* arr = malloc(32);
    for(int i=0;i<5;i++){
        arr[i]=14;
    }
    int* ok = malloc(9*sizeof(int));

    long int Len = arr[5];
    long int *len = arr;
    printf("%p\n",len);
    len = arr +5;
    *len = (long int)49;
    len = arr +6;
    *len = (long int)0;
    len = arr +7;
    *len = (long int)0;
    len = arr +11;
    *len = (long int)134417;
    
    //Even after setting up proper structure 
    //malloc doesn't provide chunk on this segement.
    char* s = malloc(5);
    printf("%p\n",s);
    char* r = malloc(5);
    printf("%p\n",r);

}
