// 把时间格式处理为字符串
export function formatTimeToString(totalSeconds: number): string {
    const minutes: number = Math.floor(totalSeconds / 60);
    const seconds: number = Math.floor(totalSeconds % 60);
    const formattedMinutes: string = String(minutes).padStart(2, '0');
    const formattedSeconds: string = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

// 把时间字符串格式处理为number
export function formatStringToTime(str: string): number {
    const timeArr: string[] = str.split(':');
    return +timeArr[0] * 60 + +timeArr[1];
}
