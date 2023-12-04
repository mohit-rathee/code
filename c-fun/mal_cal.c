#include <stdlib.h>
int main(){
    void *p = malloc(1);
    int *P = p;
    *P = 15;
}
// Dump of assembler code for function main:
 //  0x0000000000001139 <+0>:	push   rbp
 //  0x000000000000113a <+1>:	mov    rbp,rsp
 //  0x000000000000113d <+4>:	sub    rsp,0x10
 //  0x0000000000001141 <+8>:	mov    edi,0x1                   Takes the size into edi
 //  0x0000000000001146 <+13>:	call   0x1030 <malloc@plt>       and 
 //  0x000000000000114b <+18>:	mov    QWORD PTR [rbp-0x10],rax  puts the pointer in rax
 //  0x000000000000114f <+22>:	mov    rax,QWORD PTR [rbp-0x10]
 //  0x0000000000001153 <+26>:	mov    QWORD PTR [rbp-0x8],rax
 //  0x0000000000001157 <+30>:	mov    rax,QWORD PTR [rbp-0x8]   if used in future just
 //  0x000000000000115b <+34>:	mov    DWORD PTR [rax],0xf       use the ref* value.
 //  0x0000000000001161 <+40>:	mov    eax,0x0
 //  0x0000000000001166 <+45>:	leave
 //  0x0000000000001167 <+46>:	ret
//End of assembler dump.
