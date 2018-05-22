const print = (stars, headers) =>{
  console.log('*'.repeat(stars));
  console.log(headers);
  console.log('*'.repeat(stars)); 
}

if(require.main==module){
  //running as a script
  print(process.argv[2], process.argv[3]);
}else{
  module.exports = print;
}