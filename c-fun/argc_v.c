#include <stdio.h>
int main (int argc, char **argv){
    printf("%d\n",argc);
    //argv[0] ==> "./bin/arguments"
    for(int i=0;i<argc;i++){
        printf("%p\n", argv+i); 
        printf("%s\n", argv[i]);
    }
    return 0;
}
