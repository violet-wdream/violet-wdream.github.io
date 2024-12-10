---
layout: post
title: Unity 2D chatper 0-- Demo
date: 2024-12-08
tags:
  - Unity2D
---
# 地图

## Creat

Creat -> 2D object -> Tilemap -> Rectangle 

## Layer

![image-20241013103837544](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102204682.png)

## Add component

![image-20241013101532878](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102204475.png)

- Tilemap Collider 2D

  ![image-20241013101651791](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102204690.png)

- Rigidbody 2D

  ![image-20241013101811746](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102204602.png)

- Composite Collider 2D

## 画板Palette 

### Edit

Find the Asserts-> Terrian, and adjust the size (100->16, Pixels Per Unit), use Sprite Editor to edit it.

![image-20241013103048679](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102204225.png)



### Add Tile Palette 

windows-> 2D -> Tile Palette   -> Create New Palette

![image-20241013103407176](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102205124.png)

Import: **Drag** the Terrian asserts to the Palette 

# 背景

A new tilemap the Copyies TileMap and we’ll rename it as ‘background’.

In addition, we won’t attach any component to  it.

## Layer

The layer of it should be the minium.

![image-20241013104208707](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102208237.png)

## Palette 

Just as the TileMap, we should adjust the size of assert. 

![image-20241013104446468](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102209319.png)

PPU 越小，图像越大

![image-20241013104612900](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102209434.png)

Import: **Drag** the Terrian asserts to the Palette 

# 玩家Player

![image-20241013104805918](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102209409.png)

## Creat

Creat -> 2D object -> Sprites -> Rectangle…

## Add  Component

![image-20241013105021563](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102209904.png)

- Rigidbody 2D

![image-20241013105115075](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102209761.png)

- Box Collider 2D or other … Capsule …

  Use this button to edit the box.

![image-20241013105256848](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102209052.png)

## Add Script

### Creat -> C# Script  -> name

![image-20241013105427459](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102209826.png)



### Add a PlayerMovement component 

PlayerMovement.cs

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEditor.UIElements;
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    //public -> we can edit it in inspector
    private Animator anime;
    private Rigidbody2D rb;
    //[SerializeField] -> we can edit the var in inspector but it is private
    [SerializeField] private float movespeed;
    [SerializeField] private float jumpforce;
    [SerializeField] private bool isMoving;
    private LayerMask ground;
    private float xInput;
    private bool isGrounded;

    void Start()
    {
        //initalizaion 
        rb = GetComponent<Rigidbody2D>();
        anime = GetComponentInChildren<Animator>();
    }

    void Update()
    {
        move();
        isMoving= rb.velocity.x!= 0;
        anime.SetBool("IsMoving", isMoving);
    }
    void move()
    {
        //left/right movement 
        xInput = Input.GetAxis("Horizontal");
        //new a Vector2 to edit rb.velocity 
        rb.velocity = new Vector2(xInput * movespeed, rb.velocity.y);
		
        //jump 
        if (Input.GetButtonDown("Jump"))
        {
            //Debug.Log("Jump");
            isGrounded = Physics2D.OverlapCircle(transform.position, 0.2f, ground);
            if (true)//
            {
                jump();
            }
        }
    }
    void jump()
    {
        isGrounded = false;
        rb.velocity = new Vector2(rb.velocity.x, jumpforce);
    }
}

