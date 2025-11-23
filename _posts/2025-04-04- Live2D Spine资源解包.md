---
layout: post
title: Live2D Spine资源解包
date: 2025-10-29
tags:
  - Spine
  - Live2D
---



参考过的攻略：

[基础的解包教学 - 教学 - Live2DHub](https://live2dhub.com/t/topic/4681)

二油资源下载器：

https://live2dhub.com/uploads/short-url/4CePVk4JsJ8tWfEZK6uBtfXGxZI.zip 资源少

[resdownloader - Software Download](https://resdownload.7sec.fun/resdownloader/)  资源多，要手动设置代理，跟模拟器代理一个操作。代理软件开局域网连接，ipconfig查一下局域网的IPv4拼接一下代理端口。EroLab基本上就那几个头牌能看，其他的都是3A大作啊我看，看一眼封面都懒得下载了。

![image-20251116141643552](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511161416677.png)

如何给模拟器设置代理：

1. 代理软件打开局域网连接。
2. 模拟器内设置WLAN信息，主机名为物理机IPv4地址，端口为代理软件端口，保存。
3. 
    ![image-20251113144509044](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511131445106.png)

一个重要的结论，如果你能提取一部分的资源，但是不能提取另一部分（出错），大概率是需要APK静态资源和热更新资源合并。这个结论适用于所有加密方式。因为APK里面已经有的资源肯定不会再让你下载一遍，所以这两个部分必须要合并。在某些资源缺失/解密错误时候可以尝试。

后续如果还需要获取新角色模型可以记住文件路径，然后更新后按照时间排序。

比如碧蓝航线的的就很简单

- [x] 碧蓝航线
- [x] 奇点时代
- [x] 绯色回响
- [x] 银与绯
- [x] 锚点降临
- [x] 无期迷途
- [x] 星落
- [ ] -归龙潮
- [x] 苍雾残响
- [x] 麻雀一番街
- [x] 钢岚
- [x] 棕色尘埃2
- [x] 少女前线
- [x] 云图计划
- [x] 少女回战

## AS合集

1. Mod版本[Release AssetStudioMod v0.19.0 · aelurum/AssetStudio](https://github.com/aelurum/AssetStudio/releases/tag/v0.19.0)： 可以一键导出Live2D，可识别FakeHeader，不能解UniyCN
2. Raz版本[RazTools/Studio: Modded AssetStudio with new features](https://github.com/RazTools/Studio)：可以解各种游戏的加密，包括FakeHeader, UnityCN在内的加密
3. AXIX版本[AXiX-official/Studio: Modded AssetStudio with new features](https://github.com/AXiX-official/Studio)：在Raz版本的基础上新增了一些游戏的Key
4. PtN版本[无期迷途 - Google Drive](https://drive.google.com/drive/folders/1J6XrLk0rkyBBTs832AMC4qTWvGluPyNH)：无期迷途特供版，来自Live2DHub网友Yjzy，解了FakeHeader和UnityCN同时破解了hash参数。
5. Plugin版本https://github.com/Ahykal/StudioPluginVer：能解密同时还能导出L2D，但是在导出少前L2D时候发生了异常没处理，然后直接GUI崩了。一坨。

一般就是如果Live2D模型有加密很麻烦，因为L2D的文件在Unity会被处理过，比如moc3文件会被拆分成bytes然后需要你拼接，motions文件会变成fade文件需要转换成标准形式。现在基本上能解密的都不支持一键导出Live2D，能导出的都不会解密。

我猜测是这些AS直接集成了UnityExtractor。如果用能解密的版本先处理成未加密状态然后再把数据传给提取器应该就行了。

目前只有个Plugin版本可行，但是行的不是很多。。

有个Linq选择异常，没有处理。

```
************** 异常文本 **************
System.InvalidOperationException: Sequence contains no matching element
   at System.Linq.ThrowHelper.ThrowNoMatchException()
   at UnityLive2DExtractor.Live2DExtractor.Extract(AssetsManager assetsManager, String folderPath) in E:\Project\Ahykal\StudioPluginVer\Plugins\Live2d\Live2DExtractor.cs:line 456
   at Plugins.Ahykal.L2DPlugin.<>c__DisplayClass6_1.<Run>b__7() in E:\Project\Ahykal\StudioPluginVer\Plugins\Live2d\L2DPlugin.cs:line 24
   at System.Threading.ExecutionContext.RunFromThreadPoolDispatchLoop(Thread threadPoolThread, ExecutionContext executionContext, ContextCallback callback, Object state)
--- End of stack trace from previous location ---
   at System.Threading.ExecutionContext.RunFromThreadPoolDispatchLoop(Thread threadPoolThread, ExecutionContext executionContext, ContextCallback callback, Object state)
   at System.Threading.Tasks.Task.ExecuteWithThreadLocal(Task& currentTaskSlot, Thread threadPoolThread)
--- End of stack trace from previous location ---
   at Plugins.Ahykal.L2DPlugin.<>c__DisplayClass6_0.<<Run>b__6>d.MoveNext() in E:\Project\Ahykal\StudioPluginVer\Plugins\Live2d\L2DPlugin.cs:line 24
--- End of stack trace from previous location ---
   at System.Threading.Tasks.Task.<>c.<ThrowAsync>b__128_0(Object state)
   at InvokeStub_SendOrPostCallback.Invoke(Object, Object, IntPtr*)
   at System.Reflection.MethodInvoker.Invoke(Object obj, IntPtr* args, BindingFlags invokeAttr)
```



## 碧蓝航线(Azurlane) Spine/Live2D - 无加密 - 可更新 简单

这么多游戏看下来还是碧蓝航线nb，角色一个比一个扫，文件放的位置清晰明了，角色文件命名简单，还是独立文件，没有加密。

味大，无需多言，二油Goat！

b服版本最高，模拟器搜索b服下载，和谐的皮肤后缀是hx，有单独的文件。所以不需要进行反和谐操作。

参考[AL 逆向解包：live2d, spine 动态立绘，背景图_live2dhub-CSDN博客](https://blog.csdn.net/dilvx/article/details/144655909)

### Spine路径

#### 立绘复原

好麻烦wc，拉倒吧。。。

模型被分尸了，分散在了四个文件夹里面，需要获取这四个文件夹的内容

```bash
/Android/data/com.bilibili.azurlane/files/AssetBundles
  - char/
  - painting/
  - paintingface/
  - dependencies
```

1.石块拼接

[azurlane-doujin/AzurLanePaintingExtract-v1.0: 一个简单的碧蓝航线立绘还原的工具](https://github.com/azurlane-doujin/AzurLanePaintingExtract-v1.0)

2.然后使用下面这个工具接着处理。

[Deficuet/AzurLanePaintingAnalysis-Kt: 通过分析AssetBundle自动计算并将多张立绘和差分表情组合成一个完整的立绘图片](https://github.com/Deficuet/AzurLanePaintingAnalysis-Kt)



#### Spine

```bash
/Android/data/com.bilibili.azurlane/files/AssetBundles
  - spinepainting/
```

按名字排序，不难发现应该是不带后缀的文件是unity相关的文件，带后缀res的是spine模型的相关文件。

![image-20251031213058640](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510312130707.png)

这个1000kB以下的文件都可以删除，都是跟角色无关的spine或者其他配置文件。

spine的版本是`3.8.99`

![image-20251031213359568](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510312133616.png)

导出来的文本文件都带`.asset`，可以用批处理脚本删除这个后缀。

```bash
@echo off
setlocal enabledelayedexpansion

echo ================================================
echo [INFO] Delete .asset suffixes
echo ================================================

REM find all .asset files
for /r %%F in (*.asset) do (
    set "FULLPATH=%%~fF"
    set "DIR=%%~dpF"
    set "NAME=%%~nF"

    echo [RENAME] %%~nxF → !NAME!
    ren "%%F" "!NAME!"
)

echo ================================================
echo [DONE] All .asset files were renamed！
pause
```



### Live2D路径

模拟器文件夹路径

![image-20251029164709609](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510291647756.png)

将文件放入AssetBundler处理，选择导出Live2D model即可。



### 自用处理（非必要）

模型json处理脚本(格式化model3.json文件，可以使用web-OML2D预览)

```python
import os
import json
import tkinter as tk
from tkinter import filedialog, messagebox

tapbody_keys = ["complete", "home", "login", "mail", "touch_body", "touch_drag"]
taphead_keys = ["mission", "mission_complete", "wedding", "touch_head", "touch_idle"]

def collect_files(root_dir):
    files_to_process = []
    for name in os.listdir(root_dir):
        model_dir = os.path.join(root_dir, name)
        if not os.path.isdir(model_dir):
            continue
        model_path = os.path.join(model_dir, f"{name}.model3.json")
        motions_dir = os.path.join(model_dir, "motions")
        if os.path.exists(model_path) and os.path.exists(motions_dir):
            files_to_process.append(model_path)
    return files_to_process

def shorten_path(path, levels=2):
    parts = path.replace("\\", "/").split("/")
    return "/".join(parts[-levels:])

def process_models(files_to_process):
    updated_files = 0
    for model_path in files_to_process:
        model_dir = os.path.dirname(model_path)
        name = os.path.basename(model_dir)
        motions_dir = os.path.join(model_dir, "motions")
        motion_files = [f for f in os.listdir(motions_dir) if f.endswith(".motion3.json")]

        tapbody_list, taphead_list = [], []
        for file in motion_files:
            base = file.replace(".motion3.json", "")
            if any(base == k or base.startswith(k) for k in tapbody_keys):
                tapbody_list.append({"Name": base, "File": f"motions/{file}"})
            if any(base == k or base.startswith(k) for k in taphead_keys):
                taphead_list.append({"Name": base, "File": f"motions/{file}"})

        with open(model_path, "r", encoding="utf-8") as f:
            old_data = json.load(f)

        moc = old_data["FileReferences"]["Moc"]
        textures = old_data["FileReferences"]["Textures"]
        physics = old_data["FileReferences"]["Physics"]
        model_name = old_data.get("Name", name)

        new_data = {
            "Version": 3,
            "Name": model_name,
            "FileReferences": {
                "Moc": moc,
                "Textures": textures,
                "Physics": physics,
                "Motions": {
                    "Idle": [{"Name": "idle", "File": "motions/idle.motion3.json"}],
                    "TapSpecial": [{"Name": "touch_special", "File": "motions/touch_special.motion3.json"}],
                    "TapBody": tapbody_list,
                    "TapHead": taphead_list
                }
            },
            "HitAreas": [
                {"Name": "Body", "Id": "TouchBody", "Order": 2, "Motion": "TapBody"},
                {"Name": "Special", "Id": "TouchSpecial", "Order": 3, "Motion": "TapSpecial"},
                {"Name": "Head", "Id": "TouchHead", "Order": 1, "Motion": "TapHead"}
            ],
            "Groups": [
                {"Target": "Parameter", "Name": "EyeBlink", "Ids": ["ParamEyeLOpen", "ParamEyeROpen"]},
                {"Target": "Parameter", "Name": "LipSync", "Ids": ["ParamMouthOpenY"]}
            ]
        }

        with open(model_path, "w", encoding="utf-8") as f:
            json.dump(new_data, f, indent=2, ensure_ascii=False)

        updated_files += 1

    messagebox.showinfo("完成", f"处理完成，共更新 {updated_files} 个 model3.json 文件。")

def select_folder():
    folder_selected = filedialog.askdirectory(title="选择目录 A")
    if not folder_selected:
        return

    files_to_process = collect_files(folder_selected)
    if not files_to_process:
        messagebox.showinfo("提示", "未找到可处理的 model3.json 文件。")
        return

    # 仅显示最后两级路径
    short_list = [shorten_path(p) for p in files_to_process]
    file_list_str = "\n".join(short_list)

    confirm = messagebox.askokcancel("确认处理以下文件？", file_list_str)
    if confirm:
        process_models(files_to_process)

# GUI 主程序
root = tk.Tk()
root.title("Model3 批量处理")
root.geometry("500x200")

btn = tk.Button(root, text="选择目录并处理", command=select_folder, width=35, height=2)
btn.pack(pady=50)

root.mainloop()
```





## 奇点时代(CrazyOnes) Spine/Live2D - 无加密 - 可更新 简单

所有的模型绑定在了一个文件，还好这个文件比较小，每次更新按修改日期排序一下就知道哪个是新角色了。

国服，没外服，模拟器商店搜索下载

他这个更新不是碧蓝航线那个，按时间排序一下就知道哪个是新的了，所有的模型都绑定在了同一个模型。。。



### 路径

![image-20251029165540322](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510291655358.png)

### 导出

直接搜`spine`或者按照文件大小排序（在模拟器里面排序也可以，不用全部下载）

![image-20251029172007601](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510291720639.png)

筛选文件类型然后导出筛选的文件（根据后来的更新导出，我建议这里导出分类设置选择容器路径）

![image-20251029172448469](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510291724494.png)

导出后会在两个文件夹中`TextAsset` 和 `Texure2D`，合并到一个文件夹

然后按名称排序即可

![image-20251029172700802](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510291727838.png)

有的模型被分尸了，由好几个spine模型共同组成，需要合并起来，暂时没有找到合适的合并方法。

目前只能取Live2DViewerEX市场找处理好的模型，解包Lpk文件。

还有比较nc的部分就是有的skel对应的atlas文件不对，需要查看skel的内容看一下里面的部件和atlas是不是一样的。

### 处理脚本

模型文件分类sh脚本，可以把一个模型的文件放到一个文件夹，但是有些模型背景图的命名不规则，不能分类，只能自行分辨。

`SortByAtlas.sh`

```c
#!/bin/bash 

# === 配置 ===
SRC="$HOME/Desktop/mymodel/Test/TextAsset"
DRYRUN=0  # 1 = dry-run，仅显示，不移动；0 = 执行移动

cd "$SRC" || exit
shopt -s nullglob

files_to_move=()

# 扫描现有目录
existing_dirs=()
for d in */; do
    existing_dirs+=("${d%/}")  # 去掉末尾的 /
done

# 扫描 atlas 文件
atlas_files=(*.atlas)

if [ ${#atlas_files[@]} -gt 0 ]; then
    # 存在 atlas 文件，创建目录并归类
    for atlas in "${atlas_files[@]}"; do
        name="${atlas%.atlas}"
        echo "[DEBUG] detected atlas: $name"

        if [ ! -d "$name" ]; then
            echo "[DEBUG] creating folder: $name/"
            [ "$DRYRUN" -eq 0 ] && mkdir "$name"
        fi

        # 前缀匹配或包含 atlas 名称
        for f in "$name"*.*; do
            [ -e "$f" ] || continue
            files_to_move+=("$f -> $name/")
        done
        for f in *"$name"*.*; do
            [ -e "$f" ] || continue
            files_to_move+=("$f -> $name/")
        done
    done
else
    # 没有 atlas 文件，尝试归类非目录文件到已有目录
    echo "[DEBUG] 未找到 atlas 文件，尝试归类非目录文件..."
    for f in *.*; do
        [ -f "$f" ] || continue
        fname="${f%.*}"      # 去掉扩展名
        fname="${fname%%#*}" # 去掉 # 及之后部分

        # 尝试匹配现有目录
        matched_dir=""
        for d in "${existing_dirs[@]}"; do
            if [[ "$fname" == "$d"* ]]; then
                matched_dir="$d"
                break
            fi
        done

        if [ -n "$matched_dir" ]; then
            files_to_move+=("$f -> $matched_dir/")
        fi
    done
fi

# === 列出清单 ===
if [ ${#files_to_move[@]} -eq 0 ]; then
    echo "没有找到需要移动的文件。"
    exit 0
fi

echo "以下文件将被移动："
printf "%s\n" "${files_to_move[@]}"

# === 用户确认 ===
read -p "确认执行移动操作？(y/N) " confirm
if [[ "$confirm" =~ ^[Yy]$ ]]; then
    for move_entry in "${files_to_move[@]}"; do
        src_file="${move_entry%% -> *}"
        dest_dir="${move_entry##* -> }"
        echo "[DEBUG] mv \"$src_file\" -> \"$dest_dir\"/"
        [ "$DRYRUN" -eq 0 ] && mv "$src_file" "$dest_dir"/
    done
    echo "[DEBUG] 移动完成。"
else
    echo "操作已取消。"
fi
```



<img src="https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511071119122.png"/>

打开模型需要选择以上着色器（alpha预乘相关）



## 绯色回响(Echocalypse/绯红神约) Spine - png图片UF加密 - 可更新  麻烦

b服，直接b站搜就有apk下载，国服是和谐版的不过版本更领先，外服没有和谐，但是落后好几个版本。

外服[Download Echocalypse 2.0.70 Android APK File](https://apkpure.com/echocalypse/com.yoozoo.jgame.global/download)

### 路径

把后缀改为rar直接打开，这两个目录就是Spine模型，

![image-20251029180558820](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510291805856.png)

很遗憾这两个文件夹里只有一小部分的Spine，原因很简单，因为剩余的资源应该是需要你热更新下载的

所以还需要安装。。。然后更新

开启模拟器root权限

![image-20251030004547037](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510300045107.png)

使用自带的`root explorer`访问data文件夹

![image-20251030004701930](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510300047028.png)

找到以下路径，长按`knight_spine`选择压缩。

![image-20251030004516882](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510300045060.png)

![image-20251030005136125](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510300051190.png)

压缩后会自动存放到以下目录

![image-20251030005203202](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510300052254.png)

![image-20251112010021411](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511120100473.png)

然后复手动制到共享文件夹中移动到PC。



![image-20251030005547527](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510300055577.png)

### 处理脚本

这个游戏的spine模型纹理图都被加密了，无法直接打开，尝试解密。

解密方法来自https://live2dhub.com/t/topic/2984/17

这里还需要使用TexturePacker

[texturepacker汉化版下载 texturepacker(图片资源打包器) v7.0.3 汉化安装版(附使用教程) 64位 下载-脚本之家](https://www.jb51.net/softs/735004.html)

但是呢这个激活版本有点问题，有的时候会解密失败提示需要购买许可证。。。但是我对这个失败的模型单独尝试了一次，发现又解密成功了，不知道是不是他这个py脚本有点问题。

另外一个激活方式，有点麻烦，需要编译dll

[TexturePackerGUI pro学习版 - tieyan - 博客园](https://www.cnblogs.com/tieyan/p/16857659.html)

正常下载完TexturePacker

然后把bin加入Path环境变量，因为这个py脚本会调用CLI

![image-20251029195806429](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510291958489.png)



目录结构：

![image-20251030152653148](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510301526221.png)

如果解密失败了就会只有纹理图的形状，然后会贴上水印，这个情况经常有出现。

目前的处理方式就是找到源文件重新用脚本单独处理一次。

![image-20251030103420692](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510301034921.png)



`decrypt_png_new.py`

```python
import os, sys

DAT_0180ac00 = [19, 91, 12, 13, 102, 22, 34, 43, 17, 25, 88, 64, 36, 16, 14, 66,
                49, 87, 56, 44, 53, 28, 11, 5, 116, 37, 58, 105, 20, 15, 77, 7, 29,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19, 91, 12, 13, 102, 22,
                34, 43, 17, 25, 88, 64, 36, 16, 14, 66, 49, 87, 56, 44, 53, 28, 11, 5,
                116, 37, 58, 105, 20, 15, 77, 7, 29, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0]

for subdir, dirs, files in os.walk(os.getcwd()):
    for file in files:
        # print os.path.join(subdir, file)
        filepath = subdir + os.sep + file

        if filepath.endswith(".png"):

            t = open(filepath, "rb").read()
            t = bytearray(t)

            if (t[0] == 85) and (t[1] == 70):  # U and F
                size = len(t)
                k = t.copy()
                off = 5
                b = t[4]
                if (t[size - 13] == 73) and (t[size - 12] == 69):

                    # for i in range(off):
                    # k[i] = t[size - off + i] ^ DAT_0180ac00[b + i]
                    k[0] = 137
                    k[1] = 80
                    k[2] = 78
                    k[3] = 71
                    k[4] = 13

                else:
                    k[0] = 67
                    k[1] = 67
                    k[2] = 90
                    k[3] = 33
                    k[4] = 0

                for i in range(off, min(0x64, size)):
                    k[i] = k[i] ^ DAT_0180ac00[(i + b) % 0x21]

                open(filepath, "wb").write(k)

                if (k[0] == 67) and (k[1] == 67):

                    base_file, ext = os.path.splitext(filepath)
                    if ext == ".png":
                        os.rename(filepath, base_file + ".pvr.ccz")

for subdir, dirs, files in os.walk(os.getcwd()):
    for file in files:
        # print os.path.join(subdir, file)
        filepath = subdir + os.sep + file
        ext = filepath.split('.')
        newpath = ext[0] + '.png'
        ext2 = ext[1]

        print(filepath)
        if ext2 == "pvr":
            command = "cmd /c TexturePacker" + " " + filepath + " " + "--sheet" + " " + newpath + " --data dummy.plist --algorithm Basic --allow-free-size --no-trim --max-size 102400"
            print(command)

            os.system(command)
```

`delete_pvr.ccz`删除备份文件/中间文件，如果确定所有的png都解密成功就可以执行这个脚本把多余的文件删了。

```python
import os

def delete_pvr_ccz_files():
    # 獲取目前工作目錄
    current_dir = os.getcwd()
    print(f"Scanning directory: {current_dir}")

    # 遍歷目錄樹
    for dirpath, dirnames, filenames in os.walk(current_dir):
        for file in filenames:
            if file.endswith(".pvr.ccz"):  # 篩選 .pvr.ccz 檔案
                file_path = os.path.join(dirpath, file)
                try:
                    os.remove(file_path)  # 刪除檔案
                    print(f"Deleted: {file_path}")
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")

# 呼叫函式
delete_pvr_ccz_files()

```



这个resize操作好像不是必要的，大部分图片尺寸只是多了2个像素点，按照spine的纹理集的算法，只要png的尺寸(如2050 x 2050)不小于atlas中的参数(如2048 x 2048)即可

`png_resize.py`

```python
import os
import re
from PIL import Image

def resize_image_nearest(image_path, new_size, output_path):
    image = Image.open(image_path)
    resized_image = image.resize(new_size, Image.NEAREST)
    resized_image.save(output_path)


spine_folder = os.getcwd()
atlas_files = []

for root, dirs, files in os.walk(spine_folder):
    for file in files:
        if file.endswith(".atlas"):
            atlas_files.append(os.path.join(root, file))

for atlas_file in atlas_files:
    with open(atlas_file, "r",encoding="utf-8") as file:
        lines = file.readlines()

    current_image = None
    correct_size = None

    image_pattern = re.compile(r'([^#]+)\.png')
    size_pattern = re.compile(r'size:\s*(\d+),\s*(\d+)')

    for line in lines:
        image_match = image_pattern.search(line)
        size_match = size_pattern.search(line)

        if image_match:
            current_image = image_match.group(1) + ".png"
        elif size_match:
            width, height = map(int, size_match.groups())
            correct_size = (width, height)
            if current_image and correct_size:
                image_path = os.path.join(os.path.dirname(atlas_file), current_image)
                if os.path.exists(image_path) and Image.open(image_path).size != correct_size:
                    print(f"缩放 {image_path} 到 {correct_size} ")
                    resize_image_nearest(image_path, correct_size, image_path)
                current_image = None
                correct_size = None
```





## 银与绯(Silver and Blood)  Spine - FakeHeader - 可更新 简单

官服下载，最好下PC版本的（模拟器改文件有点麻烦），20G大小。。。

[银与绯-暗黑哥特幻想RPG](https://yyf.moonton.com/)

![image-20251030182434429](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510301824751.png)

### 3D模型路径

先修改和谐文件配置：local -> global 找到如下文件

![image-20251030214022273](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510302140314.png)

把内容修改为以下代码，也就是把`local` 更改为 `global`，**不需要加任何其他东西**，注意**等号后面有个空格**。

```c
resourceVersion = global
```


下载完之后打开游戏目录，按照文件夹大小一路找最大的找到如下路径

![image-20251030212057487](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510302120545.png)

模型大概率就在ABResource里面，但是这里的资源文件并不是常规的bundle文件，只有unity3d文件而且非常多

![image-20251030212244185](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510302122224.png)

看了下立绘的风格，应该是spine，搜索一下关键词，找到了画布，可以确定这里的立绘大部分是spine的。

开始筛选文件，根据以往的经验，这些立绘肯定不会放在一个文件里，大概的大小是5M~20M左右，命名应该是相对统一的。

按照名称排序，可以找到这些C开头的文件：

可以猜测Base应该是指的角色初级形态，final是最终形态。

![image-20251030213758891](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510302137960.png)

中间的应该是人名，打开`silver and blood wiki`找一下角色人名

[Category:Characters - Silver and Blood Wiki](https://silverandblood.wiki.gg/wiki/Category:Characters)

可以发现`Ami` `Aiona`等人名能够对应上，所以可以确定C表示`Character`，这些文件很有可能就是Spine模型的打包，事情真的会有这么顺利吗？

![image-20251030214255817](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510302142900.png)

### 解密

尝试解包`unity3d`文件，用常规的AssetStudio都不行，应该是加密过了。

绷不住了，用Raz版AssetStudio指定加密游戏类型试出来了。。。笑了:smile:

`Options > Specify Game > Anchor Panic`指定游戏是`Anchor Panic`(锚点降临)

Ok下一个游戏就干这个

不过打开一看发现这个贴图应该是游戏内3D建模贴图。。。走错路了。

![image-20251031000428346](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510310004389.png)

![image-20251031000320941](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510310003107.png)

### Spine模型路径

去根目录下搜一下人名`Hati`，根据这个大小和命名方式啊，不难判断应该是这个文件。

![image-20251031001104827](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510310011880.png)

`.\SilverAndBlood\SilverAndBlood_Data\dragon2019\assets\Global_Res\HQ\UI`

注意这里是`Global_Res`

这里的`dragon2019`就是之前修改和谐文件配置的时候的目录。

与之前文件命名风格一致，后面的3kb的hero_place前缀文件并不需要，按需提取。

![image-20251031105110007](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510311051083.png)

使用AS导出，同样选择过滤`TextAsset` `Texture2D`

藏的确实有点深，可以看到用的spine版本是`4.1.24`

这里的Spine没有自带背景图片，应该是放在了别的地方。

![image-20251031001413056](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510310014140.png)

### 导出处理

选择导出分类为按照源文件名字分类

![image-20251031112221899](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510311122951.png)

这样导出来的目录结构就是

```c
D:\Assets\
 ├─ acappella_base.unity3d_export\
 │   └─ CAB-15287f506ab9b838a573d4862420933f\
 │       ├─ a.skel
 │       ├─ a.atlas
 │       └─ a.png
 ├─ other_model.unity3d_export\
 │   └─ CAB-xxxxxx\
 │       └─ c.png
```

然后我们只要把根目录的`.unity3d_export`删除，然后把CAB目录的文件移动到根目录即可

处理前目录结构：

![image-20251031114010533](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510311140580.png)

处理后：

![image-20251031115052186](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510311150228.png)

![image-20251031115116416](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510311151463.png)

`ProcessDir.bat` 根目录的`.unity3d_export`删除，然后把CAB目录的文件移动到根目录

```bash
@echo off
setlocal enabledelayedexpansion

REM 当前目录
set ROOT=%cd%

for /d %%A in (*.unity3d_export) do (
    echo [INFO] Process Dir: %%A

    REM 获取不带后缀的新目录名
    set NAME=%%A
    set NEWNAME=!NAME:.unity3d_export=!

    REM 如果新目录不存在则重命名
    if not exist "!NEWNAME!" (
        ren "%%A" "!NEWNAME!"
    )

    REM 进入目录查找 CAB-* 子目录
    pushd "!NEWNAME!"
    for /d %%B in (CAB-*) do (
        echo [INFO] Move CAB Files: %%B
        move "%%B\*" ".\" >nul 2>&1
        rd "%%B"
    )
    popd
)

echo OK!
pause
```

导出发现`skel` `atlas`文件后面带了一个`prefab`后缀，需要删除。

`Delete_prefab_Suffix.bat`

```bash
@echo off
setlocal enabledelayedexpansion

echo ================================================
echo [INFO] Delete .prefab suffixes
echo ================================================

REM 遍历当前目录及所有子目录中的 .prefab 文件
for /r %%F in (*.prefab) do (
    set "FULLPATH=%%~fF"
    set "DIR=%%~dpF"
    set "NAME=%%~nF"

    echo [RENAME] %%~nxF → !NAME!
    ren "%%F" "!NAME!"
)

echo ================================================
echo [DONE] All .prefab files were renamed！
pause
```

![image-20251031120152516](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510311201560.png)



## 锚点降临(Anchor Panic) Spine - FakeHeader - 可更新 简单

草台班子，PC版下不了。

下载官服，没有和谐。模拟器上直接搜就行，反正注意不要下到渠道服。

mumu模拟器下载的是过时的版本，然后会跳转到TapTap下载。。。服了，这里用Qoo下载的。

热更新资源只有5G，比我料想的少得多，还不错。

有一部分的立绘还是挺可以的，比较符合审美。另一部分就比较潦草了。

![image-20251107184257398](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511071842622.png)

![image-20251107172909000](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511071729189.png)

### Spine路径

#### 静态资源（只需要下一次）

可能是某些基础角色的展示，这个部分基本不会再更新了。

打开apk安装包（后缀改成rar）

在这个路径，排序一下找到spine关键字就能找到目标文件。

![image-20251101120204610](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511011202758.png)

#### 热更新资源（后续可能会更新）

后续游戏的新角色应该会放在这里。

![image-20251101110306391](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511011103461.png)

这个路径下的文件就是资源文件。

安装游戏然后开始下载，看下这个路径有没有spine关键字文件

搜索`spine`得到目标文件

![image-20251101110330618](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511011103672.png)

#### 合并资源

把这两个部分放一起

2025.11.1 有115个文件k文件资源

### 解密-FakeHeader

Raz版AS选择`Options > Specify Game > FakeHeader`

### 批量处理

过滤选择`TextAsset` `Texture`导出

把所有文件的`.asset` `.prefab`后缀都删除

后无后缀的文件就是骨骼文件，不过是json格式的，所以需要添加`.json`后缀

![image-20251101111157476](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511011111857.png)

![image-20251101112701301](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511011127595.png)

## 无期迷途(PathToNowhere)  Live2D XOR-FakeHeader加密 - 可更新 麻烦

获取新模型有点麻烦，但是这个立绘的质量太值了。

下载资源13G，模拟器国服，反和谐。

2025.11.4-19:51

展示成果先，目前已经更新的L2D都找到了。

![image-20251104193804247](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511041938746.png)

论坛里有人求的浪里白条

![image-20251104195117869](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511041951144.png)

[禁闭者 - 无期迷途WIKI_BWIKI_哔哩哔哩](https://wiki.biligame.com/wqmt/禁闭者)可以搜角色，然后看英文名

比较傻鸟的几个名字对照，但是它游戏文件里有的就用拼音。。。

1. 安-Anne / tuoqier （可能是真名吧）
2. 观星者-Anarkia（可能是真名吧）
3. 白逸-Bai Yi/linglan （可能是真名吧）
4. 卡门奈特-Cab/Cabernet 省略了一半
5. 卡米利安-Chameleon 为什么不是卡密利涅
6. 科希-Crache 英文是痰的意思。。
7. 切尔西伯爵-Countess Chelsea/fupo  夹带私货了（富婆）
8. 伊琳娜-Eirene/heli （可能是真名吧）
9. 雷温-Eleven （内涵怪奇物语11？）
10. 加洛法诺-Garofano（意大利语-康乃馨）
11. 伊帕希娅-Hypatia （世界上第一位女数学家）
12. 伊格尼-Ignis/eagle
13. 伊蕾娅-Irrheia
14. 茉莉-Jasmine （直译）
15. 雷比尼斯-Labyrinth/renou （可能是真名吧）
16. 拉弥亚- Lamia/拉弥业
17. 露薇娅·蕾 -  Luvia Ray/luweiyalei
18. L.L-小写的ii，看着像II
19. 丽莎-Monalisa （蒙娜丽莎）
20. 麦昆-Mcqueen
21. 赫罗-Mojila
22. 佩姬-Peggy/qiao （可能是真名吧）
23. 普希拉-Peggi （竟然不是佩姬）
24. 派尔琪雅-Pylgia
25. 芭·菲-Parfait （巴菲特）
26. 罗睺-Rahu
27. 露莉艾卡-Roulecca / kuangdu  （狂赌）
28. 渡鸦-Raven （谐音雷温。。）
29. 瑞思-Rise （算音译么。。）
30. 娜恰-Snake （本体是蛇）
31. 瑟琳-Shalom
32. 源津-Shin
33. 蓟-Thistle （直译）
34. 维多利亚-Victoria/bai （可能是真名吧）
35. 蓝鹫 - Vautour Bleu （法语）
36. 曜-Yao （卧槽，农）
37. 萦萦-yingying （gxyy）

目前解的槽点最多的游戏。。。

国服真是b事多，导出来缺这缺那。。。建议下载外服。



内存24G以上，16G内存不建议尝试，电脑容易卡死，24G内存解包完都卡的批爆。

[夸克网盘分享](https://pan.quark.cn/s/99196abab745#/list/share) Liv2D资源 2025-2更新，来自网友[无期迷途解包 - 讨论 - Live2DHub](https://live2dhub.com/t/topic/4114)



[无期迷途即将下架皮肤一览_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1uCSaYBEcc?spm_id_from=333.788.recommend_more_video.0&trackid=web_related_0.router-related-2206146-j9vhc.1762012978487.264&vd_source=cc62639f8cba7649c1be3fdeff181bb1)

目前下架皮肤全在。

参考教程：

[无期迷途解包教程 - 哔哩哔哩](https://www.bilibili.com/opus/1003619413382922275)

[无期迷途解包问题 - 讨论 - Live2DHub](https://live2dhub.com/t/topic/2636/11)

### 反和谐

国际服比国服晚3个月，没有和谐。

目标文件`localize_settings.json`路径

![image-20251101225959285](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511012259349.png)

修改为以下内容（true改为false），如果模拟器内不能修改就复制一份到PC然后改好替换文件。

```json
{
  "IsLocalize": false
}
```

然后打开游戏，就会发现自动更新了一个`fs_anti`文件夹

![image-20251101230318625](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511012303691.png)

说明修改成功了，打开这个文件夹也可以看到有`anti_harmony`字样的文件。

![image-20251101230916420](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511012309488.png)

### Live2D路径（重点）

真想吐槽一下他这个游戏的资源修复功能，竟然是把文件删了重下！我还想着反和谐了要不要修复下资源，byd重新下载13G文件:angry:

==重点来了==

如果你单独提取了下面的三个部分的哪个部分，你都无法得到一个完整、正常的模型。

找到这个目录，这个是常规资源Part1，应该说这个是热更新资源，最近的修改是10.24

`Android > data > com.zy.wgmt.cn > files > fs > asset`

这个是常规资源Part2，这个应该是静态资源，上一次修改是在4.16

`Android > data > com.zy.wgmt.cn > files > fstier1 > asset`

先把Part1和Part2合并，选择替换重复文件（如果有），把这个合并的文件放到同一个文件夹fs里面。

![image-20251103200829492](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511032008532.png)

这个是反和谐资源，就6个模型，这是Part3

`Android > data > com.zy.wgmt.cn > files > fs_anti`

这个不要合并，单独提取，会提取出来没加布料的贴图，替换和谐过的贴图即可，其他文件不要替换！

> 因为这里我用国际服合并的Part1 Part2导出的模型是完整的，只是国际服版本落后3个月，所以少了几个模型，国服我合并了三个Part然后导出来的模型是全的，但是很多模型少了动作！！！所以我猜测第三个部分是特殊和谐资源，不能和主体合并。

到这里合并完成后就可以使用特供版AS一键导出了。



Raz版本的AS没有一键导出Live2D模型，能导出模型的就不能解密。。。

去找一个能解密还能导出Live2D模型的版本

欸，还真有`AssetStudioModGUI_PtN_net6_win64`

这个版本的AS是无期迷途特供版本PtN，会自动解密，识别了FakeHeader，然后还会自动处理motion的hash参数，也就是说如果你用这个版本，下面的解密都不需要了，太吊了。

比较脑残的是他的GUI和后台不会一起关闭（只显示GUI，CLI不显示），也就是说你把GUI关了没用，后台还会运行。要去任务管理器把它关掉。

下面是特供版AS

谷歌[无期迷途 - Google Drive](https://drive.google.com/drive/folders/1J6XrLk0rkyBBTs832AMC4qTWvGluPyNH)

百度网盘链接: https://pan.baidu.com/s/18dJhlonBf2YPKjLIqDGMbw 提取码: njrj 



不看解密可以跳到  [直接导出](#直接导出)

### 解密 XOR - FakeHeader （选看）

开始正题，最后的哈希我也没找到合适的处理方法，所以有点烂尾。。

加密方式为XOR加密然后再用FakeHeader处理。有一部分是FakeHeader，另一部分不清楚是什么。

先用XOR处理加密

`DecryptXORTest.py`

```python
import os
import struct


class BundleDecryptor:
    def __init__(self):
        self.total_bundles = 0
        self.success_count = 0
        self.error_count = 0

    def analyze_encryption(self, data):
        """分析加密模式"""
        print("分析文件加密模式...")

        # 检查文件头
        header = data[:100]
        print(f"文件头 (hex): {header[:50].hex()}")
        print(f"文件头 (ascii): {''.join(chr(b) if 32 <= b < 127 else '.' for b in header[:50])}")

        # 查找可能的模式
        patterns = {}
        for i in range(len(data) - 4):
            pattern = data[i:i + 4]
            patterns[pattern] = patterns.get(pattern, 0) + 1

        # 打印最常见的模式
        common_patterns = sorted(patterns.items(), key=lambda x: x[1], reverse=True)[:10]
        print("常见字节模式:")
        for pattern, count in common_patterns:
            print(f"  {pattern.hex():8} - 出现 {count} 次")

        return common_patterns

    def try_xor_decryption(self, data, key=None):
        """尝试XOR解密"""
        if key is None:
            # 尝试自动检测key
            possible_keys = []
            for test_key in range(256):
                # 检查解密后是否包含Unity常见签名
                test_decrypt = bytes(b ^ test_key for b in data[:100])
                if b'Unity' in test_decrypt or b'UnityFS' in test_decrypt:
                    possible_keys.append(test_key)

            if possible_keys:
                key = possible_keys[0]
                print(f"检测到可能的XOR密钥: {key} (0x{key:02x})")
            else:
                # 使用统计方法找key
                key = self.find_xor_key_statistical(data)
                print(f"使用统计方法找到XOR密钥: {key} (0x{key:02x})")

        return bytes(b ^ key for b in data), key

    def find_xor_key_statistical(self, data):
        """使用统计方法查找XOR密钥"""
        # 假设空格(0x20)是最常见的字节
        byte_counts = [0] * 256
        for byte in data[:1000]:  # 只分析前1000字节提高速度
            byte_counts[byte] += 1

        # 找到最常见的字节，假设它是空格(0x20)加密后的结果
        most_common_byte = byte_counts.index(max(byte_counts))
        key = most_common_byte ^ 0x20

        return key

    def try_rolling_xor(self, data, key_sequence):
        """尝试滚动XOR解密"""
        result = bytearray()
        key_len = len(key_sequence)
        for i, byte in enumerate(data):
            result.append(byte ^ key_sequence[i % key_len])
        return bytes(result)

    def check_unity_signature(self, data):
        """检查Unity文件签名"""
        signatures = [
            b'UnityFS',
            b'UnityWeb',
            b'UnityRaw',
            b'UnityArchive'
        ]

        for sig in signatures:
            if sig in data[:100]:
                return True, sig
        return False, None

    def decrypt_and_save(self, file_path):
        """解密并保存文件"""
        self.total_bundles += 1
        print(f"\n处理文件: {os.path.basename(file_path)}")

        try:
            with open(file_path, "rb") as f:
                data = f.read()

            if len(data) < 100:
                print("文件太小，可能不是有效的bundle文件")
                self.error_count += 1
                return False

            # 分析加密模式
            self.analyze_encryption(data)

            # 尝试多种解密方法
            decrypted_data = None
            method_used = ""

            # 方法1: 简单XOR解密
            print("尝试XOR解密...")
            decrypted_data, xor_key = self.try_xor_decryption(data)
            is_unity, signature = self.check_unity_signature(decrypted_data)

            if is_unity:
                method_used = f"XOR (key: 0x{xor_key:02x})"
                print(f"✓ XOR解密成功! 检测到Unity签名: {signature}")
            else:
                # 方法2: 尝试带偏移的XOR
                print("尝试带偏移的XOR解密...")
                for offset in [50, 100, 200]:
                    if offset < len(data):
                        test_data = data[offset:]
                        test_decrypted, test_key = self.try_xor_decryption(test_data)
                        is_unity, signature = self.check_unity_signature(b' ' * offset + test_decrypted)
                        if is_unity:
                            decrypted_data = data[:offset] + test_decrypted
                            method_used = f"XOR with offset {offset} (key: 0x{test_key:02x})"
                            print(f"✓ 带偏移解密成功! 偏移: {offset}, 签名: {signature}")
                            break

            if decrypted_data and self.check_unity_signature(decrypted_data)[0]:
                # 保存解密后的文件
                decrypted_file_path = file_path + ".decrypted"
                with open(decrypted_file_path, "wb") as f:
                    f.write(decrypted_data)

                self.success_count += 1
                print(f"✓ 解密成功! 方法: {method_used}")
                print(f"  保存为: {os.path.basename(decrypted_file_path)}")
                return True
            else:
                print("✗ 所有解密方法都失败了")
                self.error_count += 1
                return False

        except Exception as e:
            print(f"✗ 处理文件时出错: {str(e)}")
            self.error_count += 1
            return False

    def process_directory(self, directory=None):
        """处理目录中的所有bundle文件"""
        if directory is None:
            directory = os.getcwd()

        bundle_files = []
        for root, dirs, files in os.walk(directory):
            for file in files:
                if file.endswith(".bundle") and not file.endswith(".decrypted"):
                    bundle_files.append(os.path.join(root, file))

        print(f"找到 {len(bundle_files)} 个bundle文件")

        for file_path in bundle_files:
            self.decrypt_and_save(file_path)

    def print_summary(self):
        """打印总结"""
        print(f"\n" + "=" * 50)
        print("解密完成总结:")
        print(f"总文件数: {self.total_bundles}")
        print(f"成功: {self.success_count}")
        print(f"失败: {self.error_count}")
        print("=" * 50)


def main():
    # 设置工作目录到脚本所在目录
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)

    print("Unity Bundle 文件解密工具")
    print("正在分析加密模式...")

    decryptor = BundleDecryptor()
    decryptor.process_directory()
    decryptor.print_summary()

    input("按回车键退出...")


if __name__ == "__main__":
    main()
```

![image-20251101234454758](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511012344854.png)

打开解密后，有些文件可以看到是FakeHeader，有一些是乱码

![image-20251101234756302](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511012347367.png)

乱码。

![image-20251121204441792](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511212044888.png)

所以再用AS选择FakeHeader打开文件。

### 解密后导出（hash没解出来）

在导入Unity时，model3.json和moc3都会被转换成MonoBehaviour，但是容器路径被处理了

并不是原生L2D的文件，所以没法直接导出。

建议导出目录选择为容器路径

![image-20251102120848438](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511021208497.png)

选择导出这三个部分导出。

1. Monobehaviour （需要的motions/moc3）
2. Animator （需要的fbx提取参数表）
3. Texture2D

![image-20251102121031062](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511021210123.png)

按大小排序，这个最大的json文件就是moc3文件。

![image-20251102120950724](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511021209781.png)



#### json转moc3

然后使用脚本提取moc3文件（把json文件的_bytes数组合并**合成完整的二进制文件**）。

```python
# Json2Moc3.py
import json
import os
import logging
from pathlib import Path
import sys


class Moc3Extractor:
    def __init__(self, output_folder=None):
        # 获取当前工作目录
        self.current_dir = Path.cwd()
        self.output_folder = output_folder or self.current_dir / "Extracted"
        self.extracted_count = 0
        self.failed_count = 0

        # 设置日志
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s'
        )
        self.logger = logging.getLogger(__name__)

    def find_json_files_with_bytes(self):
        """在当前目录和所有子目录中查找包含 _bytes 字段的 JSON 文件"""
        json_files = []

        self.logger.info(f"扫描目录: {self.current_dir}")
        self.logger.info("正在搜索包含 bytes 的 JSON 文件...")

        # 搜索当前目录和所有子目录
        for json_file in self.current_dir.rglob("*.json"):
            try:
                # 快速检查文件内容
                with open(json_file, 'r', encoding='utf-8') as f:
                    content_preview = f.read(2000)

                # 检查是否包含 bytes 相关字段
                if any(field in content_preview for field in ['"_bytes"', '"bytes"', '"m_Bytes"']):
                    json_files.append(json_file)
                    self.logger.debug(f"找到: {json_file.relative_to(self.current_dir)}")

            except UnicodeDecodeError:
                # 尝试其他编码
                try:
                    with open(json_file, 'r', encoding='utf-8-sig') as f:
                        content_preview = f.read(2000)
                    if any(field in content_preview for field in ['"_bytes"', '"bytes"', '"m_Bytes"']):
                        json_files.append(json_file)
                        self.logger.debug(f"找到 (UTF-8-BOM): {json_file.relative_to(self.current_dir)}")
                except:
                    continue
            except Exception as e:
                self.logger.warning(f"无法读取文件 {json_file}: {e}")
                continue

        self.logger.info(f"共找到 {len(json_files)} 个包含 bytes 的 JSON 文件")
        return json_files

    def extract_moc3_from_json(self, json_path):
        """从单个 JSON 文件提取 moc3"""
        try:
            relative_path = json_path.relative_to(self.current_dir)
            self.logger.info(f"处理: {relative_path}")

            # 尝试多种编码
            data = None
            for encoding in ['utf-8', 'utf-8-sig', 'gbk']:
                try:
                    with open(json_path, 'r', encoding=encoding) as f:
                        data = json.load(f)
                    break
                except UnicodeDecodeError:
                    continue

            if data is None:
                self.logger.error(f"无法解码文件: {json_path.name}")
                return False

            # 检查必要字段
            bytes_data = None
            if "_bytes" in data:
                bytes_data = data["_bytes"]
            elif "bytes" in data:
                bytes_data = data["bytes"]
            elif "m_Bytes" in data:
                bytes_data = data["m_Bytes"]
            else:
                self.logger.warning(f"跳过 {json_path.name}: 没有找到 bytes 字段")
                return False

            # 获取模型名称
            model_name = "unknown"
            if "m_Name" in data:
                model_name = data["m_Name"]
            elif "name" in data:
                model_name = data["name"]
            else:
                # 从文件名推断
                model_name = json_path.stem

            # 验证字节数据
            if not isinstance(bytes_data, list) or not all(isinstance(b, int) and 0 <= b <= 255 for b in bytes_data):
                self.logger.error(f"无效的字节数据: {json_path.name}")
                return False

            # 转换为二进制数据
            binary_data = bytes(bytes_data)

            if len(binary_data) < 1000:
                self.logger.warning(f"文件过小 ({len(binary_data)} 字节): {json_path.name}")

            # 生成输出文件名
            safe_filename = self.make_filename_safe(model_name)
            output_filename = f"{safe_filename}.moc3"

            # 创建以模型名命名的子目录
            character_dir = Path(self.output_folder) / safe_filename
            os.makedirs(character_dir, exist_ok=True)

            output_path = character_dir / output_filename

            # 处理重名文件
            output_path = self.resolve_filename_conflict(output_path)

            # 保存 moc3 文件
            with open(output_path, "wb") as f:
                f.write(binary_data)

            self.extracted_count += 1
            self.logger.info(
                f"✅ 成功提取: {model_name} -> {character_dir.name}/{output_path.name} ({len(binary_data)} 字节)")

            return True

        except json.JSONDecodeError as e:
            self.logger.error(f"JSON 解析错误 {json_path.name}: {e}")
        except KeyError as e:
            self.logger.error(f"字段缺失 {json_path.name}: {e}")
        except Exception as e:
            self.logger.error(f"处理失败 {json_path.name}: {e}")

        self.failed_count += 1
        return False

    def make_filename_safe(self, filename):
        """确保文件名安全"""
        invalid_chars = '<>:"/\\|?*'
        for char in invalid_chars:
            filename = filename.replace(char, '_')
        # 移除多余空格和点
        filename = filename.strip().rstrip('.')
        return filename

    def resolve_filename_conflict(self, filepath):
        """处理文件名冲突"""
        original_path = Path(filepath)
        counter = 1

        while original_path.exists():
            stem = original_path.stem
            suffix = original_path.suffix
            # 移除可能已有的编号
            if stem.endswith(f"_{counter - 1:02d}"):
                stem = stem[:-3]
            new_name = f"{stem}_{counter:02d}{suffix}"
            original_path = original_path.parent / new_name
            counter += 1

        return original_path

    def batch_extract(self):
        """批量提取所有 moc3 文件"""
        print(f"🚀 开始在当前目录搜索并提取 moc3 文件...")
        print(f"📁 当前目录: {self.current_dir}")
        print(f"💾 输出目录: {self.output_folder}")
        print("-" * 60)

        # 查找目标文件
        json_files = self.find_json_files_with_bytes()

        if not json_files:
            print("❌ 未找到包含 bytes 的 JSON 文件")
            print("请确保：")
            print("1. 脚本放在 AssetStudio 导出的文件夹中")
            print("2. 包含 .json 文件")
            print("3. JSON 文件中有 _bytes 字段")
            return

        # 创建输出目录
        os.makedirs(self.output_folder, exist_ok=True)

        # 处理每个文件
        successful_extractions = []

        for json_file in json_files:
            if self.extract_moc3_from_json(json_file):
                successful_extractions.append(json_file.name)

        # 生成报告
        # self.generate_report(successful_extractions)

    def generate_report(self, successful_files):
        """生成提取报告"""
        report_path = Path(self.output_folder) / "extraction_report.txt"

        with open(report_path, 'w', encoding='utf-8') as f:
            f.write("Live2D moc3 文件提取报告\n")
            f.write("=" * 50 + "\n")
            f.write(f"搜索目录: {self.current_dir}\n")
            f.write(f"输出目录: {self.output_folder}\n")
            f.write(f"成功提取: {self.extracted_count} 个文件\n")
            f.write(f"提取失败: {self.failed_count} 个文件\n\n")

            f.write("成功提取的文件:\n")

            # 获取所有角色目录
            character_dirs = [d for d in Path(self.output_folder).iterdir() if d.is_dir()]

            for character_dir in character_dirs:
                moc3_files = list(character_dir.glob("*.moc3"))
                if moc3_files:
                    f.write(f"\n角色: {character_dir.name}\n")
                    for i, moc3_file in enumerate(moc3_files, 1):
                        f.write(f"  {i:02d}. {moc3_file.name}\n")

        print(f"📊 提取报告已保存: {report_path}")


def main():
    """主函数"""
    print("🎯 Live2D moc3 文件自动提取工具")
    print("=" * 50)

    # 询问输出目录
    current_dir = Path.cwd()
    default_output = current_dir / "ExtractedMoc3"

    user_output = input(f"请输入输出目录 (直接回车使用默认: {default_output}): ").strip()
    if user_output:
        output_folder = Path(user_output)
    else:
        output_folder = default_output

    # 创建提取器并运行
    extractor = Moc3Extractor(output_folder)
    extractor.batch_extract()

    # 显示总结
    print("\n" + "=" * 50)
    print("🎉 提取完成!")
    print(f"✅ 成功: {extractor.extracted_count} 个文件")
    print(f"❌ 失败: {extractor.failed_count} 个文件")
    print(f"💾 输出到: {output_folder}")

    # 显示生成的目录结构
    if extractor.extracted_count > 0:
        print("\n📁 生成的目录结构:")
        character_dirs = [d for d in Path(output_folder).iterdir() if d.is_dir()]
        for character_dir in character_dirs:
            moc3_files = list(character_dir.glob("*.moc3"))
            print(f"  {character_dir.name}/")
            for moc3_file in moc3_files:
                print(f"    └── {moc3_file.name}")


if __name__ == "__main__":
    main()
```

现在得到了moc3文件就可以让模型呈现静态场景了，但是还需要动作。

![image-20251102114948690](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511021149782.png)

#### .fade.json转motion3.json（hash没解出来）

这个是js脚本，用以下命令执行（需要nodejs环境）

```js
node Fade2Json.js
```

`Fade2Json.js`

原先的版本里写的是`ParameterIds`但是实际上fade文件hash了这个字段，所以需要更改为`ParameterIdHashes`

```js
const fs = require('fs');
const path = require('path');

function processFadeFiles(dirPath) {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            processFadeFiles(filePath);
        } else if (file.endsWith('.fade.json')) {
            const fileName = path.basename(file, '.fade.json');
            const data = fs.readFileSync(filePath, 'utf8');
            const obj = JSON.parse(data);
            const motion3Json = {
                'Version': 3,
                "Meta": {
                    "Duration": 0.000,
                    "Fps": 60.0,
                    "Loop": true,
                    "AreBeziersRestricted": true,
                    "CurveCount": 0,
                    "TotalSegmentCount": 0,
                    "TotalPointCount": 0,
                    "UserDataCount": 1,
                    "TotalUserDataSize": 0
                },
                "Curves": [],
                "UserData": [
                    {
                        "Time": 0.0,
                        "Value": ""
                    }
                ]
            };
            
            let TotalSegmentCount = 0
            let maxTime = 0.0
            for (let i = 0; i < obj.ParameterCurves.length; i++) {
                let Segments = []
                for (let j = 0; j < obj.ParameterCurves[i].m_Curve.length; j++) {
                    TotalSegmentCount++;
                    Segments.push(obj.ParameterCurves[i].m_Curve[j].time ?? 0)
                    Segments.push(obj.ParameterCurves[i].m_Curve[j].value ?? 0)
                    Segments.push(obj.ParameterCurves[i].m_Curve[j].weightedMode ?? 0)
                    maxTime = maxTime > obj.ParameterCurves[i].m_Curve[j].time ? maxTime : obj.ParameterCurves[i].m_Curve[j].time
                }
                Segments.pop()
                motion3Json.Curves.push({
                    "Target": "Parameter",
                    "Id": obj.ParameterIdHashes[i],
                    "Segments": Segments
                })
            }
            motion3Json.Meta.CurveCount = obj.ParameterIdHashes.length
            motion3Json.Meta.Duration = maxTime
            motion3Json.Meta.TotalSegmentCount = TotalSegmentCount
            motion3Json.Meta.TotalPointCount = obj.ParameterIdHashes.length + TotalSegmentCount
            fs.writeFileSync(path.join(dirPath, `${fileName}.motion3.json`), JSON.stringify(motion3Json, '\t'));
            console.log(path.join(dirPath, `${fileName}.motion3.json`) + "已生成");
        } else if (file.endsWith('CubismPhysicsController.json')) {
            const data = fs.readFileSync(filePath, 'utf8');
            const obj = JSON.parse(data);
            let physicsJson = {
                "Version": 3,
                "Meta": {
                    "PhysicsSettingCount": 0,
                    "TotalInputCount": 0,
                    "TotalOutputCount": 0,
                    "VertexCount": 0,
                    "Fps": 0,
                    "EffectiveForces": {
                    },
                    "PhysicsDictionary": [
                    ]
                },
                "PhysicsSettings": []
            }
            physicsJson.Meta.EffectiveForces.Gravity = obj?._rig?.Gravity
            physicsJson.Meta.EffectiveForces.Wind = obj?._rig?.Wind
            physicsJson.Meta.Fps = obj._rig.Fps ?? 60
            for (let i = 0; i < obj._rig?.SubRigs?.length ?? 0; i++) {
                let physicsSetting = {
                    "Id": "PhysicsSetting",
                    "Input": [
                    ],
                    "Output": [
                    ],
                    "Vertices": [
                    ],
                    "Normalization": {
                    }
                }
                let rig = obj._rig.SubRigs[i]
                physicsSetting.Id = physicsSetting.Id + (i + 1)
                physicsJson.Meta.PhysicsDictionary.push({
                    "Id": physicsSetting.Id,
                    "Name": i + 1 + ""
                })
                for (let j = 0; j < rig?.Input.length ?? 0; j++) {
                    physicsSetting.Input.push({
                        "Source": {
                            "Target": "Parameter",
                            "Id": rig.Input[j].SourceId
                        },
                        "Weight": rig.Input[j].Weight,
                        "Type": rig.Input[j].AngleScale || rig.Input[j].AngleScale === 0 ? "Angle" : "X",
                        "Reflect": false
                    })
                }
                for (let j = 0; j < rig?.Output.length ?? 0; j++) {
                    physicsSetting.Output.push({
                        "Destination": {
                            "Target": "Parameter",
                            "Id": rig.Output[j].DestinationId
                        },
                        "VertexIndex": 1,
                        "Scale": rig.Output[j].AngleScale ?? 1,
                        "Weight": rig.Output[j].Weight,
                        "Type": rig.Output[j].AngleScale || rig.Output[j].AngleScale === 0 ? "Angle" : "X",
                        "Reflect": false
                    })
                }
                for(let j = 0; j < rig?.Particles?.length; j++) {
                    physicsSetting.Vertices.push(                        {
                        "Position": rig?.Particles[j].InitialPosition,
                        "Mobility": rig?.Particles[j].Mobility,
                        "Delay": rig?.Particles[j].Delay,
                        "Acceleration": rig?.Particles[j].Acceleration,
                        "Radius": rig?.Particles[j].Radius
                    })
                }
                physicsSetting.Normalization = rig.Normalization
                physicsJson.PhysicsSettings.push(physicsSetting)
            }
            fs.writeFileSync(path.join(dirPath, `l2d.physics3.json`), JSON.stringify(physicsJson, '\t'));
            console.log(path.join(dirPath, `l2d.physics3.json`) + "已生成");
        }
    }
}

processFadeFiles(__dirname);
```

使用脚本将`.fade.json` 转换为`.motion3.json`，但是这里的motion还是无法直接使用因为不是标准形式。

处理hash的思路是统计参数出现次数然后生成字典，尝试不同hash函数破解。

需要用原始的参数名还原，但是这些参数非常多而且不标准，需要用moc3文件输出所有的参数名

这里有304个参数。

![image-20251103001829687](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511030018729.png)

这里可以利用导出的Animator提取二进制中可见的`Param`关键字词语。

`GetParams.py`

```js
import re

# 你的 FBX 路径
fbx_path = r""

with open(fbx_path, "rb") as f:
    data = f.read()

# 提取所有可见字符串（至少3个字符的连续可打印字符）
strings = re.findall(rb"[ -~]{3,}", data)

# 转换为字符串并筛选出包含 "Param" 的
params = set()
for s in strings:
    try:
        text = s.decode("utf-8", errors="ignore")
        if "Param" in text:
            params.add(text)
    except UnicodeDecodeError:
        continue

# 输出结果
print("🔍 提取到的 Param 相关字符串：")
for p in sorted(params):
    print(p)

print(f"\n共 {len(params)} 个参数候选")
```

恰好是304个参数

![image-20251103004117886](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511030041943.png)

然后再用这些参数名作为字典，破解hash，利用脚本得到真正的`.motion3.json`

统计所有的hash出现次数，尝试破解哈希。

```json
[
    10986758287809711702,
    56
  ],
  [
    10530568129694607500,
    56
  ],
  [
    194374343978333212,
    56
  ],
  [
    8289103770637769511,
    56
  ],
  [
    1679709600227649604,
    55
  ],
```

猜测出现频率最高的hash对应可能的参数

```json
ParamAngleX
ParamAngleY
ParamEyeLOpen
ParamBreath
ParamEyeROpen 
ParamBodyAngleX
ParamBodyAngleY
```

目前尝试了常见的hash函数都没求出来，但是找到了一些可能有用的规律：

1. 所有的hash值都是长度18~20位的正整数
2. 参数一定是`Param`前缀的驼峰命名字符串。
3. …

未完待续。。。

#### 生成model3.json

可以用L2DViewer生成配置文件model3.json，或者参考下面的标准游戏文件。

```json
{
  "Version": 3,
  "Name": "char2d_ll_3",
  "FileReferences": {
    "Moc": "char2d_ll_3.moc3",
    "Textures": [
      "textures/texture_00.png"
    ],
    "Physics": null,
    "Motions": {
      "clip_ll_background": [
        {
          "File": "motions/clip_ll_background.motion3.json"
        }
      ],
      "clip_ll_boring": [
        {
          "File": "motions/clip_ll_boring.motion3.json"
        }
      ],
      "clip_ll_click_body1": [
        {
          "File": "motions/clip_ll_click_body1.motion3.json"
        }
      ],
      "clip_ll_click_body2": [
        {
          "File": "motions/clip_ll_click_body2.motion3.json"
        }
      ],
      "clip_ll_click_ear": [
        {
          "File": "motions/clip_ll_click_ear.motion3.json"
        }
      ],
      "clip_ll_click_head": [
        {
          "File": "motions/clip_ll_click_head.motion3.json"
        }
      ],
      "clip_ll_click_interactivearea": [
        {
          "File": "motions/clip_ll_click_interactivearea.motion3.json"
        }
      ],
      "clip_ll_greet": [
        {
          "File": "motions/clip_ll_greet.motion3.json"
        }
      ],
      "clip_ll_idle": [
        {
          "File": "motions/clip_ll_idle.motion3.json"
        }
      ],
      "clip_ll_level": [
        {
          "File": "motions/clip_ll_level.motion3.json"
        }
      ]
    },
    "Expressions": []
  },
  "Groups": [
    {
      "Target": "Parameter",
      "Name": "EyeBlink",
      "Ids": [
        "ParamEyeROpen",
        "ParamEyeLOpen"
      ]
    },
    {
      "Target": "Parameter",
      "Name": "LipSync",
      "Ids": [
        "ParamMouthOpenY0"
      ]
    }
  ]
}
```

### 直接导出

`export > Live2D Cubsim Model`

合并了`fs`和`fstier1`后用PtN特供版AS直接导出。

2025.11.4 导出233个L2D模型（仅包括角色）。

### 最新方法

2025.11.10更新了蓝鹫的皮肤。实际上皮肤文件是11.6更新的这三个。

![image-20251118200801886](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511182008959.png)

但是如果你用AS单独提取是无法识别L2D模型的，需要再和`c45e2dbc0ac4e142.bundle`一起提取，这个文件应该在fs或者fstier1目录下面，可以搜一下。

可以理解`c45e2dbc0ac4e142`是一个辅助文件，PtN版AS需要读这个文件来识别模型，具体原因还不清楚。

这就是为什么之前两个Part的文件单独提取无法识别L2D模型。

![image-20251118201417665](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511182014224.png)

等11.20大更新，再次验证。

11.20更新是包体更新，需要重下游戏，文件在fs目录下，证实了`c45e2dbc0ac4e142`是辅助文件，解出了这次更新的几个皮肤，卓娅的红颜色的皮肤打开有点问题，需要用PS把纹理图的黑色色块擦掉，不然全挡住了。

![image-20251121123056618](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511211230847.png)

同时得出结论：后续更新的皮肤都会在fs路径下。

![image-20251121122506093](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511211225184.png)



## 星落（Elpis） Spine - FakeHeader-UnityCN加密 - 懒得更

可能缺了，因为我没有合并APK的静态资源。。

模拟器搜索下载就行，也没和谐。

很多立绘AI味有点重，一般般。下面这个还挺好看的。

![image-20251105105934862](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511051059203.png)

![image-20251105105438238](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511051054506.png)

[星落解包方法 - 讨论 - Live2DHub](https://live2dhub.com/t/topic/3380)

有高人搞定了，基本就是抄作业时间了。当然其实也就是FH和CN加密。

又下了一个新版的AS

[Release v1.38.10 Release · AXiX-official/Studio](https://github.com/AXiX-official/Studio/releases/tag/v1.38.10)

### 路径

![image-20251104234400088](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511042344162.png)

### 解密&导出

无和谐，不需要预处理。

`Options > Specify Game > UnityCNwithFakeHeader`

`Options > Specify UnityCN key > Elpis`双击左侧箭头区域选中Key（表格会自动关闭），再次打开这个表格应该显示选中了星落的key。

![image-20251104233950455](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511042339589.png)

选择`TextAsset` `Texture2D` 导出。

模型命名规则`cardspine_name_level_number`，这里的name表示角色代号，level是阶段，一般有2/3个阶段，number如果是1则为角色本体，2为背景。

用脚本分类Spine（有时候会产生空目录，有的文件由于命名不规则需要删除或者手动分类）

`SortAtlas&Skel&png(Any).py`

```python
#!/usr/bin/env python3

import os
import shutil
from pathlib import Path

# === 配置 ===
DRYRUN = False  # True = 仅显示，不移动；False = 执行移动

def main():
    src_dir = Path(".").resolve()
    print(f"[INFO] 工作目录: {src_dir}")
    
    files_to_move = []
    
    # 扫描所有 atlas 文件（包括子目录）
    atlas_files = list(src_dir.rglob("*.atlas"))
    
    if atlas_files:
        print(f"[INFO] 找到 {len(atlas_files)} 个 atlas 文件")
        
        # 基于 atlas 文件进行归类
        for atlas_path in atlas_files:
            name = atlas_path.stem
            parent_dir = atlas_path.parent
            
            print(f"[DEBUG] 处理 atlas: {atlas_path.relative_to(src_dir)}")
            
            # 创建目标目录
            target_dir = parent_dir / name
            if not target_dir.exists() and not DRYRUN:
                target_dir.mkdir(parents=True, exist_ok=True)
                print(f"[DEBUG] 创建目录: {target_dir.relative_to(src_dir)}")
            
            # 查找同目录下与 atlas 同名的所有文件（包括 atlas 文件本身）
            for file_path in parent_dir.iterdir():
                if file_path.is_file() and name in file_path.stem:
                    # 检查是否已经在目标目录中，避免重复移动
                    if file_path.parent != target_dir:
                        files_to_move.append((file_path, target_dir))
                        print(f"[DEBUG] 找到匹配文件: {file_path.name}")
    
    else:
        # 没有 atlas 文件，按目录名归类
        print("[INFO] 未找到 atlas 文件，使用目录名匹配模式")
        existing_dirs = [d for d in src_dir.rglob("*") if d.is_dir()]
        
        for file_path in src_dir.rglob("*"):
            if file_path.is_file():
                file_stem = file_path.stem.split('#')[0]
                
                # 查找匹配的目录
                for existing_dir in existing_dirs:
                    if file_stem.startswith(existing_dir.name):
                        # 确保文件不在目标目录中
                        if file_path.parent != existing_dir:
                            files_to_move.append((file_path, existing_dir))
                        break
    
    # 显示并执行移动
    if not files_to_move:
        print("没有找到需要移动的文件。")
        return
    
    print(f"\n找到 {len(files_to_move)} 个待移动文件：")
    for src, dst in files_to_move:
        print(f"  {src.relative_to(src_dir)} -> {dst.relative_to(src_dir)}/")
    
    confirm = input("\n确认执行移动操作？(y/N) ").strip().lower()
    if confirm in ['y', 'yes']:
        moved_count = 0
        for src_path, dst_dir in files_to_move:
            try:
                print(f"移动: {src_path.name} -> {dst_dir.name}/")
                if not DRYRUN:
                    shutil.move(str(src_path), str(dst_dir))
                moved_count += 1
            except Exception as e:
                print(f"错误: 移动 {src_path.name} 失败: {e}")
        print(f"移动完成。共移动 {moved_count} 个文件。")
    else:
        print("操作已取消。")

if __name__ == "__main__":
    main()
```

删除空目录

`DelEmptyDirs.py`

```python
#!/usr/bin/env python3

import os
from pathlib import Path

def main():
    current_dir = Path(".").resolve()
    print(f"扫描空目录: {current_dir}")
    
    empty_dirs = []
    
    # 从最深层的目录开始扫描
    for root, dirs, files in os.walk(current_dir, topdown=False):
        current_path = Path(root)
        
        # 跳过当前目录本身
        if current_path == current_dir:
            continue
            
        # 检查目录是否为空
        if not any(current_path.iterdir()):
            empty_dirs.append(current_path)
    
    if not empty_dirs:
        print("没有发现空目录。")
        return
    
    print(f"\n发现 {len(empty_dirs)} 个空目录:")
    for dir_path in empty_dirs:
        print(f"  - {dir_path.relative_to(current_dir)}")
    
    confirm = input("\n确认删除这些空目录？(y/N): ").strip().lower()
    if confirm in ['y', 'yes']:
        deleted_count = 0
        for dir_path in empty_dirs:
            try:
                dir_path.rmdir()
                print(f"✓ 删除: {dir_path.relative_to(current_dir)}")
                deleted_count += 1
            except OSError as e:
                print(f"✗ 删除失败: {dir_path.relative_to(current_dir)} - {e}")
        print(f"\n删除完成。共删除 {deleted_count} 个空目录。")
    else:
        print("操作已取消。")

if __name__ == "__main__":
    main()
```

## 未完待续==归龙潮（Deep/Return of the Dragon） Spine - UnityCN特殊加密 - 缺了

质量也就是一般般吧，有几个角色还是挺好看的。

需要用到AXIX版本AS，在星落解包攻略里面有链接。

停服了，似了。。

移动端已经不支持注册用户了，所以如果你没有号，就不能用移动端解包。

PC端可以B服直接下载。

牛大了，40G，好消息是只需要下载20G。是先把分卷下载完再解压，所以必须全额下载。

![image-20251105111400963](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511051114357.png)



### 路径

#### 静态资源

[APK](https://userplatform-download.kingsgroup.cn/official-website/pc-client-launcher/deep_cn.apk)下载官方的apk包，打开`assets > AssetBundle`这里有一部分的资源包。

解压出来0.98G左右。

![image-20251111130929734](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511111309866.png)

#### 热更新资源

`.\GuiLongchaoBili\game\GuiLongchao_Data\StreamingAssets\Assetbundle`

文件很多，有15G左右。

![image-20251111152239927](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511111522038.png)

合并静态资源和热更新资源（静态的移动到热更资源里面去）。有两个重复资源，保留热更包资源。合并后大约16G。

![image-20251111152426568](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511111524649.png)

### 解密（有点问题）

使用AXIX版本AS`Specify Game > 归龙潮`  即可。

然后筛选`TextAsset` `Texture2D` 同时搜索`spine`即可，点击`Name` 两次就是按照名字排序（倒序），一路下滑找到`spine_role`开头的文件。

或者你搜索这个路径`ui/vfxs/spine/`然后全部导出来也可以。

![image-20251105160955950](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511051610260.png)

导出选择“selected assets”导出

再往下面划，找到`spine_chishihong_character`为起点，

![image-20251105162528831](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511051625922.png)

`spine_animal_maomi_01`为终点，全部选中后导出。

![image-20251105162618479](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511051626569.png)

在往下划`node_spine`开头的这一段有两个模型。导出步骤同理。

![image-20251105163112205](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511051631285.png)

再往下划，找到最后一部分模型，含有`gacha`关键词（是抽卡的意思，应该是卡池的动画），一路选中到最后一个资源。导出步骤同理。

![image-20251105163332368](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511051633467.png)

导出来主要就是四个部分，

![image-20251105163705372](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511051637430.png)

目前导出有点问题，有几个角色模型没找到。。疑似是更新包体原因[关于包体内存优化与后续整包更新说明 - 归龙潮官方资讯 - TapTap 归龙潮论坛](https://www.taptap.cn/moment/674659636434962713)

1. 无常
2. 寒衣
3. 殭
4. 珠砂
5. 青龙元君

解包遇到了问题，然后这几个模型没解出来。

```
System.ArgumentOutOfRangeException: Specified argument was out of the range of valid values.
   at AssetStudio.LZ4.Decompress(ReadOnlySpan`1 cmp, Span`1 dec) in F:\Rider\Studio\AssetStudio\LZ4\LZ4.cs:line 38
   at AssetStudio.BundleFile.ReadBlocks(FileReader reader, Stream blocksStream) in F:\Rider\Studio\AssetStudio\BundleFile.cs:line 618
   at AssetStudio.BundleFile..ctor(FileReader reader, Game game) in F:\Rider\Studio\AssetStudio\BundleFile.cs:line 149
   at AssetStudio.AssetsManager.LoadBundleFile(FileReader reader, String originalPath, Int64 originalOffset, Boolean log) in F:\Rider\Studio\AssetStudio\AssetsManager.cs:line 268
```

目前收集到的信息就是，这个dab被单独解包了，需要把其他部分和它拼接起来成为一个完整的bundle包再解包。

但其他部分很顺利地通过AS解包了，不知道为什么。

目前正在尝试Fork一个版本的AS。。。2025.11.5未完待续。。

## 苍雾残响（Haze Reverb）Spine - 无加密 - 懒得更

展示成果环节，人物都是萝莉，不是很喜欢。。

![image-20251107163334406](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511071633545.png)

现在二油体积越来越大了，随便下一个都10G起步。。。

[APK-Link](https://d-02.winudf.com/b/APK/Y29tLnRpbmd6aG91LmN3Y3h0dy5xb29hcHBfMTVfYWJkZDhjYzk?_fn=6JK86Zyn5q6Y6Z-_XzEuMC4xM19BUEtQdXJlLmFwaw&_p=Y29tLm5pY2VnYW1lLmN3Y3g%3D&download_id=1499501989503793&is_hot=false&k=2b4e3f742d08563945b8ae0eefaf9a2e690ebf42)或者你去QOO搜一下，油管也有官方频道。这个APK里面啥都没有，不用拆了，需要热更新资源。

### 路径

路径如图

![image-20251107130221788](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511071302836.png)

文件名是无规则的，而且很散，没法寻找特定部分。

只能全部导出。

### 解密&导出

无加密，直接导出即可。

目录都分为`data` 和 `info` 两个部分，info不用管。

筛选`TextAsset`  `Texture2D` 搜索`assets/aboriginal/role`，按名称顺序排序。

![image-20251107153458184](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511071535356.png)

从`heiyu_bg`开始，之前的部分是Q版小人，后面的是立绘，shitf一路选中到最后一项然后导出选择的部分。

批量去除prefab后缀后就是完整spine结构。

导出路径选择容器路径，`98000000`往后都是一个图标，可以删除。

![image-20251107160309466](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511071603519.png)

中间也还有很多目录是只有图标没有模型的，应该是那个角色不会动。。。

也有可能是导出问题。



## 麻雀一番街 (Riichi City) Spine - FakeHeader加密 - 可更新 简单

还行，放上战果。

![image-20251108001014115](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511080010258.png)

![image-20251107235615598](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511072356762.png)

模拟器Qoo搜索下载，总共5G左右。

### 路径

![image-20251107215822594](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511072158685.png)

### 解密

Raz版AS或者其他版本，选择FakeHeader。

筛选出TextAsset和Texture2D。

![image-20251107220412991](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511072204071.png)

注意到这里的skel文件是json格式的，所以导出后需要添加json后缀。

去除后缀.asset，然后给无后缀文件添加.json后缀即可得到完整spine结构。

如果显示没脸，说明你没有切换表情，默认表情是没有脸的。这默认参数设计的挺脑残…

![image-20251107235014284](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511072350416.png)



## 钢岚 (Mecharashi) Spine - UnityCN加密- 可更新 简单

所有立绘都在APK里面，要更新就重新下载一个APK即可。

2025.11.8

成品展示环节

![image-20251108125332856](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511081253958.png)

![image-20251108122232884](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511081222034.png)

不用下载完整游戏，下载apk打开即可，属于后续好更新的游戏了。

直接下载链接，来自APKPure，[APK](https://d-30.winudf.com/b/APK/Y29tLnRlbmNlbnQudG1ncC5tZWNoYXJhc2hpXzI2MF9lYjE3YjQ2Ng?_fn=6ZKi5bKaXzIuMjYuMF9BUEtQdXJlLmFwaw&_p=Y29tLnRlbmNlbnQudG1ncC5tZWNoYXJhc2hp&download_id=1291104911303242&is_hot=false&k=566d38e67f03f0034d537da07601b31869100590&uu=http%3A%2F%2F172.16.79.1%2Fb%2FAPK%2FY29tLnRlbmNlbnQudG1ncC5tZWNoYXJhc2hpXzI2MF9lYjE3YjQ2Ng%3Fk%3D602c9f28ea70791278032e3b7a51cda669100590)

### 路径

![image-20251108113938804](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511081139881.png)

### 解密

`Options > Specify Game > UnityCN`

`Options > Specify UnityCN key > Mecharashi`如果没有，手动添加密钥`31433743463543423144313841304630`

筛选`TextAsset` `Texture2D` 搜索`Pilot_`，按名正序排序，找到`AdaDiazB`，

![image-20251108114612815](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511081146894.png)

一直到`Zoey`都是需要导出资源。全部选中然后导出。

![image-20251108114734023](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511081147099.png)

漏了一个

![image-20251108123850069](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511081238167.png)

还有一个`Pilot`拼错成了`Pliot`，草台班子。。。也就是站里有人在找的角色卡夏Cassha。`assets/gameproject/runtimeassets/pilot/pilotb39_abs/10103126b/pliot_cassha_skeletondata.asset`

![image-20251108125011456](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511081250547.png)

或者你按照容器名字排序找一下这个路径也行。

导出后需要删除`.asset`后缀，然后就是正常Spine结构了。

这些目录是按照时间排序存放模型的，最新的角色`郑乐萱`在44目录里面。

![image-20251108115135837](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511081151875.png)

不选动作默认是空白的。

![image-20251108121733919](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511081217030.png)

## 棕色尘埃2 (BrownDust II)  Spine - 隐藏版号加密 - 可更新 麻烦 

质量这一块能跟碧蓝航线难分伯仲了，

成果展示

这个皮肤真有意思。

![image-20251108200031914](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511082000039.png)

![image-20251108200602631](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511082006791.png)

### 下载

PC版下载链接：https://wwhu.lanzoub.com/igPFS33th1sh 密码：g3xp

[直接下载链接](https://q1070.webgetstore.com/2025/08/18/b6b90e0dfafbbdae93bd5d8b57135e26.exe?sg=d2c36e134fe1c319806295524016e9fd&e=690ef0ed&fileName=BD2StarterSetup_gpg_240430.exe&fi=250006277)

这个游戏只能安装在根目录，有点脑残

基础资源里没有spine模型，所以只能全额下载热更新资源。

也就10G，不是很大。登录要梯子，下载不用梯子。

![image-20251108153919869](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511081539042.png)

### 路径

`D:\Neowiz\Browndust2\Browndust2_10000001\BrownDust II_Data\Addressable`

文件是散的，然后内容是经典的`data`和`info`，所以什么都看不出来。



### 解密

现在的版本号被隐藏了。

![image-20251108183849838](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511081838903.png)

需要用AS指定版本号`2022.2.17f1`，然后选择普通模式即可，没有特别的加密。

`Options > Specify Unity Version > 2022.2.17f1`

导入资源后筛选`TextAsset` `Texture2D` 然后搜索`cutscene` 按名称排序，找到第一个小写的

![image-20251108192547608](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511081925853.png)

然后一直往下找到最后一个，把这一段全部导出（导出分组直接不分类，因为按照文件名称，容器名称分类会导致一个容器下放了好几个不同角色的模型）

![image-20251108192621825](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511081926931.png)

最后导出是散的，然后我们用脚本分类，先批量删除.asset后缀。

根据atlas文件的名称（因为有的skel是json形式的，所以不用skel来命名）来命名目录，然后同前缀的文件放到这个名称目录下

2025.11.8 最后分类成了127个模型。

![image-20251108194923782](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511081949870.png)



## 少女前线1 (Girl’s Frontline) Live2D - FakeHeader加密 - 完结了

也算是老牌二油了，立绘质量这块不必多说。

最新资讯[少女前線資料庫](https://gf.fws.tw/) 私人游戏B站上搜的乱七八糟，官号也是一坨。

Steam上中文搜索下载 10G

参考教程[关于2024年少女前线live2d立绘提取 - 讨论 - Live2DHub](https://live2dhub.com/t/topic/3828/5)

大概是世界上第一个完结的二油，打赢复活赛了但是不多。

成果展示。

![image-20251110012158498](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511100121621.png)

![image-20251110011752359](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511100117590.png)

### 路径

Steam路径

`D:\SteamLibrary\steamapps\common\GIRLS'FRONTLINE\GrilsFrontLine_Data\StreamingAssets\Res\Pc`

### 解密

一眼丁真，一看就是假头啊

![image-20251108222223546](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511082222604.png)

这里下选择[Release AssetStudioMod v0.19.0 · aelurum/AssetStudio](https://github.com/aelurum/AssetStudio/releases/tag/v0.19.0)

能解FakeHeader同时一键导出Live2D模型，不能解UnityCN，只会提示有加密。

如果你想把文件单独导出，可以参考无期迷途的解包攻略，这里没有hash加密参数，应该可以很顺利地把动作导出。

这里导出直接选择L2D模型全部导出即可。

目前能确认的最新的模型是2025.7左右更新的模型。

缺了最新的一期几个模型。不知道为什么，我用的是Steam刚下载的资源，没有这个 刘式步枪-瓶中的天空。

在原始资源包里头也没有搜到相关贴图，难道是原资源有问题？

这个是Live2D 皮肤

![img](https://gf.fws.tw/uploads/proxy/images/12abee64a1c5f1883085f2f3c76f26b8.jpg)



## 少女前线:云图计划 (Project Neural Cloud) Live2D - FakeHeader加密 - 停更了

皮肤质量还是挺顶级的，就是游戏死的有点早。羽中太会了

成果展示。

![image-20251110152426077](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511101524353.png)

![image-20251110115529578](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511101155913.png)

[《云图计划》-少前系列Roguelike策略手游](https://42lab.sunborngame.com/)

官网搜下载APK。安装包里啥都没有，需要热更新下载。

模拟器安装然后启动，更新资源。

byd 有 22 个包要下载，10G。

### 路径

找到这个路径，然后一直往下面翻，当你能看到z开头的目录时，说明Live2D的资源已经下齐了，剩下的资源不用下了。因为我之前之下了一个包，然后只有n开头的目录，我猜测是顺序下载的。

![image-20251110105312996](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511101053093.png)



### 解密

直接用Mod版AS导出所有的L2D模型即可，之前是UnityCN加密需要密钥的，现在就是直接FakeHeader了（Mod版本AS可以直接识别FakeHeader，所以不用处理）。

导出后有180个模型。更新截止到3周年的后的 桑格玛皮肤，也就是B站官号最后更新的皮肤。



## 少女战争(Girl’s Wars) Spine/Live2D - FakeHeader加密 

产品展示。质量顶中顶。

![image-20251121165642111](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511211656446.png)

![image-20251121170953709](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511211709034.png)

![image-20251122204430003](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511222044157.png)

![image-20251122205349719](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511222053866.png)

用二油资源下载器下载的。路径就是live2d，不用找了。这里下载的资源有全资源，你自己下载游戏它的资源不会全部给你下载，但是这个并不是鉴权资源。

FakeHeader加密，用下载器处理。

### Live2D

直接用Mod版AS一键导出Live2D模型即可。

模拟器路径如下，游戏资源需要登录游玩下载，并不是预下载。

![image-20251121192051417](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511211921348.png)

### Spine

![image-20251122202627646](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511222026763.png)





## 少女回战（Shoujokaisen） Spine/Live2D - FakeHeader加密 可更新 简单

成果展示。质量还可以吧，精细度差点意思，动作幅度都比较小。

![image-20251110224356460](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511102243657.png)

![image-20251110224609852](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511102246030.png)

下载日服[Download 少女廻戦 4周年限定夏日水着パーティー開催 Latest Version 1.0.136 Android APK File](https://apkpure.com/少女廻戦-時空恋姫の万華境界へ/com.onemt.and.shoujokaisen/download)

日服就是官服，不用考虑和谐之类的东西。

从这个文件来看，这个好像是国产日本游戏。

APK里面有一部分资源，但是不全，还是得安装游戏然后热更新。总共就2G的样子，还是挺友好的。

### 静态资源

![image-20251110221617440](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511102216547.png)

本体包里面有一个`unityAssets.apk`，解压后再次解压，找到assets目录下的model目录，这里就是静态资源

![image-20251110221638504](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511102216579.png)

### 热更新资源路径

模拟器下载后的路径。

![image-20251110190052987](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511101900066.png)



把静态资源的model和这个热更资源的model合并一下，有三个重复的文件，选择保留热更资源的文件（应该体积会更大一点）。

### 解密

一眼FakeHeader

![image-20251110182918419](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511101829513.png)

这里选择的是Mod版本AS。

### 导出Spine

随便找个能解FakeHeader的AS就行，因为是Spine资源，筛选`TextAsset` 和 `Texture2D`即可

然后搜索一下官服最新推文的角色貂蝉的新皮肤-晓月白露。可以确定没什么问题了，直接导出筛选项即可。

![image-20251110190838495](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511101908609.png)

发现这里有`texture_01`命名的纹理图，说明肯定有Live2D模型。

导出后整理一下，就这几个是关键的，其他的什么家具和npc我懒得看就删了，还有几个目录是Live2D的，这里也删除了。

![image-20251110223745163](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511102237235.png)

他这个导出后骨骼和纹理集在单独的一个目录，而不是根目录。

可以只保留一级目录，然后把二级目录的内容递归提取到一级目录。

![image-20251110235640731](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511102356786.png)

```python
import os
import shutil
from pathlib import Path

def extract_contents(root_dir):
    root_path = Path(root_dir)
    if not root_path.is_dir():
        print(f"错误：{root_dir} 不是一个有效的目录")
        return

    # 遍历根目录下的一级子目录
    for item in root_path.iterdir():
        if not item.is_dir():
            continue  # 跳过根目录下的文件

        subdir = item
        print(f"\n正在处理目录: {subdir.name}")

        # 检查是否包含子文件夹
        has_subfolder = any(p.is_dir() for p in subdir.iterdir())

        if not has_subfolder:
            print(f"  → 纯文件目录，跳过: {subdir.name}")
            continue

        print(f"  → 包含子文件夹，开始提取内容...")

        # 递归提取所有内容到当前 subdir
        _move_all_contents_up(subdir)

        print(f"  → 提取完成: {subdir.name}")

def _move_all_contents_up(base_dir):
    """
    将 base_dir 下的所有子文件夹内容，逐级提升到 base_dir
    重复直到没有子文件夹为止
    """
    while True:
        subfolders = [p for p in base_dir.iterdir() if p.is_dir()]
        if not subfolders:
            break

        for folder in subfolders:
            for item in folder.iterdir():
                dest = base_dir / item.name

                # 处理文件名冲突
                if dest.exists():
                    base_name = item.stem if item.suffix else item.name
                    suffix = item.suffix
                    counter = 1
                    while dest.exists():
                        new_name = f"{base_name}_{counter}{suffix}"
                        dest = base_dir / new_name
                        counter += 1

                shutil.move(str(item), str(dest))

            # 删除空的原文件夹
            try:
                folder.rmdir()
                print(f"    删除空文件夹: {folder.name}")
            except OSError as e:
                print(f"    无法删除文件夹 {folder.name}: {e}")

if __name__ == "__main__":
    # === 修改这里为你的根目录路径 ===
    ROOT_DIRECTORY = "."  # 当前目录，或写绝对路径如 r"D:\mydata"

    print(f"开始处理根目录: {os.path.abspath(ROOT_DIRECTORY)}")
    extract_contents(ROOT_DIRECTORY)
    print("\n所有操作完成！")
```



### 导出Live2D

本来以为只有Spine，仔细一看发现还有Live2D的资源，就是这个游戏的婚皮。导出路径是spine，但是确实就是Live2D模型。

![image-20251110192406559](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511101924627.png)

Mod版直接导出L2D模型的话花嫁模型的动作有点问题，显示没有动作，但是实际上搜索文件路径是可以查找到不少相应的动作。

![image-20251110192527326](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511101925390.png)

但是这个萝莉模型`\models\spine\spine_bedroom\lolis`都是完整有动作的模型

可能是因为他这个实际文件存放位置跟AS提取部分代码预设的不太一样吧。

不过也就是按照以下步骤处理

1. 先一键导出所有的Live2D模型，得到初始目录`.\Live2DOutput\assets\assetspackage\models\spine\spine_huajia\...`

2. 导出分组设置为容器路径Container Path

3. AS搜索并导出所有的motion3后缀文件，在`.\Live2DOutput\assets`路径下导出，以蔡文姬为例，动作导出后会在

   `.\Live2DOutput\assets\assetspackage\models\spine\spine_huajia\huajia_caiwenji01\motions`然后把这个`motions`文件夹放到

   `.\Live2DOutput\assets\assetspackage\models\spine\spine_huajia\huajia_caiwenji01\huajia_caiwenji01`里面去（没几个模型，所以这个部分手动解决），这样就形成了完整的L2D结构

4. 脚本批量为所有motion3后缀文件添加json后缀

5. 脚本批量修改model3配置文件，其实也就是动作没有导入，所以只需要补充motions键的值即可。

6. 测试

![image-20251110212939098](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511102129221.png)

```python
import os
import json
import glob
from pathlib import Path

def main():
    print("开始查找 Live2D 模型...")

    # 使用 Path 更简洁地遍历所有 .moc3 文件
    moc3_files = list(Path('.').rglob('*.moc3'))
    if not moc3_files:
        print("未找到任何 .moc3 文件")
        return

    print(f"找到 {len(moc3_files)} 个 Live2D 模型")
    processed = set()

    for moc3_path in moc3_files:
        model_dir = moc3_path.parent
        if model_dir in processed:
            continue

        print(f"\n处理模型: {model_dir}")

        # 1. 处理 motions 目录：自动添加 .json 后缀
        motions_dir = model_dir / 'motions'
        if not motions_dir.exists():
            print("  未找到 motions 目录，跳过")
            continue

        motion_files = []
        for motion_path in motions_dir.glob('*.motion3'):
            new_path = motion_path.with_suffix('.motion3.json')
            if not new_path.exists():
                try:
                    motion_path.rename(new_path)
                    print(f"  重命名: {motion_path.name} → {new_path.name}")
                except Exception as e:
                    print(f"  重命名失败 {motion_path.name}: {e}")
            motion_files.append(new_path.name)

        # 包含已存在的 .motion3.json
        motion_files.extend([p.name for p in motions_dir.glob('*.motion3.json')])
        motion_files = sorted(set(motion_files))  # 去重排序

        if not motion_files:
            print("  未找到任何 .motion3.json 动作文件")
            continue

        print(f"  发现 {len(motion_files)} 个动作:")
        for f in motion_files[:10]:  # 只显示前10个，避免刷屏
            print(f"    - {f}")
        if len(motion_files) > 10:
            print(f"    ... 共 {len(motion_files)} 个")

        # 2. 获取模型名称
        model_name = moc3_path.stem

        # 3. 自动收集资源
        textures = [f"textures/{p.name}" for p in (model_dir / 'textures').glob('*.png')] if (model_dir / 'textures').exists() else []
        physics_path = model_dir / f"{model_name}.physics3.json"
        physics = f"{model_name}.physics3.json" if physics_path.exists() else None

        # 4. 构建 Motions 结构
        motions_data = {
            f.removesuffix('.motion3.json').removesuffix('.json'): [{"File": f"motions/{f}"}]
            for f in motion_files
        }

        # 5. 读取或创建 .model3.json
        model_json_path = model_dir / f"{model_name}.model3.json"
        if model_json_path.exists():
            with open(model_json_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            print(f"  更新现有 {model_json_path.name}")
        else:
            print(f"  创建新的 {model_json_path.name}")
            data = {
                "Version": 3,
                "Name": model_name,
                "FileReferences": {
                    "Moc": f"{model_name}.moc3",
                    "Textures": textures,
                    "Physics": physics,
                    "Pose": None,
                    "DisplayInfo": None,
                    "Motions": {},
                    "Expressions": []
                },
                "Groups": [
                    {"Target": "Parameter", "Name": "EyeBlink", "Ids": ["ParamEyeROpen", "ParamEyeLOpen"]},
                    {"Target": "Parameter", "Name": "LipSync", "Ids": ["ParamMouthForm", "ParamMouthOpenY"]}
                ]
            }

        # 强制更新 Motions（保留其他自定义内容）
        data.setdefault("FileReferences", {})["Motions"] = motions_data

        # 6. 写回文件（美化 JSON）
        try:
            with open(model_json_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            print(f"  已保存: {model_json_path.name}")
            print(f"  更新动作组: {', '.join(motions_data.keys())}")
        except Exception as e:
            print(f"  保存失败: {e}")

        processed.add(model_dir)

    print(f"\n完成！共处理 {len(processed)} 个模型")

if __name__ == "__main__":
    main()
```



## 未完待续==放置少女（HouchiShoujo） Spine/Live2D - RC4加密 可更新 麻烦

目前用这个下载的资源https://live2dhub.com/uploads/short-url/4CePVk4JsJ8tWfEZK6uBtfXGxZI.zip二油资源下载器

下载日服未加密资源即可，然后直接导入AS。国际服版本落后一点，一个月左右。

Spine

导出分类选择容器路径，筛选`TextAsset` `Texture2D`，搜索`assets/girlsgame/editor/resources/spine`

按名称排序，按需导出。

Live2D

Mod版本AS一键导出即可。

成果展示。老牌二油了，质量这一块。

![image-20251113225920160](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511132259387.png)

![image-20251113230328921](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511132303207.png)



不建议自行解包，热更资源需要自行进入游戏后点击角色下载，而不是预先下载好

[Download 放置少女 - 百花繚乱の萌姫たち Latest Version 2.3.153 Android APK File](https://apkpure.com/放置少女-百花繚乱の萌姫たち/jp.glee.girl/download?utm_content=1008)

### 静态资源

有两层APK，在第二层的`base_asset`APK里面找到`abs` 目录。

### 热更新资源

如下路径。

![image-20251112120456191](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511121204294.png)

合并一下两个资源。

### 解密（还没解出来）

![image-20251111193203401](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511111932463.png)

前77个字节是固定内容，标记的字节内容会变动，前45个字节完全一致。

```
now
38 4A 64 6E 01 00 01
UnityFS
55 6E 69 74 79 46 53
```

看不出什么规律，尝试IDA逆向，内容在另一篇文章里。

Frida抓不到libil2cpp.so 没辙了。

。。。未完待续



## 星神少女(Aeon's Echo) Spine - ？加密 有鉴权资源

https://mega.nz/file/MkZUBALT#jgTBp_KAqVKzY7kPN7LuSuybv3P-RQgxFiqxRR8YEkI

别人传的资源。

因为有鉴权资源，不用自己下载游戏了，只能去网上搜集。

产品展示，3a大作有点多，质量一般，cg是好几个spine拆分组合的。

![image-20251120151106903](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511201511044.png)

![image-20251120145841001](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511201458254.png)

![image-20251120150207841](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511201502013.png)

resdownloader下载后会自动解密。

AS筛选`TextAsset` `Texture2D`导出即可



## 星欲少女(StarLusts) Spine - 无加密 

产品展示。 质量有点顶，一众黄油里算比较有竞争力了。

![image-20251120123316139](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511201233559.png)

![image-20251121192628644](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511211926913.png)

resdownloader下载

筛选`Assets/_Main/Spine2D/Character` 和 `Assets/_Main/Spine2D/CGCharacter`导出

有的skel就是二进制的不用改，有的是json格式的但是后缀是.asset，需要改为.json

## 交错战线(CrossCore) Spine - FakeHeader 可更新 简单

成品展示。太极八荒了。有几张图脸有点崩。

![image-20251114203828381](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511142038565.png)

![image-20251114204404362](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511142044595.png)

[下载交错战线 2.5.0针对于Android | Uptodown.com](https://cross-core.cn.uptodown.com/android/dw)

反和谐：游戏包名 > files > internation_close.txt 删除  重新启动游戏。

### 静态资源

APK里面找packs，最大的目录。

啥都没有，就一个kv的Spine模型。skel是json格式的。

### 热更资源

![image-20251114194731607](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511141947721.png)

直接选择带spine的资源导入AS

![image-20251114195925155](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511141959223.png)

### 解密

Mod版本AS直接导入，自动解密FakeHeader

筛选textasset texture2D即可

导出后 prefab后缀换成json



## 星陨计划(ArkRecode) Spine - 无加密 可更新 懒

产品展示。经典黄二油，质量不必多说。如果人物是透明/缺失的，需要在左侧切换皮肤，因为默认皮肤的缺的。

![image-20251118202440002](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511182024181.png)

![image-20251118203314680](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511182033888.png)

### 资源获取

二油资源下载器（见文章开头）下载找到如下路径，就hero和cg两个包

![image-20251116113445009](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511161134141.png)

### 导出

没有加密，筛选`TextAsset` `Texture2D`用AS导出即可。



## 樱境物语(Cherry Tale) Spine - 混淆/字节交换 可更新 懒

产品展示，质量中游水平吧。

![image-20251118204548002](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511182045166.png)

![image-20251118204658734](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511182046905.png)

### 资源获取

用二油下载器下载即可。下载器自带解密功能。

最后应该是这两个目录，不过都是散的文件，需要分类。

![image-20251118204228362](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511182042409.png)

### 具体解密

APK包版本是 `2020.3.41f1`，热更资源是`2018.3.5f1`伪装了真正的版本。然后还做了一些字节交换的处理。

```python
import os
import argparse
import struct

def process_file(input_file_path, output_file_path):
    indicies = [0x3FB, 0xD99, 0x197C]

    with open(input_file_path, "rb") as file:
        bytes = bytearray(file.read())

    for idx in indicies:
        if idx < len(bytes):
            ridx = len(bytes) - idx
            bytes[idx], bytes[ridx] = bytes[ridx], bytes[idx]

    originalVersion = b"2020.3.41f1\x00"
    encryptedVersion = b"2018.3.5f1\x00"

    index = 0
    offset = 0
    array = bytearray()
    while index != -1:
        index = bytes.find(encryptedVersion, offset)
        if index == -1:
            array.extend(bytes[offset:])
            break
        if index > 0:
            array.extend(bytes[offset:index])
            array.extend(originalVersion)
            offset = len(encryptedVersion) + index + 1

    with open(output_file_path, "wb") as file:
        print("Processed:", os.path.basename(output_file_path))
        file.write(array)


def process_folder(input_folder_path, output_folder_path):
    # Create output folder if it doesn't exist
    if not os.path.exists(output_folder_path):
        os.makedirs(output_folder_path)

    # Process each file in the input folder
    for file_name in os.listdir(input_folder_path):
        input_file_path = os.path.join(input_folder_path, file_name)
        output_file_path = os.path.join(output_folder_path, file_name)
        process_file(input_file_path, output_file_path)


# Parse command-line arguments
parser = argparse.ArgumentParser(description='Process files in input folder and save to output folder.')
parser.add_argument('input_folder', help='Path to the input folder')
parser.add_argument('output_folder', help='Path to the output folder')
args = parser.parse_args()

# Process the folder using the provided input and output folder paths
process_folder(args.input_folder, args.output_folder)
```



## 逆王传说(King of Kinks/放置传说/欲望之王) Spine - ?加密 鉴权

产品展示。少数质量有点顶，不过也有黄油的经典比例失调问题。

非鉴权资源很少，就个位数。。

![image-20251119220940903](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511192209089.png)

有几个还是挺优质的

![image-20251122181822105](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511221818330.png)

![image-20251122192301015](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511221923158.png)

[放置傳說](https://ss.xpmikami.com/game/xr/?attributionId=0)

需要先注册再下载资源。

**鉴权资源**需要获得角色后才会下载资源，所以直接下载是不全的。只能靠网上收集了。

[逆王传说_免费高速下载|百度网盘-分享无限制](https://pan.baidu.com/s/1F7gzgZXgrxr17mMHy9h8DA?pwd=2233#list/path=%2F)

https://pan.baidu.com/s/1H_XMWEp2e30IkUjPxpgwEw

这个下载的是WPK文件。可以直接解压出来LPK

[ihopenot/LpkUnpacker: unpack Live2DViewerEx .lpk file](https://github.com/ihopenot/LpkUnpacker)然后用解包LPK就可以得到模型，这个LPK是L2EEX的自制文件，也可以直接用这个软件打开。

解包出来的东西命名不是很规则，但是有json配置文件，可以直接用L2DEX打开。



### 路径

![image-20251119220047018](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511192200113.png)

### 解密

用resdownloader输入路径后解密

![image-20251119220225201](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511192202320.png)

然后直接用AS提取。



## 红尘问仙(ChronicleofImmortals) Spine 无加密

产品展示。

![image-20251120104651439](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511201046659.png)

![image-20251120105151186](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511201051357.png)

resdownloader下载资源后用Mod版AS提取

无加密

搜索`Assets/Bundles/HScene` 和 `Assets/Bundles/CharSpine`导出

导出后的skel是json格式的，需要先删除.asset后缀然后替换为.json



## 千嬌百妹(girls love dance/妹妃色舞) Spine - YooAsset 可更新 简单

产品展示。夯中夯，全是精品

![image-20251123160133054](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511231601346.png)

![image-20251123160516280](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511231605522.png)

![image-20251123160705746](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511231607026.png)

### 资源获取

目前只有Qoo能下载[[下載\] 千嬌百妹 | 台版 - QooApp 遊戲庫](https://apps.qoo-app.com/app/140987)

先将模拟器/手机的语言修改为繁体中文（台湾）

![image-20251123105633449](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511231056503.png)

需要额外下载内容

![img](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511231050707.png)

点击右下角“职务”

![image-20251123105902367](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511231059523.png)

![image-20251123105934669](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511231059836.png)

下载完后点击R18版本重启游戏。

R18版本和R15版本略有不同。

### 路径

Spine资源都在热更资源里面，APK里面没什么东西

![image-20251123110300465](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511231103525.png)

需要把这个yoo目录复制下来

### 解密

使用脚本处理[Script/YooAsset/Extract.py at master · PackageInstaller/Script](https://github.com/PackageInstaller/Script/blob/master/YooAsset/Extract.py)

```python
python Extract.py yoo
```

会自动提取文件，然后生成文件清单。

packageEx包里的文件可以直接用AS提取。

处理完之后defaultPackage包里面的文件还不能直接用AS提取，前64个字节被处理过了，找到defaultPackage包里面的role目录，这里是R15的资源。

![image-20251123135832385](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511231358479.png)

还需要用一个XOR解密脚本处理一下

```python
import os
import sys

# --- 1. 定义核心解密函数 ---
def dec(e: str, d: str) -> bool:
    """
    对文件e的前64个字节进行异或 0xFF 操作，并将结果写入文件d。
    e: 待处理文件名/路径
    d: 输出文件名/路径
    返回: 成功则返回 True，失败返回 False。
    """
    try:
        # 以二进制模式读取文件内容
        with open(e, 'rb') as f:
            enc = f.read()
        
        # 转换为可变字节数组
        data = bytearray(enc)
        
        # 确定操作范围：文件长度或 64 字节，取最小值
        byte_limit = min(len(data), 64)
        
        # 执行异或 0xFF (按位取反) 操作
        for i in range(byte_limit):
            # 核心操作：异或 0xFF
            data[i] ^= 0xFF
        
        # 确保输出目录存在
        os.makedirs(os.path.dirname(d), exist_ok=True)
        
        # 写入处理后的数据
        with open(d, 'wb') as f:
            f.write(data)
        
        # 打印信息时，原文件和输出文件都是相同的 basename
        print(f"✅ 处理成功：'{os.path.basename(e)}' -> '{d}'")
        return True
    except Exception as error:
        print(f"❌ 处理文件 '{e}' 时发生错误: {error}")
        return False

# --- 2. 搜索和处理文件 ---

def main():
    # 获取脚本运行的当前目录 (作为搜索的根目录)
    current_dir = os.getcwd()
    
    # 定义输出目录
    OUTPUT_DIR = os.path.join(current_dir, "output")
    
    # 创建 output 文件夹
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print("=" * 60)
    print(f"📂 所有处理后的文件将保存到目录: '{OUTPUT_DIR}'")
    print(f"🔍 开始在目录 '{current_dir}' 及其子目录中搜索所有文件...")
    print("=" * 60)

    # 遍历当前目录下的所有文件和子目录
    for root, dirs, files in os.walk(current_dir):
        # 忽略 output 目录本身
        if root.startswith(OUTPUT_DIR):
            continue
            
        for filename in files:
            file_path = os.path.join(root, filename)
            
            # 排除自身脚本文件
            if file_path == os.path.abspath(__file__):
                continue
            
            # --- 注意：由于输出文件名与原文件一致，我们无法再通过后缀排除已处理文件。 ---
            
            try:
                # 1. 计算文件相对于搜索根目录的路径
                relative_dir = os.path.relpath(root, current_dir)
                
                # 2. 构造输出文件在 OUTPUT_DIR 下的目录
                output_sub_dir = os.path.join(OUTPUT_DIR, relative_dir)
                os.makedirs(output_sub_dir, exist_ok=True) # 创建必要的子目录
                
                # 3. 构造最终的输出文件路径 (文件名与原文件一致)
                # ****** 关键改动在这里：移除了 "_dec" 后缀 ******
                dec_file_path = os.path.join(output_sub_dir, filename) 
                
                # 执行处理操作
                dec(file_path, dec_file_path)
                    
            except IOError as e:
                # 忽略无法访问或权限不足的文件
                print(f"⚠️ 无法读取文件 '{file_path}': {e}")
            except Exception as e:
                # 捕获其他未知错误
                print(f"🚨 处理文件 '{file_path}' 时发生未知错误: {e}")

    print("=" * 60)
    print("✅ 所有文件处理操作已完成。")

if __name__ == "__main__":
    main()
```

结果会输出在output目录下。

### 导出

随便找一个AS筛选一下导出即可。有几个角色的原皮找不到。

Rags - 大破

Tryst - 约会

Spine - 造型

## 姬百樂：劍與櫻的浪漫起舞(How To Raise A Harem)



## 白夜极光

[白夜极光_123云盘免登录下载不限速](https://www.123pan.cn/s/nVlCjv-RnrOA)



## 灵魂潮汐



## 悠久之树



## 魔姬物語



## 战姬收藏



## 闻姬起舞



## Nikke



## 尘白禁区 UE

40G

AES: `0xC14735FB5A872D2AFA76A5C38521AB8B8E21072C08525B913307608BD1182FA7`

## 鸣潮 UE



## 二重螺旋 UE







## FakeHeader

**FakeHeader**（伪头）是Unity资源文件的一种保护机制，通过在文件头部添加虚假的数据结构来干扰解包工具。

1. **前置填充**: 文件开头有大量00或FF填充
2. **多重签名**: 包含多个UnityFS签名
3. **大小错位**: 实际文件大小与头中记录不符
4. **加密数据**: 文件头包含非标准加密数据
5. **自定义结构**: 游戏自定义的保护结构

![image-20251031233624014](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510312336183.png)

1. **多个Unity版本字符串**：
   - `2021.3.8f1`
   - `2021.3.29f1`
   - 重复出现多次
2. **UnityFS签名位置异常**：
   - 真正的UnityFS签名不在文件开头
   - 前面有大量版本字符串和其他数据

## `AES`加密

```python
import os
import sys
import concurrent.futures
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
import multiprocessing

def text_to_hex(text, length_bytes):
    """将文本转换为指定长度的十六进制字符串"""
    bytes_data = text.encode('utf-8')
    hex_data = bytes_data.hex()
    
    # 截断或填充到指定长度
    target_length = length_bytes * 2  # 每字节对应2个十六进制字符
    if len(hex_data) > target_length:
        hex_data = hex_data[:target_length]
    else:
        hex_data = hex_data.ljust(target_length, '0')
    
    return hex_data

def decrypt_file(file_path, key, iv):
    try:
        with open(file_path, 'rb') as f:
            ciphertext = f.read()
        
        cipher = AES.new(key, AES.MODE_CBC, iv)
        decrypted_data = unpad(cipher.decrypt(ciphertext), AES.block_size)
        
        output_path = os.path.splitext(file_path)[0]
        with open(output_path, 'wb') as f:
            f.write(decrypted_data)
        
        return f"已解密: {file_path} -> {output_path}"
    except Exception as e:
        return f"解密失败 {file_path}: {str(e)}"

def traverse_directory(directory, key, iv):
    files_to_process = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            files_to_process.append(os.path.join(root, file))
    
    # 获取CPU核心数，设置线程池大小
    cpu_count = multiprocessing.cpu_count()
    thread_count = max(1, cpu_count)  # 至少1个线程
    
    print(f"使用 {thread_count} 个线程进行解密")
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=thread_count) as executor:
        # 提交所有文件解密任务
        future_to_file = {executor.submit(decrypt_file, file_path, key, iv): file_path for file_path in files_to_process}
        
        # 收集并打印结果
        for future in concurrent.futures.as_completed(future_to_file):
            result = future.result()
            print(result)

def main():
    while True:
        # 获取文件或目录路径
        path = input("请输入文件或文件夹路径(输入q退出): ").strip()
        if path.lower() == 'q':
            break
        if not os.path.exists(path):
            print("路径不存在，请检查后重试。")
            continue
        
        # 获取密钥和IV
        key_input = input("请输入16/24/32字节密钥(十六进制或普通文本): ").strip()
        iv_input = input("请输入16字节IV(十六进制或普通文本): ").strip()
        
        # 自动转换非十六进制输入
        try:
            key = bytes.fromhex(key_input)
        except ValueError:
            key_length = 32  # 默认16字节密钥
            if len(key_input) >= 24:
                key_length = 48  # 24字节密钥
            if len(key_input) >= 32:
                key_length = 64  # 32字节密钥
            key_hex = text_to_hex(key_input, key_length // 2)
            key = bytes.fromhex(key_hex)
            print(f"已将密钥转换为十六进制: {key_hex[:16]}...")
        
        try:
            iv = bytes.fromhex(iv_input)
        except ValueError:
            iv_hex = text_to_hex(iv_input, 16)
            iv = bytes.fromhex(iv_hex)
            print(f"已将IV转换为十六进制: {iv_hex}")
        
        # 验证密钥和IV长度
        if len(key) not in [16, 24, 32]:
            print("密钥长度必须是16、24或32字节。")
            continue
        if len(iv) != 16:
            print("IV长度必须是16字节。")
            continue
        
        # 处理文件或目录
        if os.path.isfile(path):
            print(decrypt_file(path, key, iv))
        else:
            traverse_directory(path, key, iv)
        
        # 询问是否继续
        while True:
            choice = input("是否继续? (y/n): ").strip().lower()
            if choice == 'y':
                break
            elif choice == 'n':
                return
            else:
                print("无效的选择，请输入y或n")

if __name__ == "__main__":
    try:
        from Crypto.Cipher import AES
    except ImportError:
        print("缺少pycryptodome库，请先安装: pip install pycryptodome")
        sys.exit(1)
    
    main()
```

还没用过。。



## Spine合并

[Spine文件怎么把文件和背景合二为一 - 讨论 - Live2DHub](https://live2dhub.com/t/topic/2780/19)

![image](https://live2dhub.com/uploads/default/original/2X/6/6cb8b210d05a99514ef2bd8b86badd46ae666287.png)

## AseetStudio Fork开发

### 环境设置

IDE为Rider

使用`.NET8.0` 开发

`MSbuild` 选择IDE自带的17.0版本。

![image-20251106203527957](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511062035072.png)

配置选择GUI，设置为`.NET8.0` 后启动。

![image-20251106203928618](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511062039727.png)

### 项目架构

