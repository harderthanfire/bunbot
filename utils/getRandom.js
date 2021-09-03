module.exports = function (seed) {
    // this is the mulberry32 seeded pseudo random number generator, I have no clue how this works
    let localseed = seed;
    let t = (localseed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
