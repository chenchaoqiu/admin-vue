import request from '@/utils/request'
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
import { scriptes } from '@/utils/index'

const dispose = {
  pageSize: 20,
  url: scriptes(),
  connector(e) {
    let resolve, reject;
    e.params = this.querys(e.params);
    const promist = new Promise(function(res, req) {
      resolve = res;
      reject = req;
    });
    request(e).then(res => {
      resolve(res.data);
    });
    return promist;
  },
  querys(e) {
    if (!e) {
      e = {};
    }
    if (!e.tokens) {
      e.token = JSON.parse(getToken()).token;
      e.pageSize = this.pageSize;
    }
    delete e.tokens;
    return e;
  }
};

export {
  dispose,
  scriptes,
  request,
  getToken,
  MessageBox
};
