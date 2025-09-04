value=[[0,0,0],[0,0,0],[0,0,0]]
turn=-1;
count=0;
start=0
let flag=0;
function cross_circle(row,column){
    if(flag==0){
    const d=document.getElementsByClassName("lines")[row*3+column];
    if(value[row][column]!=0){
        return;
    }
    count++;
    if(turn==1){
        d.innerHTML="⭕";
        value[row][column]=1;
        turn=-1;
    }else{
        d.innerHTML="❌";
        value[row][column]=-1;
        turn=1;
    }
    if(turn==1){
        document.getElementsByClassName("turn")[0].innerHTML="⭕ Player Turn";
    }else{
        document.getElementsByClassName("turn")[0].innerHTML="❌ Player Turn";
    }
    checkwin()
    if(count==9){
        document.getElementsByClassName("turn")[0].innerHTML="Match Draw";
        flag=1;
    }
    }
}
function checkwin(){
    const d=document.getElementsByClassName("winline");
    const c=document.getElementsByClassName("winnerdis")[0];
    let f=0;
    if((value[0][0]==value[1][0]&&value[1][0]==value[2][0])&&value[0][0]!=0){
        d[0].style.display="block";
        f=value[0][0];
    }else if((value[0][1]==value[1][1]&&value[1][1]==value[2][1])&&value[0][1]!=0){
        d[1].style.display="block";
        f=value[0][1];
    }else if((value[0][2]==value[1][2]&&value[1][2]==value[2][2])&&value[2][2]!=0){
        d[2].style.display="block";
        f=value[0][2];
    }else if((value[0][0]==value[0][1]&value[0][1]==value[0][2])&&value[0][2]!=0){
        d[3].style.display="block";
        f=value[0][0];
    }else if((value[1][0]==value[1][1]&&value[1][1]==value[1][2])&&value[1][1]!=0){
        d[4].style.display="block";
        f=value[1][0];
    }else if((value[2][0]==value[2][1]&&value[2][1]==value[2][2])&&value[2][1]!=0){
        d[5].style.display="block";
        f=value[2][0];
    }else if((value[0][2]==value[1][1]&&value[1][1]==value[2][0])&&value[1][1]!=0){
        d[7].style.display="block";
        f=value[0][2];
    }else if((value[0][0]==value[1][1]&&value[1][1]==value[2][2])&&value[0][0]!=0){
        d[6].style.display="block";
        f=value[0][0];
    }
    if(f==1){
        flag=1;
        document.getElementsByClassName("turn")[0].innerHTML="";
        c.innerHTML="⭕ - Winner, Congrats!";
    }else if(f==-1){
        document.getElementsByClassName("turn")[0].innerHTML="";
        flag=1;
        c.innerHTML="❌ - Winner, Congrats!";
    }
}
function startgame(t){
    turn=t;
    start=t;
    if(turn==1){
        document.getElementsByClassName("turn")[0].innerHTML="⭕ Player Turn";
    }else{
        document.getElementsByClassName("turn")[0].innerHTML="❌ Player Turn";
    }
    document.getElementsByClassName("mainmenu")[0].style.display="none";

}
function reset(){
    startgame(start);
    const d=document.getElementsByClassName("lines");
    for(let i=0;i<9;i++){
        d[i].innerHTML="";
    }
    const c=document.getElementsByClassName("winline")
    for(let i=0;i<8;i++){
        c[i].style.display="none";
    }
    value=[[0,0,0],[0,0,0],[0,0,0]]
    count=0;
    flag=0;
    document.getElementsByClassName("winnerdis")[0].innerHTML="";
}