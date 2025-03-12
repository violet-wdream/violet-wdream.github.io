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

### 地面/墙体监测

角色作为父级，创建两个空的子对象WallCheck和GroundCheck

![image-20250302231810372](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202503022318420.png)

player脚本声明以下成员

```c#
[Header("Collision info")]
[SerializeField]private Transform groundCheck;
[SerializeField]private Transform wallCheck;
[SerializeField]private float groundCheckRadius = 0.2f;
[SerializeField]private float wallCheckRadius = 0.2f;
[SerializeField]private LayerMask whatIsGround;
```

在Inspector中绑定groundCheck和wallCheck

![image-20250302232029435](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202503022320469.png)

将地面图层设置为Ground（初次使用需要添加图层Ground）

![image-20250302233907462](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202503022339489.png)

Inspector中将Player的whatIsGround设置为Ground

![image-20250302234012920](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202503022340953.png)



绘图方法OnDrawGizmos

```c#
private void OnDrawGizmos()
{
    //Gizmos.DrawLine(groundCheck.position, new Vector3(groundCheck.position.x, groundCheck.position.y + groundCheckRadius));//向上画线
    Gizmos.DrawLine(groundCheck.position, new Vector3(groundCheck.position.x, groundCheck.position.y - groundCheckRadius));//向下画线
    //Gizmos.DrawLine(wallCheck.position, new Vector3(wallCheck.position.x - wallCheckRadius, wallCheck.position.y));//向左画线
    Gizmos.DrawLine(wallCheck.position, new Vector3(wallCheck.position.x + wallCheckRadius, wallCheck.position.y));//向右画线
}
```

调整划线的位置直到与地面/墙面接触

![image-20250302233700912](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202503022337948.png)

player.cs

```c#
public bool IsGroundedDetected()
{
    return Physics2D.Raycast(groundCheck.position, Vector2.down, groundCheckRadius, whatIsGround);
}
```

playerGroundedState.cs

```c#
public override void Update()
{
    base.Update();
    //如果人物在地面上，且按下跳跃键，那么切换到跳跃状态
    if (jumpInput && player.IsGroundedDetected())
    {
        stateMachine.ChangeState(player.jumpState);
    }
}
```

### 墙上滑行/跳跃

```c#


```





### 冲刺

player.cs

```c#
[Header("Dash info")]
public float dashSpeed = 8f;
public float dashTime = 1f;
public float dashTimer;
public float dashCoolDown = 2f;
public bool isDashCoolDown ;
```

可以从任意状态转换到dash状态（包括空中）

playerState.cs

```c#
protected float stateTimer;
public virtual void Update()
{
    dashInput = Input.GetKeyDown(KeyCode.LeftShift);
    if (player.dashTimer > 0)
        player.dashTimer -= Time.deltaTime;
    else
    {
        player.dashTimer = player.dashCoolDown;
        player.isDashCoolDown = false;
    }
    if(dashInput && !player.isDashCoolDown)
    {
        stateMachine.ChangeState(player.dashState);
    }
}
```

playerDashState.cs

```c#
public override void Enter()
{
    base.Enter();
    player.isDashCoolDown = true;
    //开始计时(冲刺持续时间)
    stateTimer =  player.dashTime;
    //设置dash冷却计时器，冷却时间结束后，可以再次dash
    player.dashTimer = player.dashCoolDown;
}
public override void Update()
{
    base.Update();
    //设置dash速度,冲刺时保持角色y轴不变
    player.SetVelocity(player.facingDir * player.dashSpeed, 0);
    //如果dash时间结束，那么切换到idle状态
    stateTimer -= Time.deltaTime;
    if (stateTimer <= 0)
    {
        stateMachine.ChangeState(player.idleState);
    }
}
```

### 动画中添加事件

添加事件

![image-20250305212601807](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202503052126888.png)

Player.cs

```c#
public void AnimationTrigger() => stateMachine.currentState.AnimationFinishTrigger();
```

PlayerState.cs

```c#
protected bool triggerCalled;
public virtual void Enter()
{
    triggerCalled = false;
}
public virtual void AnimationFinishTrigger()
{
    triggerCalled = true;
}
```

PlayerAnimationTriggers.cs

```c#
public class PlayerAnimationTriggers : MonoBehaviour
{
    private Player player => GetComponentInParent<Player>();
    private void AnimationTrigger() => player.AnimationTrigger();
}
```

PlayerAttackState.cs

```c#
public override void Update()
{
    //如果触发器被调用（动画播放完毕），那么切换到idle状态
    if (triggerCalled)
    {
        stateMachine.ChangeState(player.idleState);
    }
}
```

将脚本PlayerAnimationTriggers.cs绑定到Animator上

![image-20250305213152028](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202503052131088.png)

