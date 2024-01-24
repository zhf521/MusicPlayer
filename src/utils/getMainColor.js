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
            const color = colorThief.getPalette(image, 2);
            const color1 = `rgba(${color[0][0]}, ${color[0][1]}, ${color[0][2]}, 0.3)`;
            const color2 = `rgba(${color[1][0]}, ${color[1][1]}, ${color[1][2]}, 0.3)`;
            const mainColor = [color1, color2];
            resolve(mainColor);
        };
        image.onerror = (err) => {
            reject('获取图片主色失败：', err);
        };
    });
}
