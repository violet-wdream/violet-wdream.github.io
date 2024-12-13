function setupModelLoader(oml2d) {
    var currentIndex = oml2d.modelIndex;
    var currentShowHitAreaFrames = oml2d.options.models[currentIndex].showHitAreaFrames;
    var selectedIndex = document.getElementById('modelIndexSelect').value;

    //oml2d.loadModelByIndex(selectedIndex);
    modelIndexSelect.addEventListener('change', function () {
        var selectedIndex = modelIndexSelect.value;
        console.log(currentShowHitAreaFrames);
        console.log(selectedIndex);
        oml2d.loadModelByIndex(selectedIndex);
    });
    document.getElementById('loadModelHitAreaFramesButton').addEventListener('click', function () {
        // 获取选择的索引
        currentShowHitAreaFrames ? oml2d.hideModelHitAreaFrames() : oml2d.showModelHitAreaFrames();
        currentShowHitAreaFrames = !currentShowHitAreaFrames;
        //console.log(currentShowHitAreaFrames); // 当前配置选项
    });
}
