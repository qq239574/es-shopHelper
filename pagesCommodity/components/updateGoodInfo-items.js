export function activeGood(data, state) { // 处于活动状态的商品，无法修改规格，此处按钮样式不变，子页面移除所有操作按钮，变为只读状态
    function searchInput(obj) {
        if (typeof obj == 'object') {
            for (let k in obj) {
                if (obj[k].editable) {
                    obj[k].disabled = true;
                }  else {
                    searchInput(obj[k])
                }
            }
        }

    }
    if (state) {
        searchInput(data)
    }
    
    return data
}