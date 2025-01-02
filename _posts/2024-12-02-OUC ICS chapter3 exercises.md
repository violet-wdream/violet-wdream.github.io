---
layout: post
title: 计算机系统基础ICS 第三章习题讲解
date: 2024-12-02
tags:
  - Course
  - ICS
  - homework
share: "true"
---



![image-20241226225857947](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202412262258985.png)





## 3

![image-20241130215710342](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202411302157372.png)

### 解析

```c
ax寄存器为eax寄存器的低16位，后缀w，源：基址+比例变址+偏移量 目的：寄存器;
al寄存器是ax寄存器的低8位，后缀b，源：寄存器 目的：基址+偏移量;
后缀l， 源：比例边址 目的：寄存器;
dh寄存器是edx寄存器的高8位，后缀b，源：基址 目的：寄存器;
后缀l， 源：立即数 目的：栈;
后缀l,源：立即数 目的： 寄存器;
后缀w，源：寄存器 目的：寄存器;
后缀l，源：基址+变址+偏移 目的：寄存器;
    
8(,,) 偏移量
(%ebx) 基址
(,%ebx) 变址
(,%ebx,4)比例变址
(%ebx，%ecx) 基址+变址
8(,%ebx,4) 偏移量+比例变址
8(,%ebx) 偏移量+变址
8(%ebx) 偏移量+基址
8(%ecx,%ebx,4) 偏移量+基址+比例变址
```









## 4

![image-20241201010215430](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412010102490.png)

### 解析

```c
$0xFF  imm立即数 
movw   16
$0xF0, %ecx  addl的目的操作数不能是立即数
orl
只有32位寄存器可以用于寻址，不能用%dl寻址
movswl/movzwl %bx, %eax
%esx 不存在
没有变址寄存器
```



### movs (符号扩展)

- 保持原数的符号位
- 用于有符号数扩展
- 将符号位复制到高位

例如：movsbl (Move with Sign-Extend Byte to Long)

```nasm
; 原始值(byte): 1000 0001 (-127)
movsbl %al, %eax
; 结果(long): 1111 1111 1111 1111 1111 1111 1000 0001
```

### movz (零扩展)

- 高位补零
- 用于无符号数扩展
- 不考虑符号位

例如：movzbl (Move with Zero-Extend Byte to Long)

```nasm
; 原始值(byte): 1000 0001 
movzbl %al, %eax
; 结果(long): 0000 0000 0000 0000 0000 0000 1000 0001
```

### 关键区别

1. **符号处理**
   - movs：保持符号
   - movz：忽略符号，高位补0

2. **使用场景**
   - movs：处理有符号数
   - movz：处理无符号数

## 5

![image-20241130215812648](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202411302158691.png)

### 解析

```c
源操作数比目的操作数短时，需要拓展：movs / movz ，目的类型为unsigned时使用0拓展，其余符号拓展
b8 w16 l32 q64;
eax/ax/al = x;
edx = ptr;
```



```assembly
movsbl %al, (%edx) ; 8 - 32 signed byte8 to long32 
movb %al, (%edx) ; 32 - 8  mov to char(byte8)
movl %eax, (%edx) ; 32 - 32
movswl %ax, (%edx) ; 16 - 32  s
movzbl %al, (%edx) ; 8 - 32  z   
movzbl %al, (%edx) ; 8 - 32  z
movl %eax, (%edx) ; 32 - 32 
```











## 6

![image-20241130215827428](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202411302158466.png)

### 解析

```c
三个入口参数（*xptr,*yptr,*zptr）存放的存储单元地址分别为：
    	R[ebp]+8,R[ebp]+12,R[ebp]+16   
```



```c
eax = *xptr;  x addr
ebx = *yptr;  y addr
ecx = *zptr;  z addr
    
edx = *yptr; y
esi = *zptr; z
edi = *xptr; x
    
*yptr = edi;   y = x
*zptr = edx;   z = y
*xptr = esi;   x = z
==>swap(x,y,z) 
void func(int *xptr, int *yptr, int *zptr){
    int *tmpx = xptr;
    int *tmpy = yptr;
    int *tmpz = zptr;
    yptr = tmpz;
    zptr = tmpy;
    xptr = tmpx;
}

```



