#include <stdio.h>
#include <stdlib.h>

// Average struct.
typedef struct Node {
    int data;
    struct Node* next;
}Node;

// My functions
void help();
Node* addNode(int i, Node* node);
void printList(Node* head);
void deleteNode(int i, Node* head); // i is value not index
void insertNode(int pos, int i, Node* head); // pos should not be 0 or -ve.

//Main
int main(){
    Node* head = NULL;
    char option = '\n';
    int input = 0;
    int pos = 0;
    help();
    while (option != 'q'){
        printf("Give command: ");
        scanf(" %c",&option);
        switch (option) {
            case 'p': //print linked list
                printList(head);
                break;
            case 'a': //add new node
                printf("Add value: ");
                scanf("%d",&input);
                head = addNode(input,head);
                break;
            case 'd': //deleting node
                if (head == NULL){
                    printf("Empty list\n");
                    break;
                }
                printf("Delete value: ");
                scanf("%d",&input);
                if(head->data == input){
                    Node* temp = head->next;
                    free(head);
                    head = temp;
                }else{
                    deleteNode(input,head);
                }
                break;
            case 'i': //insert node at pos
                printf("Insert value: ");
                scanf("%d",&input);
                printf("Insert at: ");
                scanf("%d",&pos);
                if(pos == 0){
                    head = addNode(input,head);
                }else{
                    insertNode(pos,input,head);
                }
                break; 
            case 'h': //help
                help();
                break;
            default: //invalid case
                printf("invalid command. press h for help\n");
                break;
        }
    }
}

void help(){
    printf("Enter command:\n");
    printf("\tp. Print the linked list.\n");
    printf("\ta. For adding new val\n");
    printf("\td. For deleting specific val\n");
    printf("\ti. For inserting at specific val\n");
    printf("\th. Help\n");
    printf("\tq. Exit\n");
}
Node* addNode(int i, Node* node){ // -> *Node
    Node *newNode = malloc(sizeof(Node));
    newNode->data = i;
    if (node!=NULL) {
        newNode->next = node;
    }
    return newNode;
}
void printList(Node* head){
    if(head != NULL){
        do{
            printf("%d<-",head->data);
            head = head->next; 
        }while(head!=NULL);
        printf("\n");
    }
}
void deleteNode(int i, Node* head){
    Node* prev = head;
    head = head->next;
    while(head->data != i){
        prev = head;
        head = head->next;
    }
    prev->next = head->next;
    free(head);
}
void insertNode(int pos, int i, Node* head){
    while(pos != 1 && head != NULL){ // when pos is not met.
        head = head->next;
        pos--;
    }// when pos is met or loop ended.
    if(head == NULL){
        printf("Index out of range.\n");
        return;
    }
    Node *newNode = malloc(sizeof(Node));
    newNode->data = i;
    newNode->next = head->next;
    head->next = newNode;
}
