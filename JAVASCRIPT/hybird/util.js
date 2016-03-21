window["checkSingleTap"] = function(x, y) {
    var target,
        scrolledY = window.scrollY,
        action = "",
        args = "{}";

    if (scrolledY > 0) {
        if (document.elementFromPoint(0, scrolledY + window.innerHeight - 1) != null) {
            y += scrolledY;
        }
    }

    target = document.elementFromPoint(x, y);

    targetBehave(target);
}
