---
layout: post
title: Turing Complete全流程攻略
date: 2024-10-16
tags:
  - TuringComplete
---









# 迷宫

```assembly
r#宏
forward 1
left 0
right 2
wall 1
imm 0
cp
sub
je0
jne0
jump
```




```assembly
label Find
imm|forward
cp|0|out#forward

imm|left
cp|0|out#left

cp|in|1#get obj
imm|wall
cp|0|2#reg1(obj) - reg2(wall) ->reg3
sub
notWall
jne0#if obj!=wall jmp

#obj==wall
#while(obj==wall) right;
imm|right
cp|0|4#reg4 = right
label turnR
cp|4*8|out#turn right
cp|in|1#get obj
imm|wall
cp|0|2
sub
turnR
je0#if obj==wall right

label notWall
imm|4
cp|0|out
Find
jump
```





# LEG架构

## AI打牌

```assembly
4;-3;win
5;lose
6;-1;win
7;-2;win
8;-3;win
9;lose
10;-1;win   1010
11;-2;win   1011
12;-3;win   1100 
...;
1lose 5lose 9lose... 1+4*n;
m= x+1+(4*n)  1<=x<=3
x= m-1-4*n
REG1--;
REG1 -=REG2  UNTIL REG1 < 4

label while
MOV IN NULL REG1
IMM2|SUB REG1 1 REG1
label loopsub4
IMM2|IF_L REG1 4 break
IMM2|SUB REG1 4 REG1
JMP NULL NULL loopsub4 
label break  
MOV REG1 NULL OUT
JMP NULL NULL while


```

![image-20241205164045767](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412051640794.png)



## 除法

```c
label INPUT
MOV IN NULL REG1
MOV IN NULL REG2
label SUBTAG
IF_L REG1 REG2 break
SUB REG1 REG2 REG1 
IMM2|ADD REG3 1 REG3
IMM2|IF_GE REG1 0 SUBTAG
label break
MOV REG3 NULL OUT
MOV REG1 NULL OUT
JMP NULL NULL INPUT
```

## 新品上市

```c
l;
f;
l;
ffff;
l;
f;
r;
f;
11 10 4 9 5 6 7;
wait;
if(in!=92) goto break;
break;
travel stack; 
if(no same item) push;
else right and act then left;
goto wait;
```



# 移位



1. **第一级MUX（移位1位）：**

   - **控制信号**：`S[0]`

   - 功能：根据`S[0]`，决定输入数据是否左移1位。

     - 如果`S[0]=0`，数据不变。
   - 如果`S[0]=1`，数据左移1位，低位补0。
   
2. **第二级MUX（移位2位）：**

   - **控制信号**：`S[1]`

   - 功能：基于第一级的输出，再决定是否左移2位。

     - 如果`S[1]=0`，数据保持不变。
   - 如果`S[1]=1`，数据左移2位，低位补0。
   
3. **第三级MUX（移位4位）：**

   - **控制信号**：`S[2]`

   - 功能：基于第二级的输出，决定是否左移4位。

     - 如果`S[2]=0`，数据保持不变。
- 如果`S[2]=1`，数据左移4位，低位补0。
