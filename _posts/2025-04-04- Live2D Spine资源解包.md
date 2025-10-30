---
layout: post
title: Live2D Spine资源解包
date: 2025-10-29
tags:
  - Spine
  - Live2D
---

## 碧蓝航线Azurlane

b服

模拟器文件夹路径

![image-20251029164709609](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510291647756.png)

将文件放入AssetBundler处理，选择导出Live2D model

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





## 奇点时代

国服

![image-20251029165540322](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510291655358.png)

按照文件大小排序

![image-20251029172007601](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510291720639.png)

筛选文件类型然后导出筛选的文件

![image-20251029172448469](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510291724494.png)

导出后会在两个文件夹中`TextAsset` 和 `Texure2D`，合并到一个文件夹

然后按名称排序即可

![image-20251029172700802](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510291727838.png)

有的模型被分尸了，由好几个spine模型共同组成，需要合并起来，暂时没有找到合适的合并方法。

目前只能取Live2DViewerEX市场找处理好的模型，解包Lpk文件。

还有比较nc的部分就是有的skel对应的atlas文件不对，需要查看skel的内容看一下里面的部件和atlas是不是一样的。

模型文件分类sh脚本，可以把一个模型的文件放到一个文件夹，但是有些模型背景图的命名不规则，不能分类，只能自行分辨。

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



## 银与绯

目前无解

## 绯色回响

b服，直接b站搜就有apk下载，国服是和谐版的不过版本更领先，外服没有和谐，但是落后好几个版本。

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

这个游戏的spine模型纹理图都被加密了，无法直接打开，尝试解密。

解密方法来自https://live2dhub.com/t/topic/2984/17

这里还需要使用TexturePacker

[texturepacker汉化版下载 texturepacker(图片资源打包器) v7.0.3 汉化安装版(附使用教程) 64位 下载-脚本之家](https://www.jb51.net/softs/735004.html)

但是呢这个激活版本有点问题，有的时候会解密失败提示需要购买许可证。。。但是我对这个失败的模型单独尝试了一次，发现又解密成功了，不知道是不是他这个py脚本有点问题。

经过我的努力prompt，大概率是读写问题，文末给出修正版本。



另外一个激活方式，有点麻烦，需要编译dll

[TexturePackerGUI pro学习版 - tieyan - 博客园](https://www.cnblogs.com/tieyan/p/16857659.html)

如果解密失败了就会只有纹理图的形状，然后会贴上水印

![image-20251030103420692](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510301034921.png)



正常下载完TexturePacker

然后把bin加入Path环境变量，因为这个py脚本会调用CLI

![image-20251029195806429](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510291958489.png)

这个是我重新修改的版本，因为生成了很多中间备份文件，所以可能速度会慢很多。

目录结构：

![image-20251030143249287](https://cdn.jsdelivr.net/gh/violet-wdream/Drawio/PNG/202510301432382.png)

`decrypt_png_new.py`

```python
import os
import sys
import shutil
from pathlib import Path

DAT_0180ac00 = [19, 91, 12, 13, 102, 22, 34, 43, 17, 25, 88, 64, 36, 16, 14, 66,
                49, 87, 56, 44, 53, 28, 11, 5, 116, 37, 58, 105, 20, 15, 77, 7, 29,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19, 91, 12, 13, 102, 22,
                34, 43, 17, 25, 88, 64, 36, 16, 14, 66, 49, 87, 56, 44, 53, 28, 11, 5,
                116, 37, 58, 105, 20, 15, 77, 7, 29, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0]


def safe_file_operation(filepath, operation_func):
    """安全的文件操作封装"""
    temp_path = filepath + ".tmp"
    backup_path = filepath + ".bak"

    try:
        # 步骤1: 读取原文件
        with open(filepath, "rb") as f:
            original_data = f.read()

        # 步骤2: 执行处理操作
        result_data = operation_func(bytearray(original_data))

        if result_data is None:
            return False

        # 步骤3: 写入临时文件
        with open(temp_path, "wb") as f:
            f.write(result_data)

        # 步骤4: 备份原文件
        if os.path.exists(backup_path):
            os.remove(backup_path)
        shutil.copy2(filepath, backup_path)

        # 步骤5: 用临时文件替换原文件
        os.remove(filepath)
        os.rename(temp_path, filepath)

        return True

    except Exception as e:
        # 恢复操作：删除临时文件，确保原文件存在
        if os.path.exists(temp_path):
            try:
                os.remove(temp_path)
            except:
                pass

        # 如果原文件被删除，从备份恢复
        if not os.path.exists(filepath) and os.path.exists(backup_path):
            try:
                shutil.copy2(backup_path, filepath)
            except:
                pass

        print(f"文件操作失败 {filepath}: {e}")
        return False


def process_file_data(t):
    """处理文件数据的核心逻辑（与原脚本相同）"""
    size = len(t)
    k = t.copy()
    off = 5
    b = t[4]

    if (t[0] == 85) and (t[1] == 70):  # U and F
        if (t[size - 13] == 73) and (t[size - 12] == 69):  # I and E
            k[0] = 137  # PNG header
            k[1] = 80
            k[2] = 78
            k[3] = 71
            k[4] = 13
        else:
            k[0] = 67  # CCZ header
            k[1] = 67
            k[2] = 90
            k[3] = 33
            k[4] = 0

        # 解密数据
        for i in range(off, min(0x64, size)):
            k[i] = k[i] ^ DAT_0180ac00[(i + b) % 0x21]

        return k
    else:
        # 不是加密文件，返回None跳过处理
        return None


# 主循环保持不变
for subdir, dirs, files in os.walk(os.getcwd()):
    for file in files:
        filepath = subdir + os.sep + file

        if filepath.endswith(".png"):
            # 使用安全的文件操作
            success = safe_file_operation(filepath, process_file_data)

            if success:
                # 检查是否需要重命名（与原逻辑相同）
                try:
                    with open(filepath, "rb") as f:
                        header = f.read(4)
                    if header == b'CCZ!':
                        base_file, ext = os.path.splitext(filepath)
                        if ext == ".png":
                            os.rename(filepath, base_file + ".pvr.ccz")
                            print(f"重命名: {filepath} -> {base_file + '.pvr.ccz'}")
                except Exception as e:
                    print(f"重命名检查失败 {filepath}: {e}")

# TexturePacker处理部分保持不变
for subdir, dirs, files in os.walk(os.getcwd()):
    for file in files:
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

`delete_bak-backup-czz-plist`删除备份文件/中间文件，如果确定所有的png都解密成功就可以执行这个脚本把多余的文件删了。

```python
import os

def clean_files():
    """删除指定后缀的备份文件"""
    extensions = ['.bak', '.backup', '.ccz', '.tmp', '.plist']
    
    for subdir, dirs, files in os.walk(os.getcwd()):
        for file in files:
            if any(file.endswith(ext) for ext in extensions):
                filepath = os.path.join(subdir, file)
                try:
                    os.remove(filepath)
                    print(f"删除: {filepath}")
                except Exception as e:
                    print(f"删除失败 {filepath}: {e}")

if __name__ == "__main__":
    clean_files()
    print("清理完成")
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

