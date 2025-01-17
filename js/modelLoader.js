// It is used to load the models.json file and populate the model index select dropdown
document.addEventListener('DOMContentLoaded', function() {
    fetch('/l2d/models.json')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('modelIndexSelect');
            var index = 0;
            data.forEach(item => {
                const opt = document.createElement('option');
                opt.value = index;
                opt.textContent = item.name;
                select.appendChild(opt);
                index++;
            });
        })
        .catch(error => console.error('Error fetching the JSON file:', error));
});

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
    //监听模型选择框的变化
    document.getElementById('modelIndexSelect').addEventListener('change', function () {
        oml2d.loadModelByIndex(modelIndexSelect.value);
    });
}
async function OML2DInit() {
    const omModels = await loadModelsJson(); // 等待 loadModelsJson 执行完毕
    OML2D.loadOml2d({
        dockedPosition:"right",
        menus: {
            disable: false,
            items: [
                {
                    id: "Rest",
                    icon: "icon-rest",//icon in icon.js
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
                    id: "SwitchModels",
                    icon: "unorderedlist",
                    title: "换模型",
                    onClick(i) {
                        var isSelectShow = modelIndexSelect.style.display;
                        modelIndexSelect.style.display = isSelectShow=='block'?'none':'block';
                        setupModelLoader(i);
                    }
                },{
                    id:"ShowHitAreaFrames",
                    icon: "icon-tubiaohuizhi",
                    title: "显示可点击区域",
                    onClick(i) {
                        var currentIndex = i.modelIndex;
                        var currentShowHitAreaFrames;
                        if (currentShowHitAreaFrames != null) {
                            currentShowHitAreaFrames = false;
                            i.options.models[currentIndex].showHitAreaFrames = false;
                        }else {
                            currentShowHitAreaFrames = i.options.models[currentIndex].showHitAreaFrames;
                        }
                        currentShowHitAreaFrames ? i.hideModelHitAreaFrames() : i.showModelHitAreaFrames();
                        i.options.models[currentIndex].showHitAreaFrames = !currentShowHitAreaFrames;
                    }
                }, {
                    id: "SwitchEmoji",
                    icon: "icon-biaoqing",
                    title: "切换表情",
                    onClick(i) {
                        if (i.models.model?.internalModel.motionManager.expressionManager==null){
                            i.tips.notification("当前模型没有表情~");
                        }else {
                            i.models.model?.internalModel.motionManager.expressionManager?.setRandomExpression();
                        }
                    }
                },{
                    id: "Github",
                    icon: "github-fill",
                    title: "Github",
                    onClick() {
                        window.open("https://github.com/violet-wdream")
                    }
                },
                {
                    id: "About",
                    icon: "icon-about",
                    title: "关于",
                    onClick() {
                        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
                    },
                }
            ],//items按钮
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
            interval:5500,
            style :{
                //display: "none",
                //display: "flex",
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
                alignItems: "center",
                minHeight: "100px",
                zIndex:10000,
            },
            messageLine:3,
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
}

