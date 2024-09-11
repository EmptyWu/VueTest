const DEFAULT_CACHE_TIME = 1000 * 60 * 60 * 24 * 7; // 7 days

export class Storage {
  private storage: globalThis.Storage;
  private prefixKey ?: string;  

  constructor(prefixKey='',storage = localStorage) {
    this.storage = storage;
    this.prefixKey = prefixKey;
  }

  private getKey(key: string) {
    return `${this.prefixKey}${key}`.toUpperCase();
  }

  set(key: string, value: any, expire:number|null = DEFAULT_CACHE_TIME) {
      const data=JSON.stringify({
        value,
        expire: expire !== null ? Date.now() + expire : null, 
      });
      this.storage.setItem(this.getKey(key), data);
  }

  get(key: string,def: any = null) {
      const item = this.storage.getItem(this.getKey(key));
    if (item) {
        try{
          const { value, expire } = JSON.parse(item);
            //判斷是否過期
            if (expire=== null || Date.now() <= expire) {
              return value;
            }
            //過期刪除
            this.remove(key);
        }
        catch(e){
            return def;
        }
    }
    return def;
    }

  remove(key: string) {
    this.storage.removeItem(this.getKey(key));
  }

  clear():void {
      this.storage.clear();
  }

  setCookie(name: string, value: any, expire:number|null = DEFAULT_CACHE_TIME) {
    document.cookie = `${this.getKey(name)}=${value}; expires=${new Date(Date.now() + (expire ||0)).toUTCString()}; path=/`;
  }

  getCookie(name: string, def: any = null) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key.trim() === this.getKey(name)) {
        return value;
      }
    }
    return def;
  }

  removeCookie(name: string) {
    document.cookie = `${this.getKey(name)}=; expires=${new Date(0).toUTCString()}; path=/`;
  }

  clearCookie():void {
    document.cookie.split(';').forEach(cookie => {
      const [key] = cookie.split('=');
      document.cookie = `${key}=; expires=${new Date(0).toUTCString()}; path=/`;
    });
  }
  
}

export const storage=new Storage('');