import dayjs from "dayjs";
export function formatDate(time: number) {
    return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}


export function getBase64(img: any, callback: any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}