点击事件查看Inspector

![image-20250305213024595](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202503052130636.png)



Function > PlayerAnimationTriggers > Methods > AnimationTrigger

![image-20250305213058188](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202503052130242.png)

同理playerAttack2  ，playerAttack3都要加

保存

## 有限状态机

工作流程：Player脚本绑定在角色身上，通过Awake和Start函数完成对成员的构造、获取组件以及初始化，通过Update持续监测当前状态（调用PlayerState类/派生类的Update方法）是否需要改变为其他状态（PlayerStateMachine脚本通过ChangeState方法将currentState修改为其他状态）

在PlayerState类的Enter方法中设定将Animator对应的flag设定为true，此时Animator会从Entry转换到某一个clip，然后在Exit方法中设定为false，此时Animator退出当前clip回到默认clip（Idle）

### Player

```c#
using System;
using UnityEngine;

public class Player : MonoBehaviour
{
    public PlayerStateMachine stateMachine { get; private set; }
    public PlayerIdleState idleState { get; private set; }
    public PlayerMoveState moveState { get; private set; }
    
    public Rigidbody2D rb { get; private set; }
    public Transform tf { get; private set; }
    public Animator anim { get; private set; }
    
    public float moveSpeed = 5f;
    private void Awake()
    {
        stateMachine = new PlayerStateMachine();
        idleState = new PlayerIdleState("idle", stateMachine, this);
        moveState = new PlayerMoveState("move", stateMachine, this);
        rb = GetComponent<Rigidbody2D>();
        tf = GetComponent<Transform>();
        anim = GetComponentInChildren<Animator>();
    }
    private void Start()
    {
        stateMachine.Initialize(idleState);
    }
    private void Update()
    {
        stateMachine.currentState.Update();
    }
}

```

### PlayerStateMachine

```c#
using UnityEngine;

public class PlayerStateMachine
{
    public PlayerState currentState { get; private set; }
    
    public void Initialize(PlayerState startState)
    {
        currentState = startState;
        currentState.Enter();
    }
    public void ChangeState(PlayerState newState)
    {
        currentState.Exit();
        currentState = newState;
        currentState.Enter();
    }
}

```



### PlayerState

```c#
using UnityEngine;
using System.Collections;

public class PlayerState
{
    protected PlayerStateMachine stateMachine;
    protected Player player;
    private string animBoolName;
    
    public PlayerState(string animBoolName, PlayerStateMachine stateMachine, Player player)
    {
        this.animBoolName = animBoolName;
        this.stateMachine = stateMachine;
        this.player = player;
    }
    public virtual void Enter()
    {
        player.anim.SetBool(animBoolName, true);
    }
    public virtual void Update()
    {
    }
    public virtual void Exit()
    {
        player.anim.SetBool(animBoolName, false);
    }
}
```



### PlayerIdleState

```c#
using UnityEngine;

public class PlayerIdleState : PlayerState
{
    public PlayerIdleState(string animBoolName, PlayerStateMachine stateMachine, Player player) : base(animBoolName, stateMachine, player)
    {
        //调用基类的构造函数
    }

    public override void Enter()
    {
        base.Enter();
    }

    public override void Update()
    {
        base.Update();
        ////跳出状态接口
        if (Input.GetKeyDown(KeyCode.Space))
        {
            stateMachine.ChangeState(player.moveState);
        }
    }

    public override void Exit()
    {
        base.Exit();
    }
}

```



### PlayerMoveState

```c#
using UnityEngine;

public class PlayerMoveState : PlayerState
{
    public PlayerMoveState(string animBoolName, PlayerStateMachine stateMachine, Player player) : base(animBoolName, stateMachine, player)
    {
        //调用基类的构造函数
    }

    public override void Enter()
    {
        base.Enter();
    }

    public override void Update()
    {
        base.Update();
        //跳出状态接口
        if (Input.GetKeyDown(KeyCode.Space))
        {
            stateMachine.ChangeState(player.idleState);
        }
    }

    public override void Exit()
    {
        base.Exit();
    }
}

```

### 添加其他状态

1. 设置动画和对应过渡参数（可选）

2. 一般继承PlayerState，在player.cs中添加对应state公有成员

3. Awake()中初始化state，如：

   ```
   wallSlideState = new PlayerWallSlideState("wallSlide", stateMachine, this);
   ```

   animBoolName取决于Animator中入口参数

   ![image-20250305111838009](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202503051118095.png)

4. 考虑哪个状态可以过渡到目标状态，在Update中添加监测条件

   ```c#
   if(player.IsWallDetected() && !player.IsGroundedDetected(1.0f))
   {
       stateMachine.ChangeState(player.wallSlideState);
       //取消当前帧Update后续程序段
       return;
   }
   ```
   
   
