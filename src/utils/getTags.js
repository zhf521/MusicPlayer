import jsmediatags from 'jsmediatags/dist/jsmediatags.min';

export async function getTags(file) {
    return new Promise(async (resolve, reject) => {
        jsmediatags.read(file, {
            onSuccess: function (tags) {
                resolve(tags);
            },
            onError: function (error) {
                reject(error);
            },
        });
    });
}
