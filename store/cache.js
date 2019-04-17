const namespace = 'ESSHOP BUSINESS WXMINIPROGRAM--'
export function setData(key, val) {
    try {
        uni.setStorageSync(namespace + key, val);
    } catch (e) {
        console.error('setData error >>', e, ' key:', key, 'value:', val, e)
    }

}
export function getData(key) {
    try {
        return uni.getStorageSync(namespace + key);
    } catch (e) {
        console.error('getData error >>', e, ' key:', key)
    }

}
export function clearData(key) {
    try {
        return uni.clearStorage(namespace + key);
    } catch (e) {
        console.error('clearData error >>', e, ' key:', key)
    }

}
export function clearAll() {
    try {
        uni.clearStorageSync();
    } catch (e) {
        console.error('clearAll error >>', e)
    }
}