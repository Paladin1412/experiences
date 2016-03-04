// 解决ios页面滑动问题
$(window).on("touchmove", function (event_) {
    var tag = $(event_.target).parents()[0].tagName;
    var thistag = event_.target.tagName;
    if (event_.cancelable && tag != "A" && tag != "INPUT" && tag != "TEXTAREA" && tag != "SELECT" && thistag != "A" && thistag != "INPUT" && thistag != "TEXTAREA" && thistag != "SELECT") {
        event_.preventDefault();
    }
});
// 解决ios双击页面上跳问题
$(window).bind("touchstart", function (event_) {
    if (event_.cancelable) event_.preventDefault();
});

// 移动端:active伪类无效的解决办法
try {
    document.body.addEventListener('touchstart', function () {
    });
} catch (e) {
}
