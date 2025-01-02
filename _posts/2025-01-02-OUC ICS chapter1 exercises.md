---
layout: post
title: 计算机系统基础ICS 第一章习题讲解
date: 2025-01-02
tags:
  - Course
  - ICS
  - homework
share: "true"
---



![image-20241226225936109](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202412262259137.png)



CPI * MIPS *10^6 = f   ，  f频率 是一个时钟周期的倒数，表示1s可以跑的时钟周期数；CPI是一条指令需要的时钟周期数； MIPS是1s可以跑的百万条指令数量

## 2

![image-20240923171722083](C:\Users\86182\AppData\Roaming\Typora\typora-user-images\image-20240923171722083.png)



1. 指令集
2. 计算机组织
3. 系统架构
4. 编译器









## 6

![image-20240923171740154](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202412262223054.png)

1

```c
P1： M1执行时间10000ms > M2执行时间5000ms 所以P1在M2上更快;
P2: M1 :3ms < M2 : 6ms  P2 在M1上更快
   
```

2

```c
M1： MIPS-P1 = 200*10^6/[(10^6)*10s] = 20MIPS
    MIPS-P2 = 300*10^3/(10^6)*3*10^-3 = 100MIPS;   
M2: MIPS-P1 = 150*10^6/5*10^6 = 30MIPS
    MIPS-P2 = 420*10^3/6*10^(-3)*10^6 = 70MIPS; 
    对于P2 ， M1速度快， 快30MIPS （43%）
```

3

```c
M1: T:1/800M = 1.25*10^-9 = 1.25ns ; CPI-P1= (10s/1.25ns)/2*10^8 = 40
M2: T:1/1.2G = 5/6 ns; CPI-P1 = (5s/(5/6ns))/1.5*10^8 = 40

```



## 7

![image-20240923171802720](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202412262223590.png)

(10\*6)\*MIPS \* CPI = f

1

```c
M1-MIPS = 1G/ (10^6 * 1) = 1000MIPS ;
M2-MIPS = 1.5G/(10^6 * 2) = 750MIPS ; 
```

2

```c
M1-CPI: (1+2+2+3+4)/5 = 2.4;
M2-CPI: (2+2+4+5+6)/5 = 3.8;
假设有N个指令 ，t1 = N*CPI1/f1 = 2.4N/1G  ;t2 = N*CPI2/ f2 = 3.8N/1.5G
M1 更快; 每条指令平均快0.13(ns)
```





## 8

![image-20241226213623084](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202412262136113.png)

```c
f1 = 1.25G ; f2 = 5/6 G;  设有N个指令
v1 = N*CPI1/f1 = 4N/1.25 = 3.2N; 
v2 = N*CPI2/f2 = 2N/ (5/6) = 2.4N;
M1快 每条指令平均快0.8ns
```





## 10

![image-20241226222315083](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202412262223120.png)

```c
S1: 10 ;
S2: 8;


S1: 5*1 + 2*2 +2*3 + 1*4 = 19;  19 /10 =1.9;
S2: 1*1 + 1*2 +1*3 + 5*4 = 10;  26 /8 = 3.25;

S1: 19/ 500M ;
S2: 26/ 500M ;

```





## 11

![image-20241226213633214](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202412262136241.png)

```c
f =1.2G;
t =12s;
CPI:5 -> 2;
t1 = 10s;
t - t1 =2s;
N = (2s*1.2G)/(CPI-CPI1) = 0.8*10^9 
    
```

