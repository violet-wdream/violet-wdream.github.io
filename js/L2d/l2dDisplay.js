async function loadModelsJson() {
    try {
        const response = await fetch('/assets/l2d/models.json');
        const omModels = await response.json();
        return omModels; // 返回模型数组
    } catch (error) {
        console.error('Error loading models:', error);
        return []; // 在出错时返回空数组
    }
}
async function OML2DDisplay() {
    await loadModelsJson();
    OML2D.loadOml2d({
        dockedPosition:"left",
        menus: {
            disable: true,
        },//menus
        tips:{
            style :{
                display: "none",
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
                zIndex:9999,
            },
        },//tips
        models: [
            {
                "name": "rangbaer_5",
                "path": "/assets/l2d/Azurlane/rangbaer_5/rangbaer_5.model3.json",
                "position": [-140, -70],
                "scale": 0.082,
                "stageStyle": {
                    "width": 460,
                    "height": 490
                }
            },
        ],
    });
}

