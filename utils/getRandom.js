module.exports = function (seed) {
    return (xoshiro128ss(seed, 0x9E3779B9, 0x243F6A88, 0xB7E15162));
};

function xoshiro128ss(a, b, c, d) {
        var t = b << 9, r = a * 5; r = (r << 7 | r >>> 25) * 9;
        c ^= a; d ^= b;
        b ^= c; a ^= d; c ^= t;
        d = d << 11 | d >>> 21;
        return (r >>> 0) / 4294967296;
}