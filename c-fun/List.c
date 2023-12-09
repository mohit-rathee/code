typedef enum {
    Int,
    String,
    List,
    Bool,
    Null 
} class ;

typedef struct {
    class class;
    void* ptr;
} data ;

typedef struct {
    int capacity;
    int size;
    data *arr;
} list ;
