const mapOder=(array,order,key)=>{
    order=new Array()
    array.sort((a,b)=>order.indexOf(a[key])-order.indexOf(b[key]));
    return array
  }

export {mapOder}