#include <stdio.h>
int  main(){
    int arr[] = {1,2,3,4,5};
    printf("%p\n",arr);

    // ( A[B] || B[A] ) ==> A+B*sizeof(el)
    //                      where :
    //                          A = pointer
    //                          B = int
    printf("%d\n",arr[0]);
    printf("%d\n",0[arr]);

    printf("%d\n",*arr);
}
