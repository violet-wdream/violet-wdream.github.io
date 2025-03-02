---
layout: post
title: Unity 2D chatper 1-- Unity组件
date: 2025-02-26
tags:
  - Unity2D
  - Palette
  - Tools
---

# Unity 2D chatper 1-- Unity组件

## Palette组件位置

Windows > 2D > Tile Palette 

![image-20250226084200643](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502260842693.png)

点击后会添加到右边的视窗中

![image-20250226084606227](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502260846288.png)

## Palette功能使用

![image-20250226084540724](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502260845774.png)

### 创建新的画板

左侧新建对象2D Object > Tilemap > Rectangle

![image-20250226084710213](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502260847237.png)

### 自定义参数

![image-20250226085900510](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502260859533.png)

1. Name

2. Grid：

   - Rectangle矩形

        ![image-20250226090223020](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502260902043.png)

      - Hexagon六边形

        ![image-20250226090142481](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502260901510.png)

      - Isometric等距视角

      - Isometric Z as Y等距视角Z映射为Y

        > **Isometric**：
        >
        > - 这种设置将 X 和 Y 轴映射到一个等距的斜视角。在这个视角下，X 和 Y 轴之间会有一个 30 度的角度，使得它们看起来是平行的，而 Z 轴（深度）则向下延伸，通常呈现为一个斜角。
        > - 适用于传统的等距视角游戏，游戏中的物体看起来就像是在斜面上放置一样。
        >
        > **Isometric Z as Y**：
        >
        > - 这个设置实际上是把 Z 轴当作 Y 轴来处理。它会将 Z 轴的深度数据直接用作 Y 轴的高度，从而实现一种不同的效果。
        > - 这个设置通常用来处理一些特殊的需求，尤其是在需要控制游戏物体的高度或层次关系时，或者希望 Z 轴的变动直接影响物体在视图中的“纵深”位置。

3. Cell size:

   单元格的大小，自动Automatic或者手动Manual

4. Sort mode:

   层级顺序

   

### 添加瓦片

将资源拖动到画板上

![image-20250226092109823](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502260921862.png)

   随后会提示你保存为.asset文件

![image-20250226092254907](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502260922937.png)

   .asset文件可以直接拖动到画板上

  

![image-20250226092418211](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502260924246.png)

###    编辑画板

   背景为蓝色说明开启了编辑模式，第一个按钮（编辑模式），第二个按钮为是显示背景格子

![image-20250226092536776](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502260925805.png)

- ####    选择模式

  ![image-20250226092755463](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502260927485.png)

  点击上方这个鼠标形状按钮会进入选中模式，然后点击格子单元，在Inspector中会显示选中的格子信息，点击Delete Selection可以删除这个格子

  ![image-20250226093053115](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502260930155.png)

- #### 移动模式

  ![image-20250226093630486](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502260936505.png)

  先使用选中模式选中需要移动的单元格（边框会变成黄色），点击上方这个四个方向箭头按钮会进入移动模式，然后就可以移动了

  ![image-20250226093824917](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502260938948.png)

  

![image-20250226093842964](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502260938992.png)

- #### 绘制模式

  右上角关闭编辑模式（背景变成灰色），此时可以左键选中区域

  ![image-20250226094155032](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502260941061.png)

  将鼠标移动到Scene中，当刷子用即可

![image-20250226094455443](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502260944473.png)

如果打开编辑模式，就可以用选中的区域覆盖画板。选择一片空的区域，并不会覆盖原来的画板单元格

![image-20250226094659036](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502260946065.png)

- #### 刷子模式

  类似于格式刷

  ![image-20250226095057580](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502260950604.png)

  此时可以左键选中区域，然后将鼠标移动到Scene中，此时虽然选中了多个格子，但是只会显示一个，因为多个格子堆叠在了一起。

  ![image-20250226095251886](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502260952917.png)

  当刷子使用，多画几下就懂了

  ![image-20250226095433527](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502260954560.png)

  此时如果打开编辑模式，也可以对画板进行相同操作。

