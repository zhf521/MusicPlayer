// 随机洗牌函数
export const randomShuffle = (arr) => {
    const result = arr.slice();
    let n = result.length;
    let random;
    while (0 != n) {
        random = Math.floor(Math.random() * n--);
        [result[n], result[random]] = [result[random], result[n]];
    }
    return result;
};
