const fun =(arr)=>{
    let sum=0;
    let min= arr[0];
    let max= arr[0];
    for(let i of arr ){
        sum+=i;
        if(i>max){
            max=i;
        }
         if(i<min){
            min=i;
        }
    }
    let avg = sum/arr.length;
    return {sum,min,max,avg};
         
    
           
};
console.log(fun([0,4,6,1,8]));
//sum,max,min,avg

