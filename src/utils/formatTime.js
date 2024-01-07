// 把时间格式处理为字符串
export function formatTimeToString(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

// 把时间字符串格式处理为number
export function formatStringToTime(str) {
    const timeArr = str.split(':');
    return +timeArr[0] * 60 + +timeArr[1];
}
