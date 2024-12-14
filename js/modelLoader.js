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
function setupModelLoader(oml2d) {
    // 获取当前模型的索引
    var currentIndex = oml2d.modelIndex;
    // 获取当前模型可点击区域是否显示
    if (oml2d.options.models.length > 0)
        var currentShowHitAreaFrames = oml2d.options.models[currentIndex].showHitAreaFrames;
    //监听模型选择框的变化
    document.getElementById('modelIndexSelect').addEventListener('change', function () {
        var selectedIndex = modelIndexSelect.value;
        oml2d.loadModelByIndex(selectedIndex);
    });
    document.getElementById('loadModelHitAreaFramesButton').addEventListener('click', function () {
        // 获取选择的索引
        currentShowHitAreaFrames ? oml2d.hideModelHitAreaFrames() : oml2d.showModelHitAreaFrames();
        currentShowHitAreaFrames = !currentShowHitAreaFrames;
    });
}
async function OML2DInit() {
    const omModels = await loadModelsJson(); // 等待 loadModelsJson 执行完毕
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
    setupModelLoader(oml2d);
}