上面的从结果来看是对的。但是从汇编翻译的角度来看，是错误的

简单概括来说，可以认为：

mov 内存 —> 寄存器是int a = *p;

mov 寄存器 —> 内存是 *p = a;

```c
void func(int *xptr, int *yptr, int *zptr){
    int tmpx = *xptr;
    int tmpy = *yptr;
    int tmpz = *zptr;
    *yptr = tmpz;
    *zptr = tmpy;
    *xptr = tmpx;
}
```





## 7

![image-20241209165745628](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412091657693.png)

### 解析

注意mov和lea指令区别 ，具体内容可看ICS第三章内容介绍

- 如果是mov指令：movl (%eax),%edx表示取eax寄存器中存放的的地址来访存，将内存中取得的值给edx寄存器
-  如果是lea指令：lea (%eax), %edx表示将eax寄存器的值直接给edx寄存器，而不是访存

```c
x;  
x+y+4;
x+8*y;
y+2*x+12;  0xC = 12
4*x;    基址0
x+y;
```





## 8

![image-20241130215845626](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202411302158666.png)

### 解析

- OF: OVERFLOW flag  溢出标志，判断**带符号数**是否溢出
- SF: SIGNED flag 符号标志位，**带符号整数**加减运算后符号位，直接取最高位作为SF
- ZF：ZERO flag 零标志位，判断加法器结果是否为0，如果为0，ZF=1，否则ZF=0
- CF：CARRIER flag 进位标志位，判断**无符号数**是否溢出



1.`addl (%eax),%edx`

```json
edx += *(eax);  edx = 0x0000 0060H + 0xffff fff0 
=128+ (-1-15) =112 =0x70H
OF=0, 操作数作为有符号数没有溢出(没有发生截断)
SF=0，符号位是0
ZF=0，结果不是0
CF=1, 操作数作为无符号数时显然发生了上溢
```



2.`subl (%eax,%ebx), %ecx`

```json
ecx -= *(eax + ebx); 
ecx = 0x0000 0010 - *（0x0804 9400）
    = 0x0000 0010 - 0x8000 0008
    = 0x0000 0010 + 0x7FFF FFF8  
    (取反方式，对于16进制，先变成二进制，然后从右往左找到第一个“1”，然后把它左边的的数全部取反,对于16进制而言，就是用15减去该位：
    0x8000 0008 = (1000 0000 ...0000) 1000 --> = 0111 1111... 1111 1000 = 7FFF FFF8)
    = 0x8000 0008
OF=0，操作数作为有符号数没有溢出
SF=1，符号位1
ZF=0，不是0
CF=1，操作数作为无符号数，进行减法，只要不相等就会下溢
```

3.`orw 4(%eax,%ecx,8), %bx`	

```json
b8
w16   orw 表示目的操作数为16位 %bx表示 %ebx的低16位
l32
q64
bx = bx or *(4+eax+8*ecx)
= bx | *(4+0x0804 9300 + 16*8) ;4+0x0804 9300 + 16*8=0x0804 9384
= bx | 0x80f7 ff00
= 0x0100 | 0xff00
= 0000 0001 0000 0000 | 1111 1111 0000 0000
= 1111 1111 0000 0000 = 0xFF00
OF=0，按位操作不会导致上溢/下溢
SF=1，符号位1
ZF=0，不是0
CF=0, 按位操作不会导致上溢/下溢
```

4.`testb $0X80, %dl`

```json
dl寄存器是dx寄存器的低8位，就是edx寄存器的低8位
testb 表示一个and 运算，目标操作数8位，不会改变寄存器值，会得出结果影响标志寄存器
0x80 & 0x80 = 1000 0000 &1000 0000 = 0x80
OF=0，按位操作不会导致上溢/下溢
SF=1，符号位1
ZF=0，不是0
CF=0, 按位操作不会导致上溢/下溢
```

