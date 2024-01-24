#include<stdio.h>

int repeat(int x);

int main(void){
    int num = 10;
    int ans = repeat(num);
    printf("%d\n",ans);
    return 0;
}

int repeat(int num){
    if(num ==1){
        printf("1\n");
        return 1;
    }else{
        int out = num * repeat(num-1);
        printf("%d\n",out);
        return out;
    }
}
