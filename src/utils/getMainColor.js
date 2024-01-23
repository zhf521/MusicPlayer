import ColorThief from '../../node_modules/colorthief/dist/color-thief.mjs';
import { getMusicCover } from './getMusicCover';
import { rgbToHex } from './rgbToHex';

export function getMainColor(pic) {
    const colorThief = new ColorThief();
    // 创建一个Image对象
    const image = new Image();
    // 将base64字符串设置为Image对象的src
    image.src = getMusicCover(pic);
    // 等待Image加载完成
    return new Promise((resolve, reject) => {
        image.onload = () => {
            // 获取图片的主色
            const color = colorThief.getColor(image, 10);
            // // 将RGB颜色转换为Hex颜色
            // const hexColor = rgbToHex(color[0], color[1], color[2]);
            resolve(color);
        };
        image.onerror = (err) => {
            reject('获取图片主色失败：', err);
        };
    });
}
