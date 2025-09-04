    let rank=0;
    let snakes=[[12,6],[36,18],[79,42],[85,45],[90,48],[98,3]]
    let ladders=[[4,26],[8,50],[27,53],[21,59],[43,78],[52,68],[65,87],[70,91],[84,96]]
    let home=[1,1,1,1]
    let topos=[0,0,0,0]
    let outpos=[505,515,525,535]
    let positions=[7,52,97,142,187,232,277,322,367,412]
    let topspace=56
    let currentid=[-1,-1,-1,-1]
    let player=4;
    let chance=0;
    let roll1=0;
    let f=[1,1,1,1];
    let player_pos=[-1,-1,-1,-1]
    let r=[-1,-1,-1,-1]
    let clk,clk2;
    function display_winnerpage(){
        let text="";
        for(let i=0;i<player;i++){
            if(r[i]==0){
                text=text+'<span style="text-shadow: 0px 0px 10px rgb(243, 6, 6), 10px 0px 20px rgb(214, 12, 12),10px 0px 40px rgb(224, 16, 16); color: rgb(210, 5, 5);">'+(i+1)+'. Red Player</span><br><br>';
            }else if(r[i]==1){
                text=text+'<span style="text-shadow: 10px 0px 10px rgb(6, 18, 243), 10px 0px 20px rgb(12, 36, 214),10px 0px 40px rgb(19, 16, 224); color: rgb(72, 78, 252);">'+(i+1)+'. Blue Player</span><br><br>';
            }else if(r[i]==2){
                text=text+'<span style="text-shadow: 0px 0px 10px rgb(239, 243, 6), 10px 0px 20px rgb(197, 214, 12),10px 0px 40px rgb(224, 179, 16);color: rgba(156, 156, 6, 0.805);">'+(i+1)+'. Yellow Player</span><br><br>';
            }else if(r[i]==3){
                text=text+'<span style="text-shadow: 10px 0px 10px rgb(6, 243, 22), 10px 0px 20px rgb(12, 214, 39),10px 0px 40px rgb(16, 224, 16);color: rgba(6, 156, 38, 0.805);">'+v+'. Green Player</span><br><br>';
            }
            console.log(r[i]);
        }
        const d=document.getElementsByClassName('ranking')[0];
        d.innerHTML=d.innerHTML+"<br>"+text;
        const c=document.getElementsByClassName("winner_display")[0];
        c.style.display="flex";
    }
    function roll(){
        if(roll1==1)
        return;
        roll1=1;
        const d=document.getElementsByClassName('dice')[0];
        let dice_val=Math.ceil(Math.random()*6);
        d.style.background="white";
        switch(dice_val){
            case 1:
                d.innerHTML="<div class='dot'></div>";
                break;
            case 2:
                d.innerHTML="<div class='dot'></div><div class='dot' style='margin-top:5px;'></div>";
                break;
            case 3:
                d.innerHTML="<div class='dot'></div><div class='dot' style='margin-top:3px;'></div><div class='dot' style='margin-top:3px;'></div>";
                break;
            case 4:
                d.innerHTML='<div class="dot" style="margin:2px 0 0 0"></div><div class="dot" style="margin-top: -8px;margin-left: 20px;"></div><div class="dot" style="margin-top: 10px;margin-left: 0;" ></div><div class="dot" style="margin-top: -8px;margin-left: 20px;"></div>';
                break;
            case 5:
                d.innerHTML="<div class='dot' style='margin:2px 0 0 0'></div><div class='dot' style='margin-top: -8px;margin-left: 20px;'></div><div class='dot' style='margin-top:3px;margin-left: 10pxpx;'></div><div class='dot' style='margin-top: 3px;margin-left: 0;'' ></div><div class='dot' style='margin-top: -8px;margin-left: 20px;'></div>";
                break;
            case 6:
                d.innerHTML="<div class='dot' style='margin:2px 0 0 0'></div><div class='dot' style='margin-top: -8px;margin-left: 20px;'></div><div class='dot' style='margin-top:3px;margin-left: 0px;'></div><div class='dot' style='margin-top:-8px;margin-left: 20px;''></div><div class='dot' style='margin-top: 3px;margin-left: 0;'' ></div><div class='dot' style='margin-top: -8px;margin-left: 20px;'></div>";
                break;
        }
        if(dice_val==1 || player_pos[chance]!=-1){
            move_player(dice_val,chance);
        }else{
            let t=(chance+1)%player
        for(;player_pos[t]>=99;t=(t+1)%player){
            chance=t;
        }
        change_player()
        }
    }
