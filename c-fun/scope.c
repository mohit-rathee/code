#include <stdio.h>

int main(){
    int num = 0;
    while (num!=9) {
        scanf("%d",&num);
        switch (num) {
            case 1:
                printf("it's 1\n");
                break;
            default:
                printf("it's not 1\n");
                break;
        }
    }
}
