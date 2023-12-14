#include<stdlib.h> 
#include<stdio.h> 
#include<string.h> 

int main(){
    char* Str="MOHIT RATHEE";

    char* *list = malloc(sizeof(void*)*100000000);
    for (int i=0; i<100000000;i++) {
        list[i] = strdup(Str);
    }

    for (int i=0; i<100000000;i++) {
        free(list[i]);
    }

    free(list);

    printf("ok");
    
    int integer = 0;
    scanf("%d\n",&integer);

}