function change_player(){
    setTimeout(function(){
        const m=document.getElementsByClassName('chance')[0];
            chance=(chance+1)%player;
            roll1=0;
            if(player_pos[chance]>=99){
                change_player();
                return;
            }
            if(chance==0){
                m.innerHTML="1st Player Chance (red)";
                m.style.textShadow="10px 0px 10px rgb(243, 6, 6), 10px 0px 20px rgb(214, 12, 12),10px 0px 40px rgb(224, 16, 16)";
            }else if(chance==1){
                m.innerHTML="2nd Player Chance (blue)";
                m.style.textShadow="10px 0px 10px rgb(6, 18, 243), 10px 0px 20px rgb(12, 36, 214),10px 0px 40px rgb(19, 16, 224)";
            }else if(chance==2){
                m.innerHTML="3rd Player Chance (yellow)";
                m.style.textShadow="0px 0px 10px rgb(239, 243, 6), 10px 0px 20px rgb(197, 214, 12),10px 0px 40px rgb(224, 179, 16)";
            }else{
                m.innerHTML="4th Player Chance (green)";
                m.style.textShadow="10px 0px 10px rgb(6, 243, 22), 10px 0px 20px rgb(12, 214, 39),10px 0px 40px rgb(16, 224, 16)";
            }
    },800);
}
function check_snake(chance){
    for(let i=0;i<6;i++){
        if(player_pos[chance]==snakes[i][0]){
            return snakes[i][1];
        }
    }
    return 0;
}
function check_ladder(chance){
    for(let i=0;i<9;i++){
        if(player_pos[chance]==ladders[i][0]){
            return ladders[i][1];
        }
    }
    return 0;
}
async function move_player(value, chance){
    const ply=document.getElementsByClassName('player')[chance];
    if(home[chance]==1){
        topos[chance]=outpos[chance];
        home[chance]=0;
        player_pos[chance]=0;
        currentid[chance]=0;
        ply.style.top=outpos[chance]+"px";
        ply.style.left=positions[0]+"px";
        roll1=0;
        return;
    }
    if((player_pos[chance]+value)>99){
        let t=(chance+1)%player
        for(;player_pos[t]>=99;t=(t+1)%player){
            chance=t;
        }
        change_player()
        return;
    }
    let st,end;
    let t_value=value;
    let re=value;
    let d=Math.floor(player_pos[chance]/10);
    let flag=0
    if(d!=Math.floor((player_pos[chance]+value)/10)){
        console.log(d);
        flag=1;
        st=positions[currentid[chance]];
        if(f[chance]==1){
            currentid[chance]=10;
            f[chance]=0;
            end=positions[9]
        }else{
            currentid[chance]=-1;
            f[chance]=1;
            end=positions[0]
        }
        re=(player_pos[chance]+1)+value-(d+1)*10;
    }
    if(value!=re){
        move(st,end,ply);
        await resolved(1000);
    }
    if(flag==1){
        move_top(topos[chance],(topos[chance]-topspace),ply)
        await resolved(1000);
        topos[chance]-=topspace;
        ply.style.top=topos[chance]+"px";
    }
    player_pos[chance]+=value;
    value=re;
    if(f[chance]==1){
        if(currentid[chance]==-1)
        st=positions[0];
        else
        st=positions[currentid[chance]];
        currentid[chance]+=value
    }else{
        if(currentid[chance]==10)
        st=positions[9];
        else
        st=positions[currentid[chance]];
        currentid[chance]-=value
    }
    end=positions[currentid[chance]];
    move(st,end,ply);
    await resolved(1000);
    ply.style.left=positions[currentid[chance]]+"px";
    if(player_pos[chance]==99){
        dislay_winner(chance);
    }
    let p;
    if((p=check_snake(chance))!=0){
        if(Math.floor(p/10)%2==0){
            f[chance]=1;
            let temp=currentid[chance];
            currentid[chance]=(p-(p-p%10));
            let t=Math.floor(player_pos[chance]/10)-Math.floor(p/10);
            let tt=topos[chance]
            topos[chance]=topos[chance]+(t*topspace);
            move(positions[temp],positions[currentid[chance]],ply);
            move_top(tt,topos[chance],ply);
            await resolved(1000);
            ply.style.left=positions[currentid[chance]]+"px";
            ply.style.top=topos[chance]+"px";
            player_pos[chance]=p;
        }else{
            f[chance]=0;
            let temp=currentid[chance];
            currentid[chance]=9-(p-(p-p%10));
            let t=Math.floor(player_pos[chance]/10)-Math.floor(p/10);
            let tt=topos[chance]
            topos[chance]=topos[chance]+(t*topspace);
            move(positions[temp],positions[currentid[chance]],ply);
            move_top(tt,topos[chance],ply);
            await resolved(1000);
            ply.style.left=positions[currentid[chance]]+"px";
            ply.style.top=topos[chance]+"px";
            player_pos[chance]=p;
        }
    }else if((p=check_ladder(chance))!=0){
        if(Math.floor(p/10)%2==0){
            f[chance]=1;
            let temp=currentid[chance];
            currentid[chance]=(p-(p-p%10));
            let t=Math.floor(p/10)-Math.floor(player_pos[chance]/10);
            let tt=topos[chance]
            topos[chance]=topos[chance]-(t*topspace);
            move(positions[temp],positions[currentid[chance]],ply);
            move_top(tt,topos[chance],ply);
            await resolved(1500);
            ply.style.left=positions[currentid[chance]]+"px";
            ply.style.top=topos[chance]+"px";
            player_pos[chance]=p;
        }else{
            f[chance]=0;
            let temp=currentid[chance];
            currentid[chance]=9-(p-(p-p%10));
            let t=Math.floor(p/10)-Math.floor(player_pos[chance]/10);
            let tt=topos[chance]
            topos[chance]=topos[chance]-(t*topspace);
            move(positions[temp],positions[currentid[chance]],ply);
            move_top(tt,topos[chance],ply);
            await resolved(1000);
            ply.style.left=positions[currentid[chance]]+"px";
            ply.style.top=topos[chance]+"px";
            player_pos[chance]=p;
        }
    }
    if(t_value!=1){
        let t=(chance+1)%player
        for(;player_pos[t]>=99;t=(t+1)%player){
            chance=t;
        }
        change_player()
    }else{
        roll1=0;
    }
}
function dislay_winner(chance){
    let d=document.getElementsByClassName("winners")[0];
    if(chance==0){
        text='<span style="text-shadow: 0px 0px 10px rgb(243, 6, 6), 10px 0px 20px rgb(214, 12, 12),10px 0px 40px rgb(224, 16, 16); color: rgb(210, 5, 5);">'+(rank+1)+'. Red Player</span>';
    }else if(chance==1){
        text='<span style="text-shadow: 10px 0px 10px rgb(6, 18, 243), 10px 0px 20px rgb(12, 36, 214),10px 0px 40px rgb(19, 16, 224); color: rgb(72, 78, 252);">'+(rank+1)+'. Blue Player</span>';
    }else if(chance==2){
        text='<span style="text-shadow: 0px 0px 10px rgb(239, 243, 6), 10px 0px 20px rgb(197, 214, 12),10px 0px 40px rgb(224, 179, 16);color: rgba(156, 156, 6, 0.805);">'+(rank+1)+'. Yellow Player</span>';
    }else{
        text='<span style="text-shadow: 10px 0px 10px rgb(6, 243, 22), 10px 0px 20px rgb(12, 214, 39),10px 0px 40px rgb(16, 224, 16);color: rgba(6, 156, 38, 0.805);">'+(rank+1)+'. Green Player</span>';
    }
    r[rank]=chance;
    rank++;
    d.innerHTML=d.innerHTML+text;
    if(rank==(player-1)){
        for(let i=0;i<player;i++){
            if(player_pos[i]<99){
                r[rank]=i;
                break;
            }
        }
        display_winnerpage();
    }
}
function displayboard(){
    resetgame();
    const d=document.getElementsByClassName("menu")[0];
    const rad=document.querySelectorAll("input[type='radio'][ name='player']");
    for(let i=0;i<rad.length;i++){
        if(rad[i].checked){
            readyboard(i+2);
        }
    }
    d.style.display="none";
}
function readyboard(p){
    player=p;
}
function resetgame(){
    rank=0;
    player=4;
    home=[1,1,1,1]
    topos=[0,0,0,0]
    currentid=[-1,-1,-1,-1]
    chance=0;
    roll1=0;
    f=[1,1,1,1];
    player_pos=[-1,-1,-1,-1]
    const d=document.getElementsByClassName('player');
    d[0].style.top="575px"
    d[0].style.left= "10px"
    d[1].style.top="575px"
    d[1].style.left= "55px"
    d[2].style.top="605px"
    d[2].style.left= "10px"
    d[3].style.top="605px"
    d[3].style.left= "55px"
    const m=document.getElementsByClassName('chance')[0];
    m.innerHTML="1st Player Chance (red)";
    m.style.textShadow="10px 0px 10px rgb(243, 6, 6), 10px 0px 20px rgb(214, 12, 12),10px 0px 40px rgb(224, 16, 16)";
}
function startagain(){
    const d=document.getElementsByClassName("menu")[0];
    d.style.display="none";
}
function mainmenu(e){
    const d=document.getElementsByClassName("menu")[0];
    d.style.display="flex";
    if(e==0){
    const c=document.getElementsByClassName("resume")[0];
    c.style.display="block"
    }else{
        const c=document.getElementsByClassName("winner_display")[0];
        c.style.display="none";
    }
}

function move(st,end,c){
    let dis=st-end;
    let chunk=Math.abs(dis)/100;
    let al=st;
    let f=-1;
    let count=0
    if(dis>0){
        f=1
    }    
    clk=setInterval(function(){
        if(count==100){
            clearInterval(clk);
            return;
        }
        c.style.left=(al)+"px";
        al=al+(f*(-chunk));
        count+=1;
        },1
    )
}

function move_top(st,end,c){
    let dis=st-end;
    let chunk=Math.abs(dis)/100;
    let al=st;
    let f=-1;
    let count=0
    if(dis>0){
        f=1
    }    
    clk2=setInterval(function(){
        if(count==100){
            clearInterval(clk2);
            return;
        }
        c.style.top=(al)+"px";
        al=al+(f*(-chunk));
        count+=1;
        },1
    )
}

function resolved(s){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve();
        },s);
    });
}