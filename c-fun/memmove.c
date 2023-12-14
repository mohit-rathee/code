#include <stdio.h>
#include <string.h>

int main(){
    int a[] ={1,2,3,4,5};

    // You need to specify the size in bytes
    memcpy(a+1, a+2,3*sizeof(int));
    
    for (int i=0; i<5; i++) {
        printf("%d\n",a[i]);
    }
    
}
