const toString=Object.prototype.toString;

/**
 * @param val 
 * @param type 
 * @returns 
 * @description: 判斷值是否為某個類型
 */
export function is(val:unknown,type:string){
    return toString.call(val)===`[object ${type}]`;
}

/**
 * 
 * @param val 
 * @returns 
 * 
 */
export function isFunction<T = Function> (val:unknown):val is T {
    return is(val,'Function') || is(val,'AsyncFunction');
}