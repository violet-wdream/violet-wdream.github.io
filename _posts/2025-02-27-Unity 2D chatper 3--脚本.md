---
layout: post
title: Unity 2D chatper 3--脚本
date: 2025-02-27
tags:
  - Unity2D
---

# 脚本

## 新建脚本

选择对象  > 监视器 > 添加组件

![image-20250227101558983](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502271015013.png)

或者在文件夹中新建script文件

![image-20250227101841537](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502271018574.png)

给对象添加组件，选择新建的脚本PlayerMove

![image-20250227102017685](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502271020717.png)



## 功能

### 移动

获取水平移动输入，提供水平方向速度

```c#
public class PlayerMove : MonoBehaviour
{
    private Rigidbody2D rb;
    [SerializeField]private float speed = 5.0f;
    void Start()
    {
        //获取组件
        rb = GetComponent<Rigidbody2D>();
    }
    void Update()
    {
        //获取输入
        var xInput = Input.GetAxis("Horizontal");
        //修改速度
        rb.linearVelocity = new Vector2(xInput * speed, rb.linearVelocity.y);
    }
}
```



### 跳跃

默认空格为跳跃键，获取空格输入，水平速度保持不变，获取一个向上的速度

```c#
public class PlayerMove : MonoBehaviour
{
    private Rigidbody2D rb;
    [SerializeField]private float speed = 5.0f;
    void Start()
    {
        rb = GetComponent<Rigidbody2D>();
    }
    void Update()
    {
        //Input
        //Input.GetKey(KeyCode.Space)持续监测
        if (Input.GetKeyDown(KeyCode.Space))
        {
            rb.linearVelocity = new Vector2(rb.linearVelocity.x, speed);
        }
    }
}
```



