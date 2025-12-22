---
layout: post
title: WdreamDownLoader
date: 2025-12-20
tags:
  - Unity2D
---






## 日志

1. **GameJsonLoader (`Assets/Scripts/Tools/GameJsonLoader.cs`)**
   - 启动时从相对路径 `assets/config/games.json` 读取所有游戏配置，解析为 `GameConfig` 列表并缓存为字典。
   - 为 `GameTab` 批量创建 `GameTabItem`，为每个条目绑定 `AddToggleListener`，在选中时更新当前游戏并触发 Catalog 内容刷新。
   - 选中游戏后会调用 `RegisterCatalogTab` 将对应的 `catalog` 字段同步进 `CatalogTab` 输入项，实现 Function/Catalog Tab 的联动。

2. **GameTab (`Assets/Scripts/UI/Tab/GameTab.cs`)**
   - 继承 `Tab<GameTab>` 管理左侧游戏列表的 UI 生命周期，负责 `GameTabItem` 的实例化、登记与销毁。
   - 用 `List<GameTabItem>` 保存全部条目，并维护 `currentItem` 作为当前选中状态；`CreateItems` 统一注入 id/title/icon 更新时间等显示信息。
   - `Clear` 会销毁现有条目并输出日志，保证重新加载配置或切换环境时 UI 干净可控。

3. **GameTabItem (`Assets/Scripts/UI/Items/GameTabItem.cs`)**
   - 包装单个左侧游戏条目，内部使用 `Toggle`/`ToggleGroup` 实现单选效果。
   - 提供 `SetId/SetTitle/SetIcon/SetLastUpdateTime` 等私有方法，在 `Initialize` 中集中完成展示信息配置，并支持从磁盘路径动态加载图标。
   - 对外暴露 `AddToggleListener`、`GetGameId` 等方法，便于 `GameTab` 或 `GameJsonLoader` 监听选中事件。

4. **CatalogTab (`Assets/Scripts/UI/Tab/CatalogTab.cs`)**
   - 管理 GetCatalog 页面：生成/记录 `InputTextItem`，响应下拉选项与操作按钮，负责右侧内容区域的 UI 状态。
   - 按选项触发不同流程：批量 URL 有效性校验、获取最新版本号、拼接 Catalog 下载地址、拉取并 LZ4 解压 Catalog，再落盘到用户指定位置。
   - `Clear` 会销毁现有输入项并重置 `MLogger`，同时在按钮操作前校验 `GameTab` 是否已有选中项以避免误操作。

5. **InputTextItem (`Assets/Scripts/UI/Items/InputTextItem.cs`)**
   - 简单的标题 + 输入框组件，封装标题 `TextMeshProUGUI` 与内容 `TMP_InputField`。
   - `Initialize` 支持设置默认文本与是否可编辑，`SetIsEditable` 用 `readOnly` 属性切换输入权限。

6. **MLogger (`Assets/Scripts/UI/MLogger.cs`)**
   - 场景内的统一日志面板，按行数自动分页，内置提示/警告/错误/下载等多种彩色提示格式。
   - 支持导出日志文件、复制全部文本到剪贴板、清空现有内容等按钮操作，所有输出会带时间戳。
   - 通过 `Singleton` 模式暴露 `Instance`，供各 UI/工具脚本直接调用 `LogTip/LogWarning/LogError` 等方法。

7. **Web (`Assets/Scripts/Tools/Web.cs`)**
   - 提供静态 `CheckURL` 协程：优先发送 `HEAD` 请求，失败时退回 `GET` 验证文本内容，再将结果输出到 `MLogger`。
   - 采用 `MonoBehaviour` 单例维持生命周期，便于 `CatalogTab` 直接 `StartCoroutine` 发起网络检查。

8. **TriggerUI (`Assets/Scripts/UI/TriggerUI.cs`)**
   - 监听按钮或快捷键切换 UI 显隐，支持 `CanvasGroup` 与 `SpriteRenderer` 两种渲染组件的淡入淡出效果。
   - 初始化时按照 `defaultOn` 设置透明度，`UpdateVisibility` 使用 `Mathf.Lerp` 平滑过渡并在充分接近目标值后同步交互性。
   - 提供 `ShowUI/HideUI/ButtonTrigger` 等方法，且可选触发 `Animator` 数组中的 `start` 参数，以便在显隐时联动过场动画。



