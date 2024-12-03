---
layout: post
title: Turing Complete全流程攻略
date: 2024-10-16
tags:
  - TuringComplete
---









# 迷宫

```assembly
#宏
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