```

Then we should add it to Player as a component 

![image-20241013110436217](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102209658.png)



## ==Animation==

### 1.Creat

Creat an Empty object under the Player  and name it as Animator.

![image-20241013110806385](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102210058.png)

Then we should delete the Player Sprites Renderer and add it to Animator

![image-20241013110957710](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102210054.png)

![image-20241013111009970](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102210907.png)

And you can edit the Sprite from all your asserts 

![image-20241013111103059](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102210765.png)

### 2.Window

window->Animation -> Animation

![image-20241013111611791](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102210441.png)

window->Animation -> Animator

![image-20241013111710411](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102210160.png)

### 3.Creat  Controller /Anim 

creat -> Animation Controller 

![image-20241013111921764](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102211759.png)

Import: Drag it to Animator

![image-20241013112042844](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102211393.png)



Creat anim  (click Animator)

![image-20241013112444674](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102211319.png)

![image-20241013112223376](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102211735.png)

if you have already a anim, creat new clips

![image-20241013112412084](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102211579.png)

then we can add animation frames to .anim(Shift+click, drag them to the linebox ), and adjust the **Samples** to balance the speed

![image-20241013112731373](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102211730.png)

### 4.Transition

As you can see, we have different animation, but how can we use them? 

![image-20241013113134701](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102211055.png)

**==Set Parameters==**:

![image-20241013113418500](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102212403.png)

Right-clik the object module and make transition to other modules:

![image-20241013113820291](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102212089.png)

Inspect the transition, add conditions

![image-20241013114733561](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102212583.png)

cancel the duration:

![image-20241013115324675](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102212600.png)



**==Edit Script==:**

```c#
private Animator anime;//
void Start()
{
	//...
    anime = GetComponentInChildren<Animator>();//
}
void Update()
{
    //...
    isMoving= rb.velocity.x!= 0;
    anime.SetBool("IsMoving", isMoving);//assign isMoving to IsMoving 
}
```

## Flip

```c#
private int facingdir = 1;
private bool isFacingRight = true;

private void FlipController()
{
    if( rb.velocity.x *facingdir < 0)
        Flip();
}   
private void Flip()
{
    transform.Rotate(0, 180, 0);
    facingdir *= -1;
    isFacingRight = !isFacingRight;
}
```



## ==CollisionChecks  /StickPlatform==

```c#
[Header("Collision info")]
[SerializeField] private LayerMask groundLayer;
[SerializeField] private float groundCheckRadius;
private bool isGrounded;

private void CollisionChecks()
{
    isGrounded = Physics2D.Raycast(transform.position, Vector2.down, groundCheckRadius, groundLayer);
}
private void OnDrawGizmos()
{
    Gizmos.DrawLine(transform.position, 
                    new Vector3(transform.position.x, transform.position.y - groundCheckRadius)); 
}
```

Adjust the Radius until the line touches the ground

![image-20241013220053698](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102212808.png)

![image-20241013220206499](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102214005.png)

Set the layer of the TileMap as ground and edit the parameters of Player

![image-20241013220419897](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102214389.png)

![image-20241013220450368](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102214926.png)

### 已经弃用，换碰撞开关简单一点：

为Tilemap 设置碰撞箱。添加Composite Collider 2D组件，设置Tag = Ground

```c#
private void OnCollisionEnter2D(Collision2D collision)
{
    if (collision.gameObject.CompareTag("Ground"))
    {
        isGrounded = true; // 在地面
    }
}

private void OnCollisionExit2D(Collision2D collision)
{
    if (collision.gameObject.CompareTag("Ground"))
    {
        isGrounded = false; // 离开地面
    }
}
```



StickyPlatform.cs

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class StickyPlatform : MonoBehaviour
{
    //触发碰撞
    private void OnTriggerEnter2D(Collider2D collison)
    {
        //将碰撞体设置为自己的子物体
        if(collison.gameObject.tag == "Player")
        {
            collison.gameObject.transform.SetParent(transform);
        }
    }
    //碰撞结束
    private void OnTriggerExit2D(Collider2D collison)
    {
        //将碰撞体的父级置空
        if (collison.gameObject.tag == "Player")
        {
            collison.gameObject.transform.SetParent(null);
        }
    }
}

```



## 墙附着问题Sticky Walls  

Creat -> 2D -> Physics 2D material ->Friction ->0

![image-20241015103102028](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102214927.png)

![image-20241015103118781](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102215382.png)

Drag the material to Player Rigidbody material

![image-20241015103041008](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102215489.png)

## 物品收集器ItemCollector & UI Text

Creat-> UI -> Legacy -> Text 