- #### 擦除模式

  可以理解为用空的格子覆盖原有格子。点击后会自动选中2x2的空白格子区域。然后当刷子用就可以了，如果启动编辑模式，也可以把画板擦除

  ![image-20250226095640094](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502260956119.png)

- #### 泼水模式

  先用绘制选中一块区域

  ![image-20250226100133930](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502261001960.png)

  然后点击泼水模式

  ![image-20250226100256852](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502261002872.png)

  将鼠标移动到Scene中

  ![image-20250226100329573](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502261003604.png)



## 材料

邮件 - create - 2D - Physics Material 2D

![image-20250228165704059](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502281657143.png)

编辑材料

![image-20250228165925015](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502281659038.png)

为刚体添加材料

![image-20250228165907494](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502281659516.png)

## RigidBody2D

![image-20250228170436510](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502281704537.png)

1. Body Type:

   - Dynamic
   - Kinematic刚体（ **通过脚本控制运动的物体**）
   - Static静态
2. Material
3. Simulated
4. Used auto mass
5. Mass
6. Linear Damping：线性阻力（空气阻力）
7. Angular Damping
8. Gravity Scale：重力倍率
9. Collision Detection: 默认Continuous
10. Sleeping Mode: 默认Start Awake
11. Interpolate：默认Interpolate
12. Constraints:
    - Freeze X Y Z
13. 





## Animator

### 找到视窗

window - Animation- Animator

![image-20250301133446930](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202503011334018.png)

### 创建控制器

Create - Animation - Animator Controller

![image-20250301133705838](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202503011337876.png)

绑定到角色（Animator）身上

![image-20250301133847261](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202503011338292.png)

### 创建动画Clip

选中Animator

![image-20250301134915938](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202503011349961.png)

找到Animation视窗

![image-20250301134258829](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202503011342852.png)

导入动画序列，单击起始帧，shift点击结尾帧，全选中拖动到Animation中

![image-20250301134543285](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202503011345313.png)

![image-20250301134646835](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202503011346865.png)

点击播放按钮，观察角色是否执行动画

改变采样率Samples可以调节播放速度

![image-20250301134749437](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202503011347458.png)

### 设置过渡

右击需要过渡的状态 Make Transition，点击目标状态

![image-20250301233241135](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202503012332157.png)

![image-20250301233341398](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202503012333421.png)

点击过渡箭头，查看Inspector

如果转换状态时需要立刻打断当前的动画，切到下一个动画，就需要取消退出时间，否则会播放完当前动画再切换到下一个动画。

![image-20250301233059787](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202503012330838.png)

设定过渡条件

新增参数，一般选择bool类型

![image-20250301233608387](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202503012336410.png)

点击需要设置条件的过渡箭头，添加过渡条件，比如Idle - Exit 过渡条件为Idle为false时

![image-20250301233756276](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202503012337302.png)

### 混合树

可以认为是一个clip集合

Animatior> Right Click > Create State > From New Blend Tree

![image-20250302110412108](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202503021104206.png)

新增参数yVelocity（Float）

![image-20250302110915363](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202503021109396.png)

点击新建的混合树clip，层级会从Base Layer 进入Blend Tree

![image-20250302110648680](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202503021106720.png)

在人物进入jump后一定会发生fall，所以可以把两个动画绑定起来

点击Blend Tree编辑信息，添加Motion，加入playerFall 和playerJump

去掉勾选Automatic Threshold

Threshold可以认为是触发条件，当为-1时，yVelocity为负，方向向下，表示下降，跳跃同理

![image-20250302110805055](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202503021108095.png)

点击下方一栏的Blend Tree，会弹出预览界面

![image-20250302111228360](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202503021112418.png)

拖动调节参数按钮，观察动画预览是否正常

![image-20250302111351947](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202503021113981.png)

Base Layer层级设置过渡同上，参数为jump

### 参数接口

可以在Player脚本中声明组件anim

```c#
public Animator anim { get; private set; }
private void Awake()
{
    anim = GetComponentInChildren<Animator>();
}
```

通过SetBool(string , bool)方法设置参数值，比如

```c#
player.anim.SetBool(animBoolName, true);
player.anim.SetBool(“idle”, true);
```

