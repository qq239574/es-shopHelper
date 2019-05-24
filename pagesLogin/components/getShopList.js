 export default function (list) {
     return list.map(item => {
         return {
             title: item.name,
             left: item.days >= 0 ? (item.days + '天后到期') : '已过期',
             expireDay: item.days,
             status: item.status,
             is_checked: item.is_checked,
             statusText: item.status_text,
             img: item.logo || 'https://ceshiuser.100cms.com/static/dist/account/image/shoplogo.png',
             shopInfo: item
         }
     })
 }