5.`imull $32, (%eax, %edx), %ecx`

```json
i表示立即数乘法， imull目的操作数l 32位
ecx = 32*  (*(eax + edx))  ; *(eax + edx) = 0x908f 12a8
= 32 * 0x908f 12a8  溢出 (左移五位)
= 1001 0000 1000 1111 0001 0010 1010 1000 <<5
= 1001 0000 1000 1111 0001 0010 1010 1000 00000
= 0001 0001 1110 0010 0101 0101 0000 0000
= 0x11E25500
OF=1，作为有符号数发生了下溢
SF=0，符号位0
ZF=0，不是0
CF=1, 作为无符号数发生了上溢
```

6.`mulw %bx`

```json
DX 与AX合起来存放一个双字长数(32位)，其中DX存放高16位，AX存放低16位。
mulw 隐含了目的操作数ax
ax = bx * ax
=0x9300 * 0x0100
=1001 0011 0000 0000 << 8
=0
dx= 1001 0011 = 0x93
OF = 1 作为有符号数溢出了
SF = 0 符号位0
ZF = 1 等于0
CF = 1 作为无符号数也溢出了
```

7.`decw %cx`

```json
cx --
cx = 0x0010 -1
=16 - 1 
=15 = 0x0F
OF = 0
SF = 0 
ZF = 0 
CF = 0
```



## 9

![image-20241209165817626](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412091658694.png)

### 解析

```json
ecx = 12 + %(ebp) = y ; //ecx = y
ecx = ecx << 8  算数左移8位 = 256*y ; //ecx = 256y
eax = x 
edx = k
eax *= edx ; //eax = xk  ecx = 256y , edx = k
edx = z ; //eax = xk   ecx = 256y , edx = z
edx = edx & (65535-15) = edx & 0xFFF0  // 等效左移四位, 高16位清零
edx = edx + ecx ; //eax = x*k   ecx = 256*y , edx = z & 0xFFF0 +  256*y
eax = eax - edx //eax = x *k -(256*y + z & 0xFFF0)


eax = x *k -(256*y + z & 0xFFF0)
int v =  x*k -(256*y + z & 0xFFF0);
```





## 10

![image-20241130215914233](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202411302159269.png)

### 解析

yh表示y高32位，yl表示y低32位

 16(%ebp) 指的是y的低32位yl

 20(%ebp) 指的是y的高32位yh

movl 目的操作数 l 32位， 从起始地址开始取4B， 所以movl 20(%ebp),%ecx 是把20~17 的4B传给ecx寄存器

```json
eax = x ;   unsigned int 4B 
ecx = yh ;   num_type 8B   num_type -> long long ? or unsigned long long ?
ecx = ecx * eax = x * yh ;有符号乘也可以计算无符号乘, 将x*y的高32位给ecx
eax = yl*x；mull无符号乘 隐含了目的操作数eax，低32位放在eax，高32位放在edx， 16(%ebp) 指的是y的低32位yl， 将x*y的低32位给eax
edx = edx + ecx =0+ x*yh ； 将x*y的高32位给edx
ecx = d ； ecx存地址d
*d = eax = x*yl  ; 低32位 ，将eax取出放到d地址索引内存块
*(d+4) = edx = x*yh； 高32位， 将edx取出放到d地址+4索引内存块

num_type ： unsigned long long 

long long 类型需要额外的符号扩展和多重乘法步骤，以确保负数计算的正确性。而 unsigned long long 不需要符号扩展，直接按位计算和存储即可
```



## 11

![image-20241130215901665](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202411302159701.png)

![image-20241130215925774](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202411302159796.png)

### 解析

**IA-32采用小端方式**

1

```json
条件转移都是  目标地址=PC+偏移量
je 0111 0010 = 0x74  偏移量0x08 , 目标地址：（0x804838c +0x2） + 0x08 （自身指令长度2B） = 0x804838 （22） =  0x8048396     
```

