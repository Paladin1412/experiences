/**
 * 快速创建带有属性值的element
 * @param type
 * @param properties
 * @returns {Element}
 */
function createElement(type, properties) {
    var elem = document.createElement(type), p, val, s;
    for (p in properties) {
        val = properties[p];
        if (p === 'style') {
            for (s in val)
                elem.style[s] = val[s];
        } else {
            elem[p] = val;
        }
    }
    return elem;
}