import { formatStringToTime } from './formatTime';

// 解析lrc文件，得到{time:number,word:string}[]
export function formatLyric(lrc: string) {
    if (lrc) {
        const arr = lrc.split('\n');
        const result = arr.map((item) => {
            const wordArr = item.split(']');
            return {
                time: formatStringToTime(wordArr[0].substring(1)),
                word: wordArr[1],
            };
        });
        return result;
    } else {
        return [];
    }
}
