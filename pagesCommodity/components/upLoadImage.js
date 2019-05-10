import domain from '../../api/domain.js'
export default function (data) {
    let tmp = '';
    let list = [];
    for (let k in data) {
        if (k.indexOf('data[goods][thumbs]') > -1 || k.indexOf('data[goods][thumb]') > -1) {
            tmp = data[k];
            if (/^http|wxfile.+/.test(tmp)) {
                list.push(new Promise((resolve, reject) => {
                    this.Request('uploadImg', {
                        filePath: tmp
                    }).then(res => {
                        if (res.statusCode == 200) {
                            let tmp = res.data && JSON.parse(res.data) || ''
                            if (tmp.error === 0) {
                                data[k] = tmp.data.path; 
                            }
                        }
                        resolve()
                    }).catch(res => {
                        resolve()
                    })

                }))
            }
        }
    }


    return new Promise((resolve, reject) => {
        Promise.all(list).then(res => {
            resolve(data)
        });
    })
}