int main(){
    char mem = 'a';
    char *Mem = &mem;
    *Mem = 'b';
}

// Dump of assembler code for function main:
//   0x0000000000001139 <+0>:	push   rbp
//   0x000000000000113a <+1>:	mov    rbp,rsp
//   0x000000000000113d <+4>:	sub    rsp,0x20
//   0x0000000000001141 <+8>:	mov    rax,QWORD PTR fs:0x28
//   0x000000000000114a <+17>:	mov    QWORD PTR [rbp-0x8],rax
//   0x000000000000114e <+21>:	xor    eax,eax
//   0x0000000000001150 <+23>:	mov    BYTE PTR [rbp-0x11],0x61
//   0x0000000000001154 <+27>:	lea    rax,[rbp-0x11]      Load Effective Address is used.
//   0x0000000000001158 <+31>:	mov    QWORD PTR [rbp-0x10],rax  to calculate the address
//   0x000000000000115c <+35>:	mov    rax,QWORD PTR [rbp-0x10]
//   0x0000000000001160 <+39>:	mov    BYTE PTR [rax],0x62
//   0x0000000000001163 <+42>:	mov    eax,0x0
//   0x0000000000001168 <+47>:	mov    rdx,QWORD PTR [rbp-0x8]
//   0x000000000000116c <+51>:	sub    rdx,QWORD PTR fs:0x28
//   0x0000000000001175 <+60>:	je     0x117c <main+67>
//   0x0000000000001177 <+62>:	call   0x1030 <__stack_chk_fail@plt>
//   0x000000000000117c <+67>:	leave
//   0x000000000000117d <+68>:	ret
//End of assembler dump.
