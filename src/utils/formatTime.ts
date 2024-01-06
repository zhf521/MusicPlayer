export function formatTimeToString(totalSeconds) {
    if (totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    } else {
        return '00:00';
    }
}

// 把时间字符串格式处理为number(秒)
export function formatStringToTime(str) {
    const timeArr = str.split(':');
    return +timeArr[0] * 60 + +timeArr[1];
}
