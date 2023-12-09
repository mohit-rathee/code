#include <stdlib.h>
#include <stdbool.h>
#include <stdio.h>
typedef enum {
    Int,
    String,
    List,
    Bool,
} class ;

typedef union {
    int num;
    char* str;
    _Bool boool;

} value;
typedef struct{
    class class;
    value data;
} datatype;

typedef struct {
    int capacity;
    int size;
    datatype* arr;
} list ;

list* initList(){ // I will give [1,2,3,4,] will create a list in future.
    int capacity = 50;
    list *my_list = malloc(sizeof(list));
    my_list->capacity = capacity;
    my_list->size = 0;
    my_list->arr = (datatype *) malloc(capacity*sizeof(datatype)) ; 
    //filing data
    my_list->arr[0]=(datatype){.class=Int,.data={.num=5}};
    my_list->arr[1]=(datatype){.class=String,.data={.str="AAAA"}};
    my_list->arr[2]=(datatype){.class=Bool,.data={.boool=true}};
    my_list->size=4; //if error the put this to 3
    return my_list;
}

void printList(list *my_list){
    int capacity = my_list->capacity;
    int size = my_list->size;
    printf("capacity: %d \n",capacity);
    printf("size: %d \n",size);
    printf("[");
    datatype* arr = my_list->arr;
    for (int i=0;i<size;i++){
        switch (arr[i].class) {
            case Int:
                printf("<class: int> <data: %d>, ",arr[i].data.num);
                break;
            case String:
                printf("<class: String> <data: %s>, ",arr[i].data.str);
                break;
            case Bool:
                printf("<class: Bool> <data: %d>, ",arr[i].data.boool);
                break;
            default:
                printf("<class: Null> <data: %d>, ",arr[i].data.num);
                break;
        }
    }
    printf("]\n");
    

}
int main(){
    list *myList = initList();
    printList(myList);
}
