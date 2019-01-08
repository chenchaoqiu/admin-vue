import { dispose } from '@/api/processor/apiProcessor'

const api = {
  categoryList(e) {
    return dispose.connector({
      url: '/api/pcadmin/category/getList',
      method: 'POST',
      params: e
    })
  },
  salePackageList(e) {
    /* 商品列表*/
    return dispose.connector({
      url: '/api/pcadmin/salePackage/list',
      method: 'POST',
      params: e
    })
  }
}

export default api;
