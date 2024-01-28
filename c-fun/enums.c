#include <stdio.h>
typedef enum{
    Int,
    NotInt,
} myEnum ;

int main(void){
    int a = Int;
    int b = NotInt;
    printf("%d\n",a);
    printf("%d\n",b);
}
