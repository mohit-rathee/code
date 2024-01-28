#include <stdio.h>
int main(void){
    int a[5]={0,2,0,2,2};
    int num=a[0];
    int count = 1;
    for(int i=1;i<5;i++){
        if(a[i]==num){
            count++;
        }else {
            count--;
        }
        if(count==0){
            num=a[i];
            count = 1;
        }
    }
    printf("%d\n",num);
}
