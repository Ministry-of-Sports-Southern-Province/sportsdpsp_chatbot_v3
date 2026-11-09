/*const star = (num) => {
    let result = "";

    for (let i = 1; i <= num; i++) {
        result += "*";
        console.log(result);
    }
};

star(3);*/
const Rstar= (num)=>{
    for(let i=1;i<=num;i++){
        let str = "";
        for(let j=1;j<=i;j++){
            str+="*";
        }
        console.log(str);
    }
};
Rstar(3);