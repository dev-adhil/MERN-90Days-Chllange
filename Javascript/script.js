function x(){

    for(var i = 1; i<=5; i++){
        function close(){
            setTimeout(function (){
        console.log(i)
    },i * 1000)
        }
    }

    console.log("Welcome mern challenge")
}
x()