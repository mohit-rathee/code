#include <stdio.h>
int main(){
    int a, remainder;
    int reverse = 0;
    scanf("%d",&a);
    while (a!=0) {
        remainder = a%10;
        printf("remainder : %d\n",remainder);
        reverse = reverse * 10 + remainder;
        printf("reverse : %d\n",reverse);
        a/=10;
        printf("a : %d\n",a);
    }
    printf("%d\n",reverse);
}
