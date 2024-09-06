export function checkStatus(status:number,msg:string):void{
    const $message=window['$message'];
    switch(status){
        case 400:
            $message.error(msg);
            break;
        case 500:
            $message.error('服務器錯誤，請聯繫管理員!');
            break;
        default:
            $message.error(msg);
            break;
    }
}