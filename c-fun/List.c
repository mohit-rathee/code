#include <stdlib.h>
#include <stdio.h>
typedef enum {
    Int,
    String,
    List,
    Bool,
    Null,
} class ;
typedef union {
    int num;
    void* ptr;
} addr;
typedef struct {
    class type;
    addr data;
} data ;

typedef struct {
    int capacity;
    int size;
    data* arr;
} list ;

list* initList(){ // I will give [1,2,3,4,] will create a list in future.
    int capacity = 2;
    list *my_list = malloc(sizeof(list));
    my_list->capacity = capacity;
    my_list->size = 0;
    my_list->arr = (data *) malloc(capacity*sizeof(data)) ; 
    for (int i=0; i<capacity; i++) {
        int *a = malloc(sizeof(int));
        data dt;
        dt.type = String;
        dt.data.ptr = a;
        my_list->arr[i]=dt;
        printf("%p\n",a);
    }
    return my_list;
}

int main(){
    list *myList = initList();
}