```c
call 指令目的地址： 0x80483b1 = (0x804838e + 0x5 )+ offset , b1 = 8e + 05 + offset , ==>11 1 = 8 19 + offset = 9 3 + offset , offset = 32- 2 = 30 = 0x1e
offset =0x1e
call指令操作码： 0xe8 , 偏移量为:0x0000001e
```

2

```c
offset = 0xf6 , dst address = 0x8048390 + 0x2+ 0xf6 , 
3 9 0 + 0 0 2 + 0 15 6=4 8 8 , dst =0x8048488
```

```c
前两个字节是操作码，0x05c6 ; 接着4个字节是目的地址：0x0804a800;
最后4个字节是常数立即数：0x00000001;
所以movl机器指令有10个字节（分为了两段）
```

3

```c
根据条件转移指令的特性，算出j指令的起始地址，从而推算出mov指令起始地址;
offset = 0x16 , src + size + offset = dst = 0x80492e0 ;
size = 0x2, src = 0x80492e0 - 0x18 => 14 0 - 0 24 = 12 8 = 0x80492c8;
mov src = j src + j size = 0x80492c8 + 0x2 = 0x80492ca
```

4

```c
offset = 0xffffff00 = -1 - 240 -15  = -256 ;
dst = src + size +offset = 0x804829b  - 0001 0000 0000 = 0x804829b- 0x100 
    = 0x804819b
    src + size 就是下一条指令的起始地址0x804829b
```











## 12

![image-20241225145321965](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202412251453014.png)

### 解析

```c
dl = c;
eax = p;
if eax ==0 -> l1,if x & 1000 0000 ==0 -> l1 , else *p =*p + x;//逻辑取反
==> if (p!=0 && x <0 ) *p +=x; ==>if (p && x <0 ) *p +=x;
因为实际上c代码的if语句的条件可以拆分为两个if，对应两个条件转移指令
```



```c
if(p==0) goto .L1;
if(x >= 0) goto .L1;
*p = *p+x;
.L1:
```





## 13

根据汇编补充c程序

![image-20241225145138290](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202412251451502.png)

### 解析

```c
int func(int x, int y){ // 8+ebp ==x , 12 + ebp ==y
    int z = x+y;//最后eax 里应该是z， eax的作用是存放函数返回值
    if(x > -100 ){
        if(x < 16) z = x*y; //eax =eax *edx
        else z = x&y; //eax = eax & edx
    }
    else if( x >= y){
        z = x-y; // eax = eax - edx 
    } 
    //eax = eax + edx  初始化z时可以使用（所有分支都没对eax赋值时使用）
    return z;
}
```



![image-20241225154325148](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202412251543190.png)





## 14

![image-20241130215942200](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202411302159228.png)

![image-20241130215953476](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202411302159512.png)

### 解析

1

```c
bx = x;
si = y;
cx = k;
do{
    dx = y;
    ax = y;
    dx = y >> 15; //拓展y的高16位，放到dx
    ax = y / k; dx = y % k // div -> %  
    bx = x * (y % k);
    k --;
    //if(cx <=0) break;
}while(y > k && k!=0) //一定会执行一次
eax = bx;
```



> idiv %cx
>
> R[dx]←**R[dx-ax]÷R[cx]** 的余数 ，将y%k送DX
>
> R[ax]←R[dx-ax]÷R[cx] 的商 ，将y/k送AX



2

> 被调用者保存寄存器：BX , SI ;   调用者保存寄存器：AX ,CX , DX;
>
> 被调用者保存寄存器必须保存到栈中
>

### 被调用者保存寄存器（Callee-Saved Registers）

被调用者保存寄存器是指在函数调用过程中，被调用的函数负责保存和恢复这些寄存器的值。如果被调用的函数修改了这些寄存器，它必须在返回之前将它们恢复到调用者的值。

在 IA-32 架构中，被调用者保存寄存器包括： 

