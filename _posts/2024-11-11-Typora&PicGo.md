---
layout: post

title: PicGo&Github实现typora图床管理

date: 2024-11-9

tags: [Typora,PicGo,Drawio]
---





# PicGo

> 原先使用图片需要将图片存放在网站的相对路径images内，又需要在md文件内使用严格的索引格式，导致在typora端md文件编辑好之后，仓库端资源未同步，同时路径不正确，出现一张图要保存两次的情况 。

将图片上传到云端（新建一个仓库当作图床），就可以实现typora端和仓库端均使用URL嵌入图片，不需要担心文件同步和索引问题。

通过PicGo 可以实现将图片插入md中同时将文件上传到图床（github-Repository-Drawio），然后使用URL 嵌入md，则无需在网站资源中额外添加images文件。减少了不必要的麻烦。



## PicGo安装和使用

### Install

[Releases · Molunerfinn/PicGo](https://github.com/Molunerfinn/PicGo/releases)

随便找一个版本下载。我下的是这个：

[2.4.0](https://picgo-release.molunerfinn.com/2.4.0-beta.8/PicGo-Setup-2.4.0-beta.8.exe)

### Config

#### github图床建立

首先我们需要建一个Github Repository:

主页点击右上角 + ，选择 New repository，

![image-20241111221232798](https://raw.githubusercontent.com/violet-wdream/Drawio/main/PNG/202411112212827.png)



名字取一个简单一点的，比如说picbed，假如你的github用户名是 xxx，记下 用户名/仓库名（xxx/picbed），配置PicGo要用。

![image-20241111221420148](https://raw.githubusercontent.com/violet-wdream/Drawio/main/PNG/202411112214170.png)



在设置里找到Developer Settings ，如果你找不到请点这里：

[GitHub Apps](https://github.com/settings/apps)    

然后选择经典的Tokens，



![image-20241111221908965](https://raw.githubusercontent.com/violet-wdream/Drawio/main/PNG/202411112219984.png)

生成一个新的token，注意选择classic的token

![image-20241111222222691](https://raw.githubusercontent.com/violet-wdream/Drawio/main/PNG/202411112222714.png)



![image-20241111222422614](https://raw.githubusercontent.com/violet-wdream/Drawio/main/PNG/202411112224645.png)

![image-20241111222613943](https://raw.githubusercontent.com/violet-wdream/Drawio/main/PNG/202411112226967.png)

1. note随意
2. 保质期看你自己
3. 用途勾选repo
4. 滑到最下面点击生成token
5. 复制token







打开PicGo，图床设置中选择Github，

1. 配置名随意
2. 仓库名格式为： 用户名/仓库名，上面提到的xxx/picbed
3. 分支名main
4. Token是刚刚复制的
5. 保存路径可以不写
6. 自定义域名如果你上传的太慢了，可以使用 `jsdelivr`，自行查阅
7. 确定，设定为默认图床

<img src="https://raw.githubusercontent.com/violet-wdream/Drawio/main/PNG/202411112208790.png" alt="image-20241111220806754" style="zoom: 80%;" />

回到上传区：

![image-20241111223208704](https://raw.githubusercontent.com/violet-wdream/Drawio/main/PNG/202411112232738.png)

选择上传一个图片，如果成功。右下角会有系统提示，同时在仓库中应该可以看到，比如我刚刚上传了一个png（其他文件请无视）。

![image-20241111223116423](https://raw.githubusercontent.com/violet-wdream/Drawio/main/PNG/202411112231462.png)



## Typora 中使用

在Typora中 ctrl + ， 打开偏好设置，或者  文件 - 偏好设置

如图所示配置选项：

![image-20241111223506422](https://raw.githubusercontent.com/violet-wdream/Drawio/main/PNG/202411112235467.png)

PicGo路径选择你安装的地方, 路径不要有中文。



然后可以测试一下：用任意工具截图，然后粘贴到md里面，系统会显示上传成功



# Drawio

[Drawio地址](https://app.diagrams.net/)

可以链接Github仓库绘图，然后同步。



