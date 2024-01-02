export function compareArrays(arr1, arr2) {
    // 比较数组长度
    if (arr1.length !== arr2.length) {
        return false;
    }
    // 比较每个对象的属性值是否相等
    for (let i = 0; i < arr1.length; i++) {
        const obj1 = arr1[i];
        const obj2 = arr2[i];
        // 比较对象的属性个数
        if (Object.keys(obj1).length !== Object.keys(obj2).length) {
            return false;
        }
        // 比较对象的属性值
        for (let key in obj1) {
            if (obj1[key] !== obj2[key]) {
                return false;
            }
        }
    }
    return true;
}
