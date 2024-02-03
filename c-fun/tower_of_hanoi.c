#include <stdio.h>
void tower_of_hanoi(int n,char from,char to,char alt){
    for (int i=0;i<(3-n);i++) {
        printf("    |");
    }
    printf("n: %d,[ %c ->  %c (%c) ]\n",n,from,to,alt);
    if (n==0) {
        return;
    }
    tower_of_hanoi(n-1,from, alt, to);

    for (int i=0;i<(3-n);i++) {
        printf("    |");
    }
    printf(" (%d) %c ==> %c\n",n,from,to);

    tower_of_hanoi(n-1, alt, to, from);
    return;
}
int main(){
    int a;
    scanf("%d",&a);
    tower_of_hanoi(a, 'A', 'C', 'B');
}
