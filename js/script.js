let num = 266219,res = 1;
num = num.toString().split('');

 for (let i=0; i< num.length; i++) {

    res*=num[i];
 }
 console.log(res);
 res = (res**3).toString();
 console.log(res.substring(0,2));

