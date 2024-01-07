import { formatStringToTime } from './formatTime';

// 格式化lrc字符串为数组
interface formattedLrc {
    time: number;
    word: string;
}

export function formatLyric(lrc: string): formattedLrc[] {
    const arr: string[] = lrc.split('\n');
    const result: formattedLrc[] = arr.map((item) => {
        const wordArr: string[] = item.split(']');
        return {
            time: formatStringToTime(wordArr[0].substring(1)),
            word: wordArr[1],
        };
    });
    return result;
}
