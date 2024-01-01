export default async function getTag(file) {
    return new Promise(async (resolve, reject) => {
        jsmediatags.read(file, {
            onSuccess: function (tag) {
                resolve(tag);
            },
            onError: function (error) {
                reject(error);
            },
        });
    });
}
