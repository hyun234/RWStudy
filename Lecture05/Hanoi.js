var redbox = document.getElementById("redbox");
var greenbox = document.getElementById("greenbox");
var bluebox = document.getElementById("bluebox");

var first_p = document.getElementsByClassName("first_p");
var second_p = document.getElementsByClassName("second_p");
var third_p = document.getElementsByClassName("third_p");

var click_index = 0;

var arr1 = [];
var arr2 = [];
var arr3 = [];

function onit(){
    arr1.length =0;
    arr2.length =0;
    arr3.length =0;

    arr1 =[];
    arr2 =[];
    arr3 =[];

    for(var i=0;i <6; i++){
        first_p[i].innerHTML ="";
        second_p[i].innerHTML ="";
        third_p[i].innerHTML ="";
    }

    arr1.push(first_p[0].innerHTML = "🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥")
    arr1.push(first_p[1].innerHTML = "🟨🟨🟨🟨🟨🟨🟨🟨🟨")
    arr1.push(first_p[2].innerHTML = "🟩🟩🟩🟩🟩🟩🟩")
    arr1.push(first_p[3].innerHTML = "🟦🟦🟦🟦🟦")
    arr1.push(first_p[4].innerHTML = "🟪🟪🟪")
    arr1.push(first_p[5].innerHTML = "⬛️")

}

///click_index = 1; -> click1
///click_index = 2; -> click2
///click_index = 3; -> click3


function click1(){ 
    if(click_index == 2){
        console.log("2번 선택후 1번 선택함");
        draw(second_p,first_p,arr2,arr1)
        click_index = 0;
    }
    else if(click_index == 3){
        console.log("3번 선택후 1번 선택함");
        draw(third_p,first_p,arr3,arr1)
        click_index = 0;
    }
    else{click_index = 1;}
};
function click2(){
    if(click_index == 1){
        console.log("1번 선택후 2번 선택함");
        draw(first_p,second_p,arr1,arr2);
        click_index = 0;
    }
    else if(click_index == 3){
        console.log("3번 선택후 2번 선택함")
        draw(third_p,second_p,arr3,arr2);
        click_index = 0;
    }
    else{click_index = 2;}
    
};
function click3(){
    if(click_index == 1){
        console.log("1번 선택후 3번 선택함");
        draw(first_p,third_p,arr1,arr3);
        click_index = 0;
    }
    else if(click_index == 2){
        console.log("2번 선택후 3번 선택함");
        draw(second_p,third_p,arr2,arr3);
        click_index = 0;
    }
    else{click_index = 3;}    
}

function draw(getstr_p,setstr_p,garray,sarray){
    if(typeof garray !== 'undefined' && garray.length >0){
        if(sarray.length ==0 || sarray[sarray.length-1].length > garray[garray.length-1].length){
            var img = garray.pop();
            sarray.push(img);
            if(setstr_p[0].firstChild == null) {
                setstr_p[0].innerHTML = img;        
                getstr_p[garray.length].innerHTML ="";
            }
            else if(setstr_p[1].firstChild == null) {
                setstr_p[1].innerHTML = img;
                getstr_p[garray.length].innerHTML ="";
            } 
            else if(setstr_p[2].firstChild == null) {
                setstr_p[2].innerHTML = img; 
                getstr_p[garray.length].innerHTML ="";
            }
            else if(setstr_p[3].firstChild == null) {
                setstr_p[3].innerHTML = img; 
                getstr_p[garray.length].innerHTML ="";
            }
            else if(setstr_p[4].firstChild == null) {
                setstr_p[4].innerHTML = img; 
                getstr_p[garray.length].innerHTML ="";
            }
            else if(setstr_p[5].firstChild == null) {
                setstr_p[5].innerHTML = img; 
                getstr_p[garray.length].innerHTML ="";
            }
        }else{
            alert("다시 선택해주세요/1");
        }    
    }
    if(arr3[0] == "🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥" && arr3[1] == "🟨🟨🟨🟨🟨🟨🟨🟨🟨" && arr3[2] =="🟩🟩🟩🟩🟩🟩🟩" && arr3[3] == "🟦🟦🟦🟦🟦" && arr3[4] =="🟪🟪🟪"&& arr3[5] =="⬛️"){
        document.write("끝!");
    }
}
