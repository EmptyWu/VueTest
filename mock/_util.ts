import Mock from 'mockjs';

export function resultSuccess (result,{message='ok'}={}){
    return Mock.mock({
        code:200,
        result,
        message,
        type:'success',
    });
}

export function resultPageSuccess<T=any>(
    page:number,
    pageSize:number,
    list:T[],
    {message='ok'}={}
){
    const pageData=pagination(page,pageSize,list);

    return {
        ...resultSuccess({
            page,pageSize,pageCount:list.length,list:pageData
        }),message,
    };
}

export function pagination<T=any>(
    pageNo:number,
    pageSize:number,
    array:T[]
):T[]{
    const offset =(pageNo-1) * Number(pageSize);
    const ret=
        offset + Number(pageSize)>=array.length
        ?array.slice(offset,array.length)
        :array.slice(offset,offset+Number(pageSize));
    return ret;
}