async function loadModelsJson() {
    await fetch('/l2d/models.json');
}
async function OML2DDisplay() {
    await loadModelsJson();
    OML2D.loadOml2d({
        dockedPosition:"right",
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
                "name": "bisimai_2",
                "path": "/l2d/Azurlane/bisimai_2/bisimai_2.model3.json",
                "position": [-140, -160],
                "scale": 0.09,
                "stageStyle": {
                    "width": 400,
                    "height": 400
                }
            }
        ],
    });
}

