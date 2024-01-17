export function getMusicCover(TagsPicture) {
    // console.log(TagsPicture);
    if (TagsPicture) {
        const { data, format } = TagsPicture;
        let base64String = '';
        for (let i = 0; i < data.length; i++) {
            base64String += String.fromCharCode(data[i]);
        }
        return `data:${data.format};base64,${window.btoa(base64String)}`;
    } else {
        return '/defaultCover.png';
    }
}
