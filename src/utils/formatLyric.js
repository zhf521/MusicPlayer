import { formatStringToTime } from './formatTime';

// 格式化lrc字符串为数组
export function formatLyric(lrc) {
    const arr = lrc.split('\n');
    const result = arr.map((item) => {
        const wordArr = item.split(']');
        return {
            time: formatStringToTime(wordArr[0].substring(1)),
            word: wordArr[1],
        };
    });
    return result;
}
