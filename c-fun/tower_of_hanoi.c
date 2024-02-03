#include <stdio.h>
void tower_of_hanoi(int n,char from,char to,char alt){

    if (n==0) {
        return;
    }
    // Youtube Video:
    //      https://www.youtube.com/watch?v=2SUvWfNJSsM

    // move (n-1)th disk from top of me to alt(not dest)
    // alt and to are replaced because n don't wants (n-1)
    // to be at n's destination
    tower_of_hanoi(n-1,from, alt, to);

    // move me to the destination.
    printf("(%d) %c ==> %c\n",n,from,to);

    // move (n-1)th disk from alt to top of  me 
    tower_of_hanoi(n-1, alt, to, from);
    return;
}
int main(){
    int a;
    scanf("%d",&a);
    tower_of_hanoi(a, 'A', 'C', 'B');
}
