
//#######################
var browser = {
    version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
    safari: /webkit/.test(userAgent),
    opera: /opera/.test(userAgent),
    msie: (/msie/.test(userAgent)) && (!/opera/.test(userAgent)),
    mozilla: (/mozilla/.test(userAgent)) && (!/(compatible|webkit)/.test(userAgent))
};