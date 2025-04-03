---
layout: post
title: OML2D新手教程(CDN引入JS）&Moc3 model3.json文件配置
date: 2024-12-10
tags:
  - Azurlane
  - Moc3
  - Live2D
  - OML2D
---
# OML2D菜鸟教程

某些网站的图源转存可能有问题，我懒得一张张传了，原文：[OML2D新手教程(CDN引入JS）&Moc3 model3.json文件配置](https://wdream.site/2024/12/OML2D新手教程&Moc3-model3.json文件配置/)

> 叠甲：没系统学过任何前后端的知识，随便写写的，凑合能用
>



[OML2D官方API](https://oml2d.com/api/interfaces/Options.html)

```js
<script src="https://unpkg.com/oh-my-live2d@latest"></script>
<script>
	OML2D.loadOml2d({
		models: [
			{
				path: "https://model.oml2d.com/HK416-1-normal/model.json",
				position: [0, 60],
				scale: 0.08,
				stageStyle: {
					height: 450,
				},
			},
		],
	});
</script>
```



## CDN方式JS引入

js中有些部分我修改过，在官网的这个版本有一个部分写错了

原本的`showModelHitAreaFrames`和`hitModelHitAreaFrames`的功能是相反的

这里我修改过了：

![image-20241214110401814](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412141104864.png)

官方提供的js

```c
<script src="https://unpkg.com/oh-my-live2d@latest"></script>
```

我修改的js：还改了一些参数，都不是很重要

```html
<script src="https://cdn.jsdelivr.net/gh/violet-wdream/JS@latest/l2d.js"></script>
```

你也可以把这个官方js下载下来自己编辑，这个js主要是负责让live2d模型动起来的

这里是引入方式，`modelLoader.js`是我写的一个可以通过选择角色来切换模型的模块，也可以显示可点击区域（如果角色有）

```html
<!--page.html-->
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/gh/violet-wdream/JS@latest/l2d.js"></script>
    <script src="/js/L2d/modelLoader.js"></script>
</head>
```



## 模型切换器（modelLoader.js）

### setupModelLoader

`modelLoader.js`

`oml2d`是`OML2D.loadOml2d()`返回的一个实例

```js
function setupModelLoader(oml2d) {
    // 获取当前模型的索引
    var currentIndex = oml2d.modelIndex;
    // 获取当前模型的可点击状态
    if (oml2d.options.models.length > 0)
        var currentShowHitAreaFrames = oml2d.options.models[currentIndex].showHitAreaFrames;
    //监听模型选择框的变化
    document.getElementById('modelIndexSelect').addEventListener('change', function () {
        var selectedIndex = modelIndexSelect.value;
        oml2d.loadModelByIndex(selectedIndex);
    });
    document.getElementById('loadModelHitAreaFramesButton').addEventListener('click', function () {
        currentShowHitAreaFrames ? oml2d.hideModelHitAreaFrames() : oml2d.showModelHitAreaFrames();
        currentShowHitAreaFrames = !currentShowHitAreaFrames;
    });
}
```

配合css，显示效果应该是这样的：

![image-20241214163243186](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412141632225.png)



## 模型配置存储/读取（读取json，非必要）

### loadModelsJson

如果你的模型很多，那么在后期添加模型要滑半天会显得很不方便，于是我考虑把这些配置放在一个json文件里面，然后同一个模块来读取这个json

`modelLoader.js`

```js
async function loadModelsJson() {
    try {
        const response = await fetch('/l2d/models.json');
        const omModels = await response.json();
        console.log(omModels);
        // 现在 models 数组包含了 JSON 文件中的数据
        return omModels; // 返回模型数组
    } catch (error) {
        console.error('Error loading models:', error);
        return []; // 在出错时返回空数组
    }
}
```

这个功能具体工作的场景为：修改models 这个参数的时候，简化代码量

![image-20241214153116648](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412141531725.png)

### json存储



> 需要注意的是，json文件的写法是需要把字符串的部分用双引号包裹，数字则不用。
>
> 如果你不使用json，而是直接定义的话，可以参考官方的写法：
>
> ```js
> models: [
> 			{
> 				path: "https://model.oml2d.com/HK416-1-normal/model.json",
> 				position: [0, 60],
> 				scale: 0.08,
> 				stageStyle: {
> 					height: 450,
> 				},
> 			},
> 		],
> ```



我的模型参数：`models.json` 

这里我放了三个模型，`HK416-1-normal` `Violet`   `qiye_9` 
```json
[
    {
        "name": "HK416-1-normal",
        "path": [
            "/L2d/GirlsFrontline/HK416-1-normal/model.json",
            "/L2d/GirlsFrontline/HK416-1-destroy/model.json"
        ],
        "position": [0, 60],
        "scale": 0.1,
        "stageStyle": {
            "width": 300,
            "height": 450
        },
        "showHitAreaFrames": false
    },
    {
        "name": "Violet",
        "path": "/L2d/Violet/14.json",
        "scale": 0.1,
        "stageStyle": {
            "width": 300,
            "height": 450
        }
    },
    {
        "name": "qiye_9",
        "path": "/L2d/Azurlane/qiye_9/qiye_9.model3.json",
        "position": [0, 0],
        "scale": 0.06,
        "stageStyle": {
            "width": 400,
            "height": 450
        }
    }
]
```



## modelLoader.js

完成这些之后，切换器的基本结构就搭建完成了，js文件内容结构如下

![image-20241214163001384](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412141630422.png)

`OML2D.loadOml2d()`值得一提的是，这个方法会返回一个`oml2d`实例，因此我们可以通过它的方法来实现模型切换，获取模型的属性

```js
async function OML2DInit() {
    const omModels = await loadModelsJson(); // 等待 loadModelsJson 执行完毕
    const oml2d = OML2D.loadOml2d({
		//其他公共选项配置
        models: omModels,
    });
    setupModelLoader(oml2d);
}
```

> **models配置以及其他公共选项配置，请跳转到**   [自定义部分](#自定义部分)





我的配置，大部分都是原型，缺点就是比如说： 你想改items 里面的某一个按钮，其他的选项你用默认的，这时候就需要把其他的三个选项的默认参数抄上去，不然只会显示一个按钮。

这里有一部分预制的CSS我改动了，原型可以跳转到 [CSS](#OML2D预制css)，也就是文末

```c
const oml2d = OML2D.loadOml2d({
    dockedPosition:"right",
    menus: {
        disable: false,
        items: [
            {
                id: "Rest",
                icon: "icon-rest",
                title: "休息",
                onClick(i) {
                    var t;
                    i.statusBarOpen((t = i.options.statusBar) == null ? void 0 : t.restMessage),
                    i.clearTips(),
                    i.setStatusBarClickEvent( () => {
                        i.statusBarClose(),
                        i.stageSlideIn(),
                        i.statusBarClearEvents()
                    }
                                            ),
                    i.stageSlideOut()
                }
            }, {
                id: "SwitchModelClothes",
                icon: "icon-skin",
                title: "换衣服",
                onClick(i) {
                    i.loadNextModelClothes()
                }

            }, {
                id: "SwitchModel",
                icon: "icon-switch",
                title: "切换模型",
                onClick(i) {
                    i.loadNextModel()
                }
            }, {
                id: "About",
                icon: "icon-about",
                title: "关于",
                onClick() {
                    window.open("https://www.bilibili.com/video/BV1GJ411x7h7?t=1.2")
                }
            }],//items按钮
    },//menus
    statusBar: {
        disable: !1,
        transitionTime: 800,
        switchingMessage: "正在切换",
        loadingMessage: "加载中",
        loadSuccessMessage: "加载成功",
        loadFailMessage: "加载失败",
        reloadMessage: "重新加载",
        restMessage: "看板娘休息中",
        restMessageDuration: 8e3,
        loadingIcon: "icon-loading",
        errorColor: "#ff0000",
        //style: Rl,
        //mobileStyle: Rl
    },//statusBar
    tips:{
        interval:1000,
        style :{
            position: "absolute",
            fontSize: "15px",
            borderRadius: "10px",
            filter: "drop-shadow(0 0 5px #999)",
            border: "2px solid #fff",
            color: "#fff",
            padding: "5px 5px",
            opacity: 0,
            visibility: "hidden",
            transform: "translateX(-50%)",
            textAlign: "center",
            justifyContent: "center",
            animationDuration: "1000ms,1000ms",
            animationFillMode: "forwards, none",
            animationIterationCount: "1, infinite",
            width: "40%",
            left: "10%",
            top: "0px",
            display: "flex",
            alignItems: "center",
            minHeight: "100px",
            zIndex:10000,
        },
        messageLine:3,
        idleTips: {
            wordTheDay(wordTheDayData) {
                return `${wordTheDayData.hitokoto}    by.${wordTheDayData.from}`;
            }
        },
        copyTips: {
            message: ['复制了啥?记得标明出处哟！']
        },
    },//tips
    models: omModels,
});
```









## 前端部分



随便放到一个html页面

> 注意这里的select元素的option的顺序需要与你的json中模型存放顺序一致
>
> 你也可以写一个js读取json然后生成一个列表，不过这样显示出来的name应该是模型配置的name，可读性不太好，都是拼音之类的name，当然好处是你不用手动添加option

```html

<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="/css/L2d/l2d.css">
    <script src="https://cdn.jsdelivr.net/gh/violet-wdream/JS@latest/l2d.js"></script>
    <script src="/js/L2d/modelLoader.js"></script>
</head>
<div class="container">
    <select id="modelIndexSelect" title="请选择一个选项">
        <option value="0">HK416-1-normal</option>
        <option value="1">Violet</option>
        <option value="2">企业</option>
        <option value="3">前卫</option>
        <option value="4">埃吉尔女仆</option>
        <option value="5">埃吉尔新春</option>
        <option value="6">阿尔萨斯</option>
        <option value="7">大凤</option>
        <option value="8">让·巴尔2</option>
        <option value="9">让·巴尔1</option>
        <option value="10">Doro</option>
        <option value="11"></option>
        <option value="12"></option>
        <option value="13"></option>
        <option value="14"></option>
    </select>
    <div>
        <button id="loadModelHitAreaFramesButton">HitAreaFrames</button>
    </div>
</div>
<script>
    OML2DInit();
</script>
```



目录层级如下：

如果你用url，不需要`l2d.js`了，l2d目录下其他的文件为模型分类和一些分散的模型，你只需要保证`models.json`配置中的路径正确即可，模型你可以放在其他地方

![image-20241214165020993](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412141650051.png)

### CSS

我的css

```css
.container {
    position: fixed;
    width: 200px;
    top: 40%;
    right: 0%;
    z-index: 11111;
}
select, button{
    margin-top: 10px;
    color: #a358c6;
    background-color: rgba(242, 233, 246, 0.98);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
select{
    font-size: 15px;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
}

button{
    font-size: 14px;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
}

button:hover{
    color: #6500ff;
}
```

把这些部分完成之后，如果你的模型`model3.json`内容正确的话，应该就能动了

当然，大概率应该是不对的，所以目前你只能切换模型，看到基本的物理效果，没法实现点击互动（官方演示的那个模型可以），也不能显示可点击区域

![image-20241214170237342](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412141702413.png)



## 实现点击互动

> [我参考的一篇文章](https://github-wiki-see.page/m/kongbaiku/Live2D-M/wiki/MOC3配置说明)

### 模型model3.json文件修改

- 公共字段，这个部分出除了Motions基本不用改，注意：`Motions`是`FileReferences`的一个成员

```json
{
    "Version": 3,
    "FileReferences": {
        "Moc": "qiye_9.moc3",
        "Textures": [
            "textures/texture_00.png"
        ],
        "Physics": "qiye_9.physics3.json",
        "Motions"：{
		...
    	}
	},
	"HitAreas":[
	...
	],
	"Groups": [
	...
	]
}
```

- Motions

```json
"Motions": {
    "Start": [],
    "Idle": [],
    "TapBody": [],
    "TapSpecial": [],
    "TapHead": []
}
```

这里的`Idle`和`Start`是不用点击触发的，idle是待机动作，这个Start好像触发不了，我也不是很清楚，按道理是出场动画，可能参数传递有问题。

剩下三个就是字面意思。



具体写法：主要就是一个Name和一个File路径，这里写的是相对路径，name跟文件前缀名一样就可以，还有Sound和Text字段，考虑到大部分模型没有音频资源，这里不详细介绍。

```c
"Sound": "sounds/touch_head.mp3"
"Text": "呣……指挥官，不要摇我……"
```

下面展示一个TapBody的写法，其他的同理

```c
"TapBody": [
    {
        "Name": "touch_body",
        "File": "motions/touch_body.motion3.json"
    },
    {
        "Name": "touch_drag3",
        "File": "motions/touch_drag3.motion3.json"
    },
    {
        "Name": "touch_drag4",
        "File": "motions/touch_drag4.motion3.json"
    }
],
```



- HitAreas

  只有三个部分可以点击`Body` `Special` `Head`

  可点击区域，基本照着下面这个抄就行了，`"Order": 1` 为优先级，越大表示优先级越高，比如你同时触发两个动作，会选择优先级高的触发。

  `"Motion": "TapBody:touch_drag3"`中`:touch_drag3`为指定`TapBody`中的一个动作`touch_drag3`,如果你不指定，就会随机触发一个`TapBody`中的动作

```json
"HitAreas": [
    {
        "Name": "Body",
        "Id": "TouchBody",
        "Motion": "TapBody:touch_drag3"
    },
    {
        "Name": "Special",
        "Id": "TouchSpecial",
        "Order": 1,
        "Motion": "TapSpecial"
    },
    {
        "Name": "Head",
        "Id": "TouchHead",
        "Motion": "TapHead"
    }
],
```

- Groups

  这个部分基本不用改，用模型自带的就行，大概就是呼吸和眨眼睛之类的功能

  ```c
  "Groups": [
      {
        "Target": "Parameter",
        "Name": "EyeBlink",
        "Ids": [
          "ParamEyeLOpen",
          "ParamEyeROpen"
        ]
      },
      {
        "Target": "Parameter",
        "Name": "LipSync",
        "Ids": [
          "ParamMouthOpenY"
        ]
      }
    ]
  ```

  





# 自定义部分

![image-20241214180602495](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412141806561.png)

接口部分

```c
const oml2d = OML2D.loadOml2d({
    dockedPosition:"right",
    mobileDisplay: true,
    //其他公共选项配置
    models: omModels,
});
```

## OML2D自定义部分原型

```c
dockedPosition: "left",  //停靠位置左边/右边
mobileDisplay: !1,  
primaryColor: "#38B0DE", 
sayHello: !0,  
transitionTime: 1e3, 
parentElement: document.body,
importType: "complete",
libraryUrls: {
    complete: "",
    cubism2: "",
    cubism5: ""
},
stageStyle: D2,	//预制css，参考文末	
models: [], //模型配置，主要更改这个
statusBar: { //右边那个状态条
    disable: !1,
    transitionTime: 800,
    switchingMessage: "正在切换",
    loadingMessage: "加载中",
    loadSuccessMessage: "加载成功",
    loadFailMessage: "加载失败",
    reloadMessage: "重新加载",
    restMessage: "看板娘休息中",
    restMessageDuration: 8e3,
    loadingIcon: "icon-loading",
    errorColor: "#F08080",
    style: Rl,
    mobileStyle: Rl
},
tips: {  //说话
    messageLine: 3,
    mobileStyle: $l,
    style: $l,
    idleTips: {
        wordTheDay: !1,
        message: [],
        duration: 5e3,
        interval: 1e4,
        priority: 2
    },
    welcomeTips: {
        message: {
            daybreak: "早上好！一日之计在于晨，美好的一天就要开始了。",
            morning: "上午好！工作顺利嘛，不要久坐，多起来走动走动哦！",
            noon: "中午了，工作了一个上午，现在是午餐时间！",
            afternoon: "午后很容易犯困呢，来杯咖啡吧~",
            dusk: "傍晚了！工作一天幸苦啦~",
            night: "晚上好，今天过得怎么样呢？",
            lateNight: "已经这么晚了呀，早点休息吧，晚安~",
            weeHours: "这么晚还不睡吗？当心熬夜秃头哦！"
        },
        duration: 6e3,
        priority: 3
    },
    copyTips: {
        duration: 3e3,
        priority: 3,
        message: ["你复制了什么内容呢?记得注明出处哦~"]
    }
},
menus: { //四个选项，这个不是很好改，配合自定义js使用
    disable: !1,
    items: [{
        id: "Rest",
        icon: "icon-rest",
        title: "休息",
        onClick(i) {
            var t;
            i.statusBarOpen((t = i.options.statusBar) == null ? void 0 : t.restMessage),
            i.clearTips(),
            i.setStatusBarClickEvent( () => {
                i.statusBarClose(),
                i.stageSlideIn(),
                i.statusBarClearEvents()
            }
                                    ),
            i.stageSlideOut()
        }
    }, {
        id: "SwitchModelClothes",
        icon: "icon-skin",
        title: "切换衣服",
        onClick(i) {  //i 等效于this，可以调用模型方法
            i.loadNextModelClothes()
        }
    }, {
        id: "SwitchModel",
        icon: "icon-switch",
        title: "切换模型",
        onClick(i) {
            i.loadNextModel()
        }
    }, {
        id: "About",
        icon: "icon-about",
        title: "关于",
        onClick() {
            window.open("https://www.bilibili.com/video/BV1GJ411x7h7?t=1.2")
        }
    }],
    style: Ll,
    itemStyle: {},//四个选项的样式
    mobileStyle: Ll,
    mobileItemStyle: {}
},
initialStatus: "active"
```





## models配置

1. path 必填

   模型`model3.json或model.json`的路径

   ```js
   //url
   path: 'https://model.oml2d.com/Senko_Normals/senko.model3.json'
   //本地，绝对路径
   path: '/L2d/Senko_Normals/senko.model3.json'
   //数组，同一模型的不同衣服
   path: [
         '/L2d/GirlsFrontline/HK416-1-normal/model.json',
         '/L2d/GirlsFrontline/Hk416-1-destroy/model.json'
       ],
   ```

2. position 必填

   模型在舞台中相对于锚点`anchor`的位置

   ```c
   //值得一提的是，如果你的参数写的不合理，然后模型可能会加载在网页外面，你就看不到了而不是没有加载出来
   //所以需要你不断调整，如果是默认锚点[0,0]，一般取[100,100]左右偏移就很明显了
   position: [-10, 20]
   ```

3. anchor

   锚点，默认是`[0,0]`应该是舞台的左下角，我没用过这个参数

4. scale

   缩放比例，一般取`0.1`就很大了，默认值`0.1`

5. mobilePosition

   用法同position，只作用在移动端网页

6. mobileScale

   移动端模型缩放比例，用法同scale

7. rotation

   旋转角度`-360~360`正角度表示顺时针，默认`0`不旋转

8. showHitAreaFrames

   `true`表示显示可点击区域，`false`相反

   显示效果如下：

   ![image-20241214160257496](https://cdn.jsdelivr.net/gh/violet-wdream/Picbed2/202412141602547.png)

9. stageStyle

   可以传入css对象，默认为`D2`，为空，其他的参数参考css官方文档[CSS]([CSS Tutorial](https://www.w3schools.com/Css/))

   ```css
   stageStyle: {
       width: 500,
       height: 400
   }
   ```

10. volume

   模型播放音效的音量`0~1` 默认值0.5，0为静音

   如果你有音频资源或者模型自带音频资源，可以调一下这个参数，大部分模型应该没有



   

## icon

四个选项的图标，这个我还没弄清楚，大概是要使用svg然后转成symbol值，作为路径

有兴趣的可以去读一下https://unpkg.com/oh-my-live2d@latest 这个js文件，建议用工具把格式调整一下，不然太难看了，这个js主要就是live2d cubism的内核占很大一部分，这些基本不用管，看开头一段和结尾两段就可以，或者在你的网页用控制台搜索一下关键词`symbol`

```js
window._iconfont_svg_string_3847283 =
<svg>
<symbol id="icon-rest" viewBox="0 0 1280 1024">
<path d="M352 512c88.22 0 160-71.78 160-160s-71.78-160-160-160-160 71.78-160 160 71.78 160 160 160z m704-256H608c-17.68 0-32 14.32-32 32v288H128V160c0-17.68-14.32-32-32-32H32C14.32 128 0 142.32 0 160v704c0 17.68 14.32 32 32 32h64c17.68 0 32-14.32 32-32v-96h1024v96c0 17.68 14.32 32 32 32h64c17.68 0 32-14.32 32-32V480c0-123.72-100.28-224-224-224z"  >
</path>
</symbol>


<symbol id="icon-about" viewBox="0 0 1024 1024">
<path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272z m-32-344c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"  >
</path>
</symbol>
...


</svg>


showLoading() {
            this.open(`
      <div style="margin-bottom:3px;">${this.statusBarOptions.loadingMessage}</div>
      <svg class="oml2d-icon oml2d-loading" aria-hidden="true">
        <use xlink:href=#${this.statusBarOptions.loadingIcon}></use>
      </svg>
    `)
```

2024-12-14

大概弄懂了，你只要向`window._iconfont_svg_string_3847283 `这个解析方法提供`symbol id`（你定义的icon的名称）和对应的symbol值，就可以添加新的icon，因此可以往menus的items属性里添加新的元素来添加新的按钮

### SVG路径

[SVG 路径 | 菜鸟教程](https://www.runoob.com/svg/svg-path.html#:~:text=SVG 中的  元素用于创建路径，它是 SVG 中最强大和最灵活的基本形状之一。 使用 ,d%3D"path-data"  fill%3D"fill-color" )

```c
<path
  d="path-data"            <!-- 定义路径的路径数据 -->
  fill="fill-color"        <!-- 路径的填充颜色 -->
  stroke="stroke-color"    <!-- 路径的描边颜色 -->
  stroke-width="width"     <!-- 路径的描边宽度 -->
/>
```



[iconfont-阿里巴巴矢量图标库](https://www.iconfont.cn/help/detail?spm=a313x.home_index.i3.28.219d3a81hbrUEc&helptype=code)

```c
<script src="//at.alicdn.com/t/c/font_2679099_hchompi0roq.js"></script>
```



```js
unorderedlist  //...
like
like1
like-fill
calendar
sound-fill
bilibili-fill 
snippets-fill  //cv
folder-fill
folder-open-fill
container-fill
arrow-down
menu
appstore-fill
home-fill
api-fill
tag-fill
tags-fill
file-text-fill
github-fill
QQ-circle-fill
```



## 一些方法的源码

```js
class rA {
    constructor(t) {
        Nt(this, "globalStyle");
        Nt(this, "stage");
        Nt(this, "statusBar");
        Nt(this, "tips");
        Nt(this, "menus");
        Nt(this, "models");
        Nt(this, "pixiApp");
        Nt(this, "_modelIndex", 0);
        Nt(this, "_modelClothesIndex", 0);
        Nt(this, "version", "0.19.3");
        Nt(this, "options");
        Nt(this, "events");
        this.events = new L2,
            this.options = W2(ma, t),
            this.globalStyle = new Q2(this.options),
            this.stage = new ZT(this.options,this.events),
            this.statusBar = new tA(this.options),
            this.tips = new eA(this.options,this),
            this.menus = new J2(this.options,this),
            this.models = new B4(this.options,this.events),
            this.modelIndex = QT(),
            this.modelClothesIndex = qT(),
            this.initialize()
    }
    set modelIndex(t) {
        t > this.options.models.length - 1 && (t = 0),
            this._modelIndex = t,
            this.stage.modelIndex = t,
            this.models.modelIndex = t,
            jT(t)
    }
    get modelIndex() {
        return this._modelIndex
    }
    set modelClothesIndex(t) {
        this._modelClothesIndex = t,
            this.models.modelClothesIndex = t,
            JT(t)
    }
    get modelClothesIndex() {
        return this._modelClothesIndex
    }
    showModelHitAreaFrames() {
        this.models.addHitAreaFrames()
    }
    hideModelHitAreaFrames() {
        this.models.removeHitAreaFrames()
    }
    setModelScale(t) {
        this.models.setScale(t)
    }
    stopTipsIdle() {
        var t;
        (t = this.tips.idlePlayer) == null || t.stop()
    }
    startTipsIdle() {
        var t;
        (t = this.tips.idlePlayer) == null || t.start()
    }
    statusBarPopup(t, e, a) {
        this.statusBar.popup(t, e, a)
    }
    setStatusBarHoverEvent(t) {
        this.statusBar.setHoverEvent(t)
    }
    tipsMessage(t, e, a) {
        this.tips.notification(t, e, a)
    }
    setStageStyle(t) {
        this.stage.setStyle(Vr(t))
    }
    setModelPosition(t) {
        const {x: e=0, y: a=0} = t;
        this.models.setPosition(e, a)
    }
    get mobileHidden() {
        return !this.options.mobileDisplay && ga() === rr.mobile
    }
    create() {
        this.stage.create(),
            this.pixiApp = new WT(this.stage),
            this.statusBar.create(),
            this.statusBar.initializeStyle()
    }
    mount() {
        this.stage.mount(),
            this.statusBar.mount()
    }
    loadModel() {
        return ur(this, null, function*() {
            if (this.tips.clear(),
                yield this.stage.slideOut(),
                !(!this.options.models || !this.options.models.length)) {
                if (this.mobileHidden) {
                    this.statusBar.rest();
                    return
                }
                return this.statusBar.showLoading(),
                    this.models.create().catch( () => {
                    this.statusBar.loadingError( () => void this.reloadModel())
                }
                                              ).then( () => {
                    var t, e;
                    (t = this.pixiApp) == null || t.mount(this.models.model),
                        this.menus.reload(this.stage.element),
                        this.tips.reload(this.stage.element),
                        this.models.settingModel(),
                        this.stage.reloadStyle(this.models.modelSize),
                        (e = this.pixiApp) == null || e.resize(),
                        this.statusBar.hideLoading()
                }
                                                    )
            }
        })
    }
    reloadModel() {
        return ur(this, null, function*() {
            var t;
            yield this.loadModel(),
                yield this.stage.slideIn(),
                (t = this.tips.idlePlayer) == null || t.start()
        })
    }
    loadRandomModel() {
        return ur(this, null, function*() {
            var t;
            this.modelIndex = j2(this.options.models.length, this.modelIndex),
                this.modelClothesIndex = 0,
                this.statusBar.open(this.options.statusBar.switchingMessage),
                yield this.loadModel(),
                yield this.stage.slideIn(),
                (t = this.tips.idlePlayer) == null || t.start()
        })
    }
    loadNextModel() {
        return ur(this, null, function*() {
            var t;
            ++this.modelIndex >= this.options.models.length && (this.modelIndex = 0),
                this.modelClothesIndex = 0,
                this.statusBar.open(this.options.statusBar.switchingMessage),
                yield this.loadModel(),
                yield this.stage.slideIn(),
                (t = this.tips.idlePlayer) == null || t.start()
        })
    }
    loadModelByIndex(t, e) {
        return ur(this, null, function*() {
            var a;
            t >= 0 && t < this.options.models.length && (this.modelIndex = t,
                                                         this.modelClothesIndex = e || 0,
                                                         this.statusBar.open(this.options.statusBar.switchingMessage),
                                                         yield this.loadModel(),
                                                         yield this.stage.slideIn(),
                                                         (a = this.tips.idlePlayer) == null || a.start())
        })
    }
    loadModelByName(t, e) {
        return ur(this, null, function*() {
            var n;
            const a = this.options.models.findIndex(s => s.name === t);
            a > 0 && (this.modelIndex = a,
                      this.modelClothesIndex = e || 0,
                      this.statusBar.open(this.options.statusBar.switchingMessage),
                      yield this.loadModel(),
                      yield this.stage.slideIn(),
                      (n = this.tips.idlePlayer) == null || n.start())
        })
    }
    loadNextModelClothes() {
        return ur(this, null, function*() {
            const t = this.options.models[this.modelIndex].path;
            Xr(this.options.models[this.modelIndex].path) && this.options.models.length ? (++this.modelClothesIndex >= t.length && (this.modelClothesIndex = 0),
                                                                                           yield this.loadModel(),
                                                                                           yield this.stage.slideIn()) : this.tips.notification("该模型没有其他衣服~", 5e3, 3)
        })
    }
    setModelRotation(t) {
        this.models.setRotation(t)
    }
    setModelAnchor(t) {
        const {x: e, y: a} = t;
        this.models.setAnchor(e, a)
    }
    initialize() {
        z2(),
            this.options.sayHello && V2(),
            this.registerGlobalEvent(),
            this.globalStyle.initialize(),
            this.create(),
            this.mount(),
            this.loadModel().then( () => {
            const t = i2() || this.options.initialStatus;
            i2() || gl(this.options.initialStatus),
                t === "sleep" ? (this.tips.clear(),
                                 this.statusBar.open(this.options.statusBar.restMessage),
                                 this.statusBar.setClickEvent( () => {
                var e;
                this.stage.slideIn(),
                    (e = this.tips.idlePlayer) == null || e.start(),
                    this.statusBar.close(),
                    this.statusBar.clearHoverEvent(),
                    this.statusBar.clearClickEvent()
            }
                                                             )) : this.stage.slideIn()
        }
                                 )
    }
    stageSlideIn() {
        return ur(this, null, function*() {
            yield this.stage.slideIn()
        })
    }
    stageSlideOut() {
        return ur(this, null, function*() {
            yield this.stage.slideOut()
        })
    }
    statusBarOpen(t, e) {
        this.statusBar.open(t, e)
    }
    clearTips() {
        this.tips.clear()
    }
    setStatusBarClickEvent(t) {
        this.statusBar.setClickEvent(t)
    }
    statusBarClose(t, e, a) {
        this.statusBar.close(t, a, e)
    }
    statusBarClearEvents() {
        this.statusBar.clearClickEvent(),
            this.statusBar.clearHoverEvent()
    }
    onStageSlideIn(t) {
        this.events.add("stageSlideIn", t)
    }
    onStageSlideOut(t) {
        this.events.add("stageSlideOut", t)
    }
    onLoad(t) {
        this.events.add("load", t)
    }
    registerGlobalEvent() {
        K2( () => {
            this.reloadModel()
        }
          ),
            this.onStageSlideIn( () => {
            this.tips.welcome()
        }
                               ),
            window.document.oncopy = () => {
            this.tips.copy()
        }
    }
}
const iA = i => new rA(i);
Me.loadOml2d = iA,
    Object.defineProperty(Me, Symbol.toStringTag, {
    value: "Module"
})
```







## OML2D预制css

```css
D2 = {}
, N2 = {
    width: "0px",
        height: "0px",
        position: "fixed",
        right: "auto",
        bottom: 0,
        zIndex: "9997",
        transform: "translateY(130%)"
}
, $l = {
    position: "absolute",
        fontSize: "18px",
        borderRadius: "10px",
        filter: "drop-shadow(0 0 5px #999)",
        border: "2px solid #fff",
        color: "#fff",
        padding: "5px 5px",
        opacity: 0,
        visibility: "hidden",
        transform: "translateX(-50%)",
        textAlign: "center",
        justifyContent: "center",
        animationDuration: "1000ms,1000ms",
        animationFillMode: "forwards, none",
        animationIterationCount: "1, infinite",
        width: "60%",
        left: "50%",
        top: 0,
        display: "flex",
        alignItems: "center",
        minHeight: "100px"
}
, Rl = {
    minWidth: "20px",
        minHeight: "40px",
        position: "fixed",
        transform: "translateX(-110%)",
        bottom: "80px",
        padding: "7px 5px",
        zIndex: "9998",
        borderStyle: "solid",
        borderColor: "#fff",
        fontWeight: "bold",
        borderRadius: "5px",
        borderWidth: "2px",
        boxShadow: "0 0 5px #999",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        flexWrap: "wrap",
        fontSize: "14px",
        writingMode: "vertical-lr",
        cursor: "pointer"
}
, Ll = {
    transition: "all 500ms",
        visibility: "hidden",
        opacity: 0,
        position: "absolute",
        bottom: "10%",
        zIndex: "9999",
        fontSize: "26px"
}
, ma = {
    dockedPosition: "left",
        mobileDisplay: !1,
        primaryColor: "#38B0DE",
        sayHello: !0,
        transitionTime: 1e3,
        parentElement: document.body,
        importType: "complete",
        libraryUrls: {
            complete: "",
                cubism2: "",
                cubism5: ""
    },
    stageStyle: D2,
        models: [],
        statusBar: {
            disable: !1,
                transitionTime: 800,
                switchingMessage: "正在切换",
                loadingMessage: "加载中",
                loadSuccessMessage: "加载成功",
                loadFailMessage: "加载失败",
                reloadMessage: "重新加载",
                restMessage: "看板娘休息中",
                restMessageDuration: 8e3,
                loadingIcon: "icon-loading",
                errorColor: "#F08080",
                style: Rl,
                mobileStyle: Rl
    },
```