- **EBX**：基址寄存器
- **ESI**：源索引寄存器
- **EDI**：目标索引寄存器
- **EBP**：基址指针寄存器（通常用于栈帧指针）

### 调用者保存寄存器（Caller-Saved Registers）

调用者保存寄存器是指在函数调用过程中，调用的函数负责保存和恢复这些寄存器的值。如果调用者需要在函数调用后继续使用这些寄存器的值，它必须在调用之前保存它们，并在**调用之后恢复它们**。

在 IA-32 架构中，调用者保存寄存器包括：`ACD`

- **EAX**：累加器寄存器（通常用于返回值）
- **ECX**：计数器寄存器
- **EDX**：数据寄存器

3

> 拓展被除数y的高16位，放到寄存器DX，低16位放到寄存器AX；进行有符号除法（类似于乘法）需要拓展符号位。
>



## 15

![image-20241225215341302](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202412252153354.png)

### 解析

```c
edx = x;
eax = 0;// y = eax
while(x!=0){
    y = y ^ x;
    x = x >>1;
}
return y & 0x1;
```

![image-20241226003539941](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202412260035991.png)

> 函数f1的功能：
>
> return 0\^x0\^x1\^x2\^x3…^x31;
>
> 根据异或 的性质可以得知：  f1的 功能是确定x中1的数量是奇数还是偶数，如果是奇数则返回1，如果是偶数则返回0





## 16

![image-20241225215501743](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202412252155794.png)

![image-20241225215518161](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202412252155205.png)

### 解析

```c
eax = x;
eax = x+3;
if(x+3 >7){//ja = jump above (unsigned)
    //.L7

} 
else {
    goto .L8+(x+3);

    //if x+3 = 1 , goto L2  //if x+3 = 2 , goto L2
    //if x+3 = 3 , goto L3
    //if x+3 = 4 , goto L4
    //if x+3 = 5 , goto L5
    //if x+3 = 7 , goto L6
    //if x+3 = 0 , goto L7  //if x+3 = 6 , goto L7  , L7被单独列出来了，所以是default分支
    //so if x == -3 or 3, goto L7;  default
}
void sw(int x){
    switch(x){
        case -2:
        case -1: .L2;break;   //注意此处case -2  ，case -1执行相同的语句，可以合并
        case 0: .L3;break;
        case 1: .L4;break;
        case 2: .L5;break;
        case 4: .L6;break;
        default : .L7;
    }    
}
标号为3或者-3，default;
标号为-1或-2 会执行同一个分支
```



## 17

![image-20241130220004768](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202411302200797.png)

### 解析

> 目的操作数不是unsigned 就是有符号数，就需要进行符号扩展movs 

```c
？ test (？ a ,？ b ,？ c ,？ *p){
    edx = p;
    ax = a; // a 8b -> char movsbw 符号扩展， 8 ->16  a为char ；
    *p = ax; //有符号的16位， *p为short
    eax = b; //movzwl无符号扩展  16位0扩展到32位， b是unsigned short
    ecx = c; //movzwl无符号扩展    c是unsigned short
    eax = b * c; // b c 都是无符号类型(扩展到了32位)， 乘积也是无符号类型， 返回类型为unsigned int
}
unsigned int test (char a ,unsigned short b ,unsigned short c ,short *p){
    *p = a;
    return b*c;
}
```



![image-20241226143940911](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202412261439036.png)



## 18

![image-20241225215701342](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202412252157407.png)

### 解析

```c
addr x : ebp - 4;
addr y : ebp - 8;
```



```c
push ebp;  //save the old ebp  esp = 0xbc00 0020+4 ebp =0xbc00 0030
ebp = esp; // create a new ebp esp == , ebp = 0xbc00 0020+4
esp -= 40; //new 10 units
eax = ebp - 8 = y; 
esp + 8 =eax = y;// esp + 8 = ebp -32;
eax = ebp -4 = x;
esp + 4 = eax = x;
push $.LCO;
call scanf;
eax = ebp - 4 = x;
eax = eax - (ebp - 8) = x - y;
    
```



