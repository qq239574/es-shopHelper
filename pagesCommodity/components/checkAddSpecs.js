// 檢查添加的子规格
export default function (list) {
    this.closePageLoading();
    let len = list.length;
    let tmp = '';
    let childLen = 0;
    if (list.length) {
        for (let i = 0; i < len; i++) {
            tmp = list[i];
            if (tmp.items.length) {
                if (tmp.title) {
                    childLen = tmp.items.length;
                    for (let j = 0; j < childLen; j++) {
                        if (tmp.items[j].title) {
                            continue;
                        } else {
                            this.Toast('请填写子规格名称');
                            return false;
                        }
                    }
                } else {
                    this.Toast('请填写规格名称');
                    return false;
                }

            } else {
                this.Toast('每个规格至少要有一个子规格');
                return false;
            }
        }
    }

    return true;
}