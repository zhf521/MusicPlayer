import { formatStringToTime } from './formatTime';

// 格式化lrc字符串为数组
export function formatLyric(lrc) {
    if (lrc) {
        const arr = lrc.split('\n');
        const result = arr.map((item) => {
            const wordArr = item.split(']');
            return {
                time: formatStringToTime(wordArr[0].slice(1)),
                word: wordArr[1],
            };
        });
        return result;
    } else {
        return [{ time: 0, word: '当前歌曲暂没有歌词' }];
    }
}
