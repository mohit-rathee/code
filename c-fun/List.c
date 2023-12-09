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
void printObj(dataObj* object){ //pass-by-ref to reduce time.
        switch (object->class) {
            case Int:
                printf("<class: int> <data: %d>\n",object->data.num);
                break;
            case String:
                printf("<class: String> <data: %s>\n",object->data.str);
                break;
            case Bool:
                printf("<class: Bool> <data: %d>\n",object->data.boool);
                break;
            default:
                printf("<class: Null> <data: %d>\n",object->data.num);
                break;
        }
}
void print(list *my_list){
    int capacity = my_list->capacity;
    int size = my_list->size;
    printf("capacity: %d \n",capacity);
    printf("size: %d \n",size);
    printf("[\n");
    dataObj* arr = my_list->arr;
    for (int i=0;i<size;i++){
        printObj(&arr[i]);
    }
    printf("]\n");
    

}
void append(list* my_list, dataObj dataobj){
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
dataObj get(list* my_list,int index){
    if(index<0){index=-index;}
    if(index<my_list->size){
        dataObj retVal = my_list->arr[index];
        return retVal;
    }
    printf("list index out of range.");
}
int main(){
    list* myList = initList();
    print(myList);
    //Append
    //Don't mismatch enumType and valueType
    dataObj val = {.class=String,.data={.str="BBBB"}}; 
    append(myList, val); 
    print(myList);

    //Get
    dataObj bbbb = get(myList,2);
    printObj(&bbbb);

    //Pop
    dataObj waste= pop(myList);
    print(myList);
    printf("%s\n",waste.data.str);
}