1

```c
3: R[ebp] = 0xbc00 001c;
10: R[ebp] = 0xbc00 001c;// ebp 没有改变
13: R[ebp] = *(0xbc00 0020) = 0xbc00 0030//leave，离开funct函数，ebp恢复旧址
```

2

```c
3:R[esp] = 0xbc00 001c;
10:R[esp] = 0xbbff fff0;
13:R[esp] = 0xbc00 0020;
```

3

```c
x:0xbc00 0018;
y:0xbc00 0014;
```

4

> `leal (%eax), %ebx`：将eax的值的地址  复制到ebx
>
> `leal (%eax,%ebx), %ebx` ebx = eax + ebx

![image-20241226162554269](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202412261625331.png)

## 19

![image-20241130220026002](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202411302200030.png)

![image-20241130220041709](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202411302200738.png)

### 解析

> test 指令结果改变ZF寄存器；
>
> test a , a
>
> je lable
>
> 检测a是否为0，如果a为0 ,ZF=1, jump if equal (ZF =1),跳转到label

```c
refunc(x){
    ebx = ebp + 8;// ebx = x;
    eax = 0;
    if(ebx ==0){ // if x ==0 ,return ? 
        //L2
        return 0;//返回值都会用eax存储，说白了就是返回eax，如果x开始就为0，那么eax =0,返回0
    }
    else{
        eax = ebx;//eax = x; (x!=0)
        eax = eax >>1;
        push eax; //push x>>1, 本质是为下一个函数传参，也就是说下一次递归的x 为x>>1
        refunc(eax);  // 返回eax = refunc(eax>>1) = eax = refunc(x>>1);
        edx = ebx; //递归结束后
        edx = edx & 0x1;
        eax = eax + edx;//return eax+x&0x1  =return refunc(x>>1) + x&1;
    }
    return eax;
}

```

每次的递归都会使x 右移一位，直到x为0为止，说明在对x的每一位都进行检验；

因为会对x进行移位操作，我们写出x的二进制形式：

> 假设x为：1 , 1B
>
> refunc(1B)-> [x!=0 -> refunc(1>>1 = 0)=refunc(0) -> eax = 0+ 1&0x1] ->eax =1;  x=1
>
> refunc(10B) ->[x!=0 -> refunc(10>>1 = 1)=refunc(1) -> eax = 1+ 10&01] ->eax =1 ; x=2
>
> refunc(11B) ->[x!=0 -> refunc(11>>1 = 1)=refunc(1) -> eax = 1+ 11&01] ->eax =2 ; x=3
>
> refunc(111B) ->[x!=0 -> refunc(111B>>1 = 11B)=refunc(11B) -> eax = 2+ 111&01] ->eax =3 ; x=7
>
> …
>
> 所以可以得出,refunc(x)是在计算x的二进制形式中的1的数量

```c
int refunc(unsigned x){
    if(x==0){
        return  0;
    }
    unsigned nx = x>>1;
    int rv = refunc(nx);
    return rv + x&0x1;
}
```







## 20

![image-20241226191707830](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202412261917947.png)

### 解析

| array              | size of element /B | size of array /B | base addr | addr of element i |
| ------------------ | ------------------ | ---------------- | --------- | ----------------- |
| char A[10]         | 1                  | 10               | &A[0]     | &A[0] + i         |
| int B[100]         | 4                  | 400              | &B[0]     | &B[0] + 4*i       |
| short *C[5]        | 4                  | 20               | &C[0]     | &C[0] + 4*i       |
| short **D[6]       | 4                  | 24               | &D[0]     | &D[0] + 4*i       |
| long double E[10]  | **12**             | 120              | &E[0]     | &E[0] + 12*i      |
| long double *F[10] | 4                  | 40               | &F[0]     | &F[0] +  4*i      |



## 21

![image-20241130220055334](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202411302200371.png)



### 解析

```c
edx = As;//base   short *
ecx = i;//index   int
offset = i*size =2*i;
size = sizeof(short) =2;
```

