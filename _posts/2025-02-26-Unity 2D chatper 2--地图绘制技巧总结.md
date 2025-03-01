---
layout: post
title: Unity 2D chatper 2--地图绘制技巧总结
date: 2025-02-26
tags:
  - Unity2D
---
## 阴影拱门

在一个Grid下新建多个图层，设置Tilemap1图层顺序为1

![image-20250226110143157](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502261101179.png)

![image-20250226113317883](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502261133912.png)

Tilemap0

![image-20250226110215686](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502261102718.png)

Tilemap1

![image-20250226110251510](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502261102543.png)

拱门中间是空的显然不太合适，可以考虑使用纯黑的色块表示阴影，将Tilemap1的可视性关闭，画板选中Tilemap0，在Tilemap0中拱门位置涂黑

![image-20250226110626986](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502261106005.png)

![image-20250226114442405](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502261144430.png)

![image-20250226110435461](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502261104487.png)

然后再恢复Tilemap1的可视性

![image-20250226110518945](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502261105969.png)

### 成品展示

![image-20250226114031138](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202502261140167.png)

### 用途

1. 可以当作下一个场景的传送点







