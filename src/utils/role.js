import { scriptes } from '@/utils/index'
import { getToken } from '@/utils/auth' // getToken from cookie

const __bots = (scriptes() !== 'http://t.api.gch.ivymei.com');

export const role = __bots ? [[2, 3, 6], [2, 3], [2, 6], [2]] : [[2, 3, 6], [2, 3, 6], [2, 3, 6], [2, 3, 6]]/* [【测试与正式】，【开发】]*/

export function roles(e) {
  /* 根据权限判断是否展现侧边栏,role:[1,2,3] roles([1,2,3])*/
  const tokens = getToken();
  if (tokens) {
    return e.indexOf(JSON.parse(tokens).roleType) === -1
  }
}
