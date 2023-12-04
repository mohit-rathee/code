#include<stdio.h>
void main(){
    int i,j,a[3][3];
    for(i=0;i<3;i++){
        printf("Entern the row %d elements\n",i+1);
        for(j=0;j<3;j++){
            printf("No %d: ",j+1);
            scanf("%d",&a[i][j]);
        }
    }
    printf("2D matrix formed is: \n");
    for (i=0;i<3;i++){
        for(j=0;j<3;j++){
            printf("%d ",a[i][j]);
        }
        printf("\n");
    }
}
