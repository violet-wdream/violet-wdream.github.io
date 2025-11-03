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

后续如果还需要获取新角色模型可以记住文件路径，然后更新后按照时间排序。

比如碧蓝航线的的就很简单

L2DViewerJson配置清单TODO

- [ ] 碧蓝航线
- [ ] 绯色回响
- [ ] 银与绯
- [ ] 锚点降临





## 碧蓝航线(Azurlane) Spine/Live2D - 无加密

b服版本最高，模拟器搜索b服下载，和谐的皮肤后缀是hx，有单独的文件。所以不需要进行反和谐操作。

参考[AL 逆向解包：live2d, spine 动态立绘，背景图_live2dhub-CSDN博客](https://blog.csdn.net/dilvx/article/details/144655909)

### Spine路径

#### 动态立绘复原

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





## 奇点时代(CrazyOnes) Spine/Live2D - 无加密

国服，没外服，模拟器商店搜索下载

### 路径

![image-20251029165540322](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510291655358.png)

### 导出

直接搜`spine`或者按照文件大小排序（在模拟器里面排序也可以，不用全部下载）

![image-20251029172007601](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510291720639.png)

筛选文件类型然后导出筛选的文件

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





## 绯色回响(Echocalypse) Spine - png图片UF加密

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

压缩后会自动存放到以下目录，然后复手动制到共享文件夹中移动到PC。

![image-20251030005203202](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510300052254.png)

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





## 银与绯(Silver and Blood)  Spine - FakeHeader

官服下载，最好下PC版本的，有20G大小。。。

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



## 锚点降临(Anchor Panic) Spine - FakeHeader

### Spine路径

根据b友描述官服应该没有和谐。所以不需要做什么处理。

#### 静态资源

打开apk安装包（后缀改成rar）

在这个路径，排序一下找到spine关键字就能找到目标文件。

![image-20251101120204610](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511011202758.png)

#### 热更新资源

![image-20251101110306391](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511011103461.png)

安装游戏然后开始下载，根据我的观察总共要下载10G的话下载前3G左右就行了，看下这个路径有没有spine关键字文件

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

## 无期迷途(PathToNowhere)  Live2D XOR-FakeHeader加密

[无期迷途即将下架皮肤一览_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1uCSaYBEcc?spm_id_from=333.788.recommend_more_video.0&trackid=web_related_0.router-related-2206146-j9vhc.1762012978487.264&vd_source=cc62639f8cba7649c1be3fdeff181bb1)

还有的皮肤被下架了，不知道文件会不会也删除了？

[无期迷途解包教程 - 哔哩哔哩](https://www.bilibili.com/opus/1003619413382922275)

[无期迷途解包问题 - 讨论 - Live2DHub](https://live2dhub.com/t/topic/2636/11)

建议先进行反和谐，然后再启动游戏下载资源。。。。

当然我觉得先下载资源也可以，前者更“稳定”一些。

### 反和谐

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

### Live2D路径

真想吐槽一下他这个游戏的资源修复功能，竟然是把文件删了重下！我还想着反和谐了要不要修复下资源，byd重新下载13G文件:angry:

找到这个目录，这个是常规资源

`Android > data > com.zy.wgmt.cn > files > fs`

这个是反和谐资源，就6个模型

`Android > data > com.zy.wgmt.cn > files > fs_anti`

### 解密 XOR - FakeHeader

加密方式为XOR加密然后再用FakeHeader处理。

先用XOR处理加密

![image-20251101234454758](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511012344854.png)

打开解密后的文件，可以看到是FakeHeader

![image-20251101234756302](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511012347367.png)

所以再用AS选择FakeHeader打开文件。

### 导出

Raz版本的AS没有一键导出Live2D模型，能导出模型的就不能解密。。。

去找一个能解密还能导出Live2D模型的版本

欸，还真有`AssetStudioModGUI_PtN_net6_win64`

这个版本很有意思，好像会自动解密，然后还识别了FakeHeader，也就是说如果你用这个版本，前面的解密都不需要了，太吊了。

谷歌[无期迷途 - Google Drive](https://drive.google.com/drive/folders/1J6XrLk0rkyBBTs832AMC4qTWvGluPyNH)

百度网盘链接: https://pan.baidu.com/s/18dJhlonBf2YPKjLIqDGMbw 提取码: njrj  [百度网盘的直链](https://xaky-ct01.baidupcs.com/file/e3db05588hd748da0c2855df4f3572ca?bkt=en-06f5c65000af0ed6ec97cc402028d2551657861b4572ed3a8d355a66adc62041e5c5e76aa1dfc857&fid=727574993-250528-27743458152824&time=1762010383&sign=FDTAXUbGERLQlBHSKfWqiu-DCb740ccc5511e5e8fedcff06b081203-U270PLsheehEv0q2cDmeojBJD1Y%3D&to=423&size=8722649&sta_dx=8722649&sta_cs=1&sta_ft=zip&sta_ct=7&sta_mt=7&fm2=MH%2CXian%2CAnywhere%2C%2C%E5%B1%B1%E4%B8%9C%2Cct&ctime=1721902432&mtime=1721902483&dt3=1&resv0=-1&resv1=0&resv2=rlim&resv3=5&resv4=8722649&vuk=1101885353688&iv=0&vl=1&htype=&randtype=&tkbind_id=0&newver=1&newfm=1&secfm=1&flow_ver=3&pkey=en-0fa68bbab0c627fc53d35caf133b64aa2eccd0b48b005679b4591cff0a0237e514966ab30788a58e&sl=76480590&expires=8h&rt=sh&r=831071696&vbdid=1931342370&fin=AssetStudioModGUI_PtN_net6_win64_%E6%97%A0%E6%9C%9F%E8%BF%B7%E9%80%94%E8%A7%A3%E5%8C%85.zip&fn=AssetStudioModGUI_PtN_net6_win64_%E6%97%A0%E6%9C%9F%E8%BF%B7%E9%80%94%E8%A7%A3%E5%8C%85.zip&rtype=1&clienttype=0&dp-logid=155633359373068920&dp-callid=0.1&hps=1&tsl=80&csl=80&fsl=-1&csign=dCyg0CjQ08I72LQD9e7vfp6l9uM%3D&so=0&ut=6&uter=4&serv=0&uc=1932830873&ti=e292035734ac5995ec2bce18f5ae5ab907aafc5a4be5d733305a5e1275657320&hflag=30&from_type=1&adg=c_bde7ace3b58713cc81bc72712acab032&reqlabel=250528_f_b817382d5900efc0a64dffcc082a10de_-1_600e7b90424f20ffd08975a88f5721ce&fpath=%E8%A7%A3%E5%8C%85&by=themis&resvsflag=1-0-0-1-1-1)

在导入Unity时，model3.json和moc3都会被转换成MonoBehaviour，但是容器路径被处理了

并不是原生L2D的文件，所以没法直接导出。

以下选择这个PtN(Path to Nowhere定制版)AS操作。

建议导出目录选择为容器路径

![image-20251102120848438](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511021208497.png)

选择导出

1. Monobehaviour （需要的motions/moc3）
2. Animator （需要的fbx提取参数表）
3. Texture2D

![image-20251102121031062](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511021210123.png)

按大小排序，这个最大的json文件就是moc3文件。

![image-20251102120950724](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511021209781.png)





#### json转moc3

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

然后使用脚本提取moc3文件（把json文件的_bytes数组合并**合成完整的二进制文件**）。

![image-20251102114948690](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511021149782.png)

#### .fade.json转motion3.json

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
                    "Id": obj.ParameterIds[i],
                    "Segments": Segments
                })
            }
            motion3Json.Meta.CurveCount = obj.ParameterIds.length
            motion3Json.Meta.Duration = maxTime
            motion3Json.Meta.TotalSegmentCount = TotalSegmentCount
            motion3Json.Meta.TotalPointCount = obj.ParameterIds.length + TotalSegmentCount
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

processFadeFiles("character");
```

使用脚本将`.fade.json` 转换为`.motion3.json`

Byd  `ParameterId`被hash过了，变成`ParameterIdHashes`字段了

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

然后再用这些参数名作为字典，破解hash，利用脚本得到真正的`.motion3.json`，目前尝试了常见的hash函数都没求出来。

统计所有的hash出现次数。



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

猜测出现频率最高的hash对应参数

```json
ParamAngleX
ParamAngleY
ParamEyeLOpen
ParamBreath
ParamEyeROpen 
ParamBodyAngleX
ParamBodyAngleY
```





#### 生成model3.json



#### `fs_anti`文件夹部分

反和谐资源6个模型

`Android > data > com.zy.wgmt.cn > files > fs_anti`



char2d adela 2

char2d coquelicot 2

char2d eleven 2

char2d hameier 2

char2d jiushijiu 2

char2d oak 2

我有一系列的这样的文件夹在根目录，每个文件夹中都有个一个含有_bytes字段的name.json，我已经用这个字段合成了name.moc3文件并存放到根目录下的Extracted目录中的name子目录



#### `fs`文件夹部分

`Android > data > com.zy.wgmt.cn > files > fs`

重头戏来了，这个文件夹有4500多个文件，如果一口气丢到AS里，大概要消耗14G内存！

如果你想一次搞定，你起码需要24/32G内存。

所以这里建议分两批来搞，这里的资源命名全是hash，没什么规律，所以我建议按照文件大小来。

2M以上的算Pack1，剩下的Pack2

![image-20251102102722501](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202511021027588.png)





## 深空之眼



## 交错战线



## 放置天使



## 星落



## 麻雀一番街



## 棕色尘埃



## 天命之子



## 少女前线



## 少女战争



## 尘白禁区 UE



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
