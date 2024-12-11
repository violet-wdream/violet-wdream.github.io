import { loadOml2d } from 'oh-my-live2d';

const oml2d = loadOml2d({
    mobileDisplay: true,
    models: [
        {
            path: 'https://model.oml2d.com/HK416-1-normal/model.json',
            position: [0, 60],
            mobilePosition: [80, 80],
            scale: 0.08,
            mobileScale: 0.06,
            stageStyle: {
                height: 450,
            },
            mobileStageStyle: {
                height: 370,
                width: 400,
            },
            showHitAreaFrames: true,
        },
    ],
});

oml2d.onStageSlideIn(() => {
    oml2d.tipsMessage(
        `欢迎使用 OhMyLive2D, <br/>当前版本: ${oml2d.version}`,
        4000,
        10
    );
});