![image-20241015103436379](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102215313.png)

Install a Font from web  

![image-20241015103514491](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102215560.png)

Add Script to Player

![image-20241015103626355](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102216876.png)

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;//**
public class ItemCollector : MonoBehaviour
{
    private int apples = 0;
    [SerializeField] private Text appleText;
    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.gameObject.CompareTag("Apple"))
        {
            apples++;
            appleText.text = "Apples: "+apples;
            Destroy(collision.gameObject);
        }
    }
}
```

Edit the Item Trigger and Tag (**Apple**)

![image-20241015103852125](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102216908.png)

Adjust the text window position

![image-20241015104137448](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102216256.png)



## Death & Restart

Creat a Spike Trap just like Apple  and set it Tag as **Trap** 

![image-20241015132321880](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102216786.png)

PlayerDeath.cs

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;//
using UnityEngine.SceneManagement;//
public class PlayerLife : MonoBehaviour
{
    private Animator anime;
    private Rigidbody2D rb;
    [SerializeField] private Text deathText;
    void Start()
    {
        rb = GetComponent<Rigidbody2D>();
        anime = GetComponentInChildren<Animator>();
    }
    private void OnTriggerEnter2D(Collider2D collision)
    {

        if (collision.gameObject.CompareTag("Trap"))
        {
            Death();
        }
    }
    
    private void Death()
    {
        rb.bodyType = RigidbodyType2D.Static;
        deathText.text = "Game Over\nPress R to restart";
        anime.SetTrigger("Death");//
    }
}
```

ReStart.cs  绑定到Animator通过Animation触发

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class ReStart : MonoBehaviour
{
   
    private void Restart()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }
}

```

Apply the Script to Player and Animator 

![image-20241015140814982](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102216112.png)

![image-20241015143000584](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102216640.png)



Death **Animation**

- Record the key frame by cancel the Sprite Renderer 
- Add event Restart and bind it with Function Restart()

![image-20241015143255128](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102216699.png)

![image-20241015143430567](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102216717.png)









# 平台Platform

![image-20241016220258832](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102217956.png)

![image-20241016220316383](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102217857.png)

两层碰撞箱，一层（外层is Trigger）用于Stick，另一层（内层）用于承载角色

![image-20241016220421211](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102217768.png)



![image-20241016220540276](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102217910.png)

WayPoints.cs

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class WayPointSaw : MonoBehaviour
{
    [SerializeField] private GameObject[] wayPoints;
    private int currentWaypointIndex = 0;
    [SerializeField] private float speed = 5f;
 
    void Update()
    {
        if(Vector2.Distance(wayPoints[currentWaypointIndex].transform.position, transform.position) < 0.1f)
        {
            currentWaypointIndex = (currentWaypointIndex + 1) % wayPoints.Length;
        }
        transform.position = Vector2.MoveTowards(transform.position, wayPoints[currentWaypointIndex].transform.position, speed * Time.deltaTime);
    }
}
```

StickyPlatform.cs

```rust
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class StickyPlatform : MonoBehaviour
{
    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.gameObject.CompareTag("Player")) // 使用标签而非名字
        {
            collision.transform.SetParent(transform); 
        }
    }

    private void OnTriggerExit2D(Collider2D collision)
    {
        if (collision.gameObject.CompareTag("Player"))
        {
            collision.transform.SetParent(null); // 解除玩家与中间物体的父子关系
        }
    }
}

```





# BGM/音效

## BGM

下载音乐资源：

Casual game sounds

创建空物体，添加组件Audio Source，绑定音效/BGM

## 音效

在角色身上添加组件Audio Source，绑定音效/BGM

```c#
[SerializeField] private AudioSource jumpSound;  //在监视器内绑定Audio Source
private void jump()
{
    if(isGrounded)
    {
        rb.velocity = new Vector2(rb.velocity.x, jumpforce);
        jumpSound.Play();
    }
}
```

其余音效同理

# 场景跳转

将需要的场景添加到BuildSettins （File）调整顺序

