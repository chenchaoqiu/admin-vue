/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

/*
* 金额
* 小数点只能输入9位数，点后面2位
* */
export function validateMoney(money) {
  const reg = /^(\d{0,5}.\d{0,3})(\.\d{1,2})?$/;
  return reg.test(money)
}

/*
 * 比例 100
 * */
export function validateRatio(ratio) {
  /*var le=/^(\d{0,3}.\d{0,3})(\.\d{1,2})?$/*/
  const reg = /^((\d|[1-9]\d|100)|.)(\.\d{1,2})?$/;
  return reg.test(ratio)
}
export function validateRatioContinuous(e) {
  let inl=e;
  if(e!=''){
    inl=String(e).indexOf('.');
    if(String(e*1).indexOf('.')==inl){
      inl=e*1;
    }else{
      inl=e
    }
  }
  inl*1>100?inl='100.00':inl
  return inl;
}
