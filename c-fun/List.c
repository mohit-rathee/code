#include <math.h>
#include <stdlib.h>
#include <stdbool.h>
#include <stdio.h>
typedef enum {
    Int,
    String,
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
} dataObj;

typedef struct {
    int capacity;
    int size;
    dataObj* arr;
} list ;

list* initList(){ // I will give [1,2,3,4,] will create a list in future.
    int capacity = 50;
    list *my_list = malloc(sizeof(list));
    my_list->capacity = capacity;
    my_list->size = 0;
    my_list->arr = (dataObj *) malloc(capacity*sizeof(dataObj)) ; 
    //filing data
    my_list->arr[0]=(dataObj){.class=Int,.data={.num=5}};
    my_list->arr[1]=(dataObj){.class=String,.data={.str="AAAA"}};
    my_list->arr[2]=(dataObj){.class=Bool,.data={.boool=true}};
    my_list->size=3; 
    return my_list;
}

void print(list *my_list){
    int capacity = my_list->capacity;
    int size = my_list->size;
    printf("capacity: %d \n",capacity);
    printf("size: %d \n",size);
    printf("[");
    dataObj* arr = my_list->arr;
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
void append(list* my_list, dataObj dataobj){
    printf("type: %d\n",dataobj.class);
    printf("%s\n",dataobj.data.str);
    int capacity = my_list->capacity;
    int size = my_list->size;
    if (size>capacity){
        //realloc
    }
    my_list->arr[size]= dataobj;
    my_list->size++;
}
dataObj pop(list* my_list){
    int size = my_list->size;
    if (size<0){return (dataObj){};}
    dataObj retVal = my_list->arr[size-1];
    my_list->size--;
    return retVal;
}
int main(){
    list* myList = initList();
    print(myList);

    //Append
    //Don't mismatch enumType and valueType
    dataObj val = {.class=String,.data={.str="BBBB"}}; 
    append(myList, val); 
    print(myList);

    //Pop
    dataObj waste= pop(myList);
    print(myList);
    printf("%s\n",waste.data.str);
}