![image-20241019195044559](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102217608.png)

跳转脚本，可以通过Button触发或者通过碰撞事件：

按钮： 触发事件需要绑定为按钮对象，同时设定触发函数为Startmenu里面的StartGame函数

![image-20241207112643260](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102217479.png)

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class StartMenu : MonoBehaviour
{
   public void StartGame()
   {
       // Start the game
       SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 1);
   }        
}
```

碰撞事件：

```c#
private void OnTriggerEnter2D(Collider2D collision)
{
    if (collision.gameObject.tag == "Player" && !levelComplete)
    {
        audiences.Play();
        levelComplete = true;
        Invoke("NextLevel", 1f);  //1s delay
    }

}
private void NextLevel()
{
    SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 1);
}       
```





# 物体循环移动

## 普通左右移动：

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Windows;

public class PlatformMovement : MonoBehaviour
{
    // Start is called before the first frame update
    private Animator anime;
    private Rigidbody2D rb;
    [SerializeField] private float speed=2f;
    private int direction = 1 ;
    void Start()
    {
        rb=GetComponent<Rigidbody2D>();
        anime=GetComponent<Animator>();
    }
    
    // Update is called once per frame
    void Update()
    {
        if (transform.position.x <= 4f )
            direction = 1;
        else if (transform.position.x >= 10f)
            direction = -1;
        move();
    }
    private void move()
    {
       rb.velocity=new Vector2(direction*speed,0);
    }
}

```

优点是简单好写，缺点是可移植性差，需要反复改坐标



## 设置路径点：

在监视器内设置路径点（空物体），可设置多个路径点，甚至可以朝玩家飞过来

```c#

[SerializeField] private GameObject[] wayPoints;
private int currentWaypointIndex = 0;
[SerializeField] private float speed = 5f;

void Update()
{
    if(Vector2.Distance(wayPoints[currentWaypointIndex].transform.position, transform.position) < 0.1f)
    {
        currentWaypointIndex = (currentWaypointIndex + 1) % wayPoints.Length;
    }
    transform.position = Vector2.MoveTowards(transform.position, wayPoints[currentWaypointIndex].transform.position, speed * Time.deltaTime);
}
```



![image-20241019200536541](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102218597.png)

用Ctrl D 可以直接复制一份路径点，拖动即可。**把路径点的y值设得比物体低一点，可以减少抖动问题。**

> 值得注意的是，这样写只是在不断改变  transform.position   ，实际上物体的速度是0

![image-20241019200642119](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412102218757.png)

**改变速度实现移动**

```rust
private void move()
{
    // 获取当前目标路径点的位置
    Vector3 targetPosition = wayPoints[currentWaypointIndex].transform.position;
    if (Vector2.Distance(wayPoints[currentWaypointIndex].transform.position, transform.position) < 0.2f)
    {
        currentWaypointIndex = (currentWaypointIndex + 1) % wayPoints.Length;
    }
    Vector2 direction = (targetPosition - transform.position).normalized;
    // 移动角色
    rb.velocity = new Vector2(direction.x * moveSpeed, rb.velocity.y);
}
```



# 利用静态对象继承属性

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
public class AllControl : MonoBehaviour
{
    public class GameManager 
    { 
        private static GameManager instance;
        public static GameManager Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new GameManager();
                }
                return instance;
            }
        }
        public int score = 0;
    }          
}

```



## 用法:

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using static AllControl;// 声明
public class ItemCollector : MonoBehaviour
{
    private int apples = GameManager.Instance.score;//GameManager为AllControl里面的静态实例，可以通过这个方法来实现全局，以及跨文件调用
    [SerializeField] private Text appleText;
    [SerializeField] private AudioSource audioSource;
    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.gameObject.CompareTag("Apple"))
        {
            Apple();
            Destroy(collision.gameObject);
        }
    }
    private void Apple()
    {
        apples++;           
        appleText.text = "Apples: " + apples;
        audioSource.Play();
        GameManager.Instance.score = apples;//
    }
}

```

