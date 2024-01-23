import jsmediatags from 'jsmediatags/dist/jsmediatags.min';

export function getTags(file) {
    return new Promise((resolve, reject) => {
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