| expression   | type    | value                  | assembly                     |
| ------------ | ------- | ---------------------- | ---------------------------- |
| S            | short * | As                     | leal (%edx),%eax             |
| S + i        | short * | As + 2*i               | leal (%edx,%ecx,2),%eax      |
| S[i]         | short   | M[As+2*i]              | movw (%edx,%ecx,2),%ax       |
| &S[10]       | short * | As + 20                | leal 20(%edx),%eax           |
| &S[i+2]      | short * | As+2\*(i+2) =As+2\*i+4 | leal 4(%edx,%ecx,2),%eax     |
| **&S[i] -S** | **int** | **2*i /2 = i**         | movl %edx , %eax             |
| S[4*i+4]     | short   | M[As+8*i+8]            | **movw 8(%edx,%ecx,8),%ax**  |
| *(S+i-2)     | short   | M[As+2*i-4]            | **movw -4(%edx,%ecx,2),%ax** |

> 特别注意&S[i] -S = i， 实际上&S[i] = As + 2\*i, S=As, As + 2\*i - As =2\*i  , 因为并不是对数组进行索引，所以编译器会对结果进行处理，除以size  , 2*i /2 =i
>







## ==22==

![image-20241125181050624](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202411301639401.png)

![image-20241125181125511](C:/Users/86182/AppData/Roaming/Typora/typora-user-images/image-20241125181125511.png)

### 解析

```c
ecx = i;
edx = j;

res = 8*i;
res -= i;
res += j;
==>res =7*i + j;
j = 5*j;
j +=i;
==>j = 5*j+i;
res = a[res][0];
==>res = M(a+7*i + j)
res += b[j];
==>res = M(a+7*i + j)+M(b+5*j+i);

7*i+j = i*N+j;  N=7
5*j+i = j*M+i;  M=5
```





## ==23==



![image-20241125181222024](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412021801630.png)

### 解析

```c
ecx = i;
edx = j;

j = 9*j;
res = i;
res <<=6;//res *=64;
res -=i;
==>res =63*i, j=9*j
j += res;
==>j = 9*j+63*i , res = 63*i
j += k;
==>j = 9*j+63*i+k,  res = 63*i
res = a + j;
==>res =a+9*j+63*i+k , j = 9*j+63*i+k
j = *dst; //if dst = &dst  ==> res = a+i*M+j*N+k
M[j] = res;//  *dst = a[i][j][k] = a+i*M*N+j*N+k
res = 4536;//sizeof (a) =4536 ,4536/4= 1134 = L*M*N

1134 = L*M*N;   =>L
res = a+i*M*N+j*N+k;  =>M,N
res =a+9*j+63*i+k; =>M*N =63 , N = 9 ,M =7
L=18 , M=7 , N=9
```

### Something need to think

![image-20241204105119186](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412041051276.png)





## 28



![2024-12-21-17-32-33](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202412211732725.png)

### 解析

| var           | size | offset (addr) |
| ------------- | ---- | ------------- |
| char c        | 1    | 0             |
| 0double d     | 8    | 8             |
| int   i       | 4    | 16            |
| short s       | 4    | 20            |
| char *p       | 4    | 24            |
| long l        | 4    | 28            |
| long long g 8 | 8    | 32            |
| void *v       | 4    | 40            |

long double 12B

![image-20241226204917526](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202412262049578.png)

总计大小  48B









> 如何使得总体占位最小：
>
> 从大size变量放在低地址（先声明）， 小放在高地址，后声明

![image-20241226205321126](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202412262053181.png)

| var         | size | offset (addr) |
| ----------- | ---- | ------------- |
| char c      | 1    | 34            |
| double d    | 8    | 0             |
| int   i     | 4    | 16            |
| short s     | 4    | 32            |
| char *p     | 4    | 20            |
| long l      | 4    | 24            |
| long long g | 8    | 8             |
| void *v     | 4    | 28            |

总计大小： 40B

