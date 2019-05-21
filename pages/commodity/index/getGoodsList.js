import {
    resolve
} from "url";

export default function (search = {
    status: 1, //1出售 3已售罄 -2仓库中 -1回收站
    title: '',
    category_ids: '',
    group_ids: '',
    type: '', //1实体2虚拟3电子卡密
    goods_sort: '',
    goods_by: '',
    pagesize: 20,
    page: 1
}) {

    let list = []
    return new Promise((resolve, reject) => {
        let status = 0;
        this.Request('goodsList', search).then(res => {
            if (search.status == 1) {
                status=0;
            } else if (search.status == 3) {
                status=1;
            } else if (search.status == -2) {
                status=2;
            } else if (search.status == -1) {
                status=3;
            }
            list = res.list.map(item => {
                return {
                    img: item.thumb,
                    goodName: item.title,
                    color: item.sub_title,
                    size: '',
                    num: item.stock, //库存
                    price: item.min_price, //价格
                    saled: item.sales_count, //销量
                    status: status, //0出售中,1已售罄,2仓库中,3回收站
                    goodId: item.id,
                    has_option: item.has_option, //是否单规格

                }
            })
            this.totalPage = Math.max(Math.ceil(res.count / 20), 1);
            resolve(list)
        })
    });
}