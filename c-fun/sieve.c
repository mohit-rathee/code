#include <stdio.h>
#include <stdlib.h>
int main(){
    int num;
    scanf("%d",&num);
    int* array = malloc(num*sizeof(int));
    for(int i=0;i<num;i++){
        array[i]=1;
    }
    for (int i=2;i<num;i++) {
        if (array[i]!=0){
            for (int j=2*i;j<num;j+=i) {
                if (array[j] != 0){
                    array[j]=0;
                }
            }
            //remove it's multiple
        }//else do nothing
    }
    for(int i=2;i<num;i++){
        if (array[i]!=0){
        printf("%d\n",i);
        }
    }
}
