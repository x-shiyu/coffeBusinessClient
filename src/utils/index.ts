import dayjs from "dayjs";
export function formatDate(time: number) {
    return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}