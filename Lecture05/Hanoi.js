var redbox = document.getElementById("redbox");
var greenbox = document.getElementById("greenbox");
var bluebox = document.getElementById("bluebox");
var colorbox = document.getElementById('colorbox');
let num1 = 0;
let num2 =0;

var arr1 = [];
var arr2 = [];


function onit(){
    colorbox.innerHTML ="🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥<br>🟨🟨🟨🟨🟨🟨🟨🟨🟨<br>🟩🟩🟩🟩🟩🟩🟩<br>🟦🟦🟦🟦🟦<br>🟪🟪🟪<br>⬛️<br>";
}

arr1.push("🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥");
arr1.push("🟨🟨🟨🟨🟨🟨🟨🟨🟨");
arr1.push("🟩🟩🟩🟩🟩🟩🟩");
arr1.push("🟦🟦🟦🟦🟦");
arr1.push("🟪🟪🟪");
arr1.push("⬛️");

function click1(){
    num1 = 1;
    console.log('1선택');
};
function click2(){
    num2 = 1;
    console.log("2선택");
};
redbox.addEventListener('click',function(){
    num1= 1;
});
if(num1 ==1&&num2==1){
    console.log("greenbox->redbox");
}





// function onit2(){
//     var box2 = document.getElementsByClassName('box2')[0];
//     box2.innerHTML = "<br>";
//     arr2.push(arr1.pop());
//     box2.innerHTML = arr2;
// }
// function onit3(){
//     var box3 = document.getElementsByClassName('box3')[0];
//     arr3.push(arr1.pop());
//     box3.innerHTML = arr3;
// }

    //var arr = [];

    //arr.push("🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥");
    //arr.push("표승현");
    //arr.push("최민주");
    //arr.push("전가은");
    //arr.push("이현진");
    //arr.push("최연우");

    //arr.shift();
    //console.log(arr.pop()); 끝
    //console.log(arr.shift());처음