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
更新中。。。2024-12-03

![image-20241130215506866](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412021738679.png)

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
后缀l，源：基址+变址+偏移 目的：寄存器
    
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

```
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
eax = x;edx = ptr;
movsbl %al, (%edx) ; 8 - 32 s
movb %al, (%edx) ; 32 - 8   
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



## 8

![image-20241130215845626](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202411302158666.png)

### 解析

```c

```







## 10

![image-20241130215914233](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202411302159269.png)





## 11

![image-20241130215901665](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202411302159701.png)

![image-20241130215925774](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202411302159796.png)

## 14

![image-20241130215942200](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202411302159228.png)

![image-20241130215953476](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202411302159512.png)



## 17

![image-20241130220004768](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202411302200797.png)



## 19

![image-20241130220026002](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202411302200030.png)

![image-20241130220041709](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202411302200738.png)



## 21

![image-20241130220055334](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202411302200371.png)

## 22

![image-20241125181050624](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202411301639401.png)

![image-20241125181125511](C:/Users/86182/AppData/Roaming/Typora/typora-user-images/image-20241125181125511.png)

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





## 23



![image-20241125181222024](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412021801630.png)



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







