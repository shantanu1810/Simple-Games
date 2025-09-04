let win_pos=1;
    path=[[347,160],[320.34,160],[293.68,160],[267.02,160],[240.36,160],[213.7,133.34],[213.7,106.68],[213.7,80.02],[213.7,53.36],[213.7,26.7],[213.7,0],[187.04,0],[160.38,0],
          [160.38,26.66],[160.38,53.32],[160.38,80],[160.38,106.66],[160.38,133.34],[133.71,160],[107.05,160],[80.38,160],[53.72,160],[26.78,160],[0,160],[0,186.66],[0,213.33],
          [26.67,213.33],[53.72,213.33],[80.38,213.33],[107.05,213.33],[133.71,213.33],[160.38,240.36],[160.38,267.02],[160.38,293.68],[160.38,320.35],[160.38,347.01],[160.38,373.68],[187.04,373.68],[213.7,373.68],
          [213.7,347.01],[213.7,320.35],[213.7,293.68],[213.7,267.02],[213.7,240.36],[240.36,213.33],[267.02,213.33],[293.68,213.33],[320.34,213.33],[347.01,213.33],[373.68,213.33],[373.68,187.04],[373.68,160]]
    home=[[[334,42],[334,93],[282,42],[282,93]],
          [[334,282],[334,333],[282,282],[282,333]],
          [[41,282],[41,333],[93,282],[93,333]],
          [[93,42],[93,93],[41,42],[41,93]]];

    let current_pos=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    let home_pos=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    let home_won_red=[[347,187.04],[320.34,187.04],[293.68,187.04],[267.02,187.04],[240.36,187.04],[213.7,187.04]]
    let home_won_blue=[[187.04,347.01],[187.04,320.35],[187.04,293.68],[187.04,267.02],[187.04,240.36],[187.04,213.33]]
    let home_won_yellow=[[26.67,186.66],[53.72,186.66],[80.38,186.66],[107.05,186.66],[133.71,186.66],[160.38,186.66]]
    let home_won_green=[[187.04,26.66],[187.04,53.32],[187.04,80],[187.04,106.66],[187.04,133.34],[187.04,160]]
    let player_syn=[0,3,2,1]
    let threshold=[50,37,24,11]
    let chance=0,roll1=0;
    let no_of_players=4;
    let play_chance=[0,1,2,3]
    let player=[1,3,2,0]
    let dice_val=0;
    let pl_home=[4,4,4,4]
    let safe_spot=[0,8,13,21,26,34,39,47]//stars
    let home_reached=[0,0,0,0];
    let clk,clk2;
    function reset(){
        win_pos=1;
        current_pos=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
        home_pos=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
        chance=0;
        roll1=0;
        no_of_players=4;
        dice_val=0;
        pl_home=[4,4,4,4];
        home_reached=[0,0,0,0];
        const d=document.getElementsByClassName("die");
        for(let i=0;i<16;i++){
            let p=Math.floor(i/4);
            //console.log(d[i].style.top+" "+home[p][i%4][0]);
            d[i].style.top=home[p][i%4][0]+"px";
            d[i].style.left=home[p][i%4][1]+"px";
        }
        for(let i=0;i<4;i++){
            const d=document.getElementsByClassName("values");
            if(i==1){
                d[i].innerHTML="<div class='dot'></div>";
            }else{
                d[i].innerHTML="";
            }
        }
        play_chance=[0,1,2,3];
        player=[1,3,2,0];
    }

    function backtomenu(){
        const d=document.getElementsByClassName("player_selection")[0];
        d.style.display="flex";
        const e=document.getElementsByClassName("warning")[0];
        e.style.display="none";
        const c=document.getElementsByClassName("resume")[0];
        c.style.display="block";
    }
    function displayboard(){
        reset();
        const d=document.getElementsByClassName("player_selection")[0];
        const rad=document.querySelectorAll("input[type='radio'][ name='player']");
        for(let i=0;i<rad.length;i++){
            if(rad[i].checked){
                readyboard(i+2);
            }
        }
        d.style.display="none";
    }
    function readyboard(players){
        no_of_players=players;
        if(players==2){
            play_chance=[0,2];
            player=[1,2];
        }
    }

    function roll(ply){
        //window.alert(chance)
        if(play_chance[chance]!=ply || roll1==1)
        return;
        roll1=1;
        const d=document.getElementsByClassName('values')[player[chance]];
        dice_val=Math.ceil(Math.random()*6);
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
        if(pl_home[ply]==4&&dice_val!=6){
            dice_val=0;
            change_playerturn();
        }else{
            let f=0;
            for(let i=(ply*4);i<(ply*4)+4;i++){
                if((home_pos[i]!=-1&&current_pos[i]==-2&&(home_pos[i]+dice_val)>5)||home_pos[i]==5){
                    f+=1;
                }
            }
            if(pl_home[ply]!=0&&dice_val==6){
                return
            }
            if((f+pl_home[ply])>=4){
                console.log(f+pl_home[ply])
                change_playerturn()
            }
        }
        
    }
    function change_playerturn(){
        setTimeout(function(){
                let top_place=document.getElementsByClassName('die');
                for(let i=4*play_chance[chance];i<4*play_chance[chance]+4;i++){
                    top_place[i].style.zIndex='0';
                }
                const d=document.getElementsByClassName('values')[player[chance]];
                chance=(chance+1)%no_of_players;
                let d1=document.getElementsByClassName('values')[player[chance]];
                d1.style.background="white";
                d1.innerHTML=d.innerHTML;
                d.innerHTML="";
                d.style.background="white";
                roll1=0;
                const m=document.getElementsByClassName("player_chance")[0];
                for(let i=4*play_chance[chance];i<4*play_chance[chance]+4;i++){
                    top_place[i].style.zIndex='1000';
                }
                if(play_chance[chance]==0){
                    m.innerHTML="Red Player Turn";
                    m.style.color="red";
                }else if(play_chance[chance]==1){
                    m.innerHTML="Blue Player Turn";
                    m.style.color="blue";
                }else if(play_chance[chance]==2){
                    m.innerHTML="Yellow Player Turn";
                    m.style.color="#b0ad02";
                }else{
                    m.innerHTML="Green Player Turn";
                    m.style.color="green";
                }
                if(home_reached[play_chance[chance]]==4){
                    change_playerturn();
                }
        },800);
    }


    async function play(piece,plyer){
        const d=document.getElementsByClassName('die')[piece+plyer*4];
        t=d.style.top;
        l=d.style.left;
        let syn_plyer=player_syn[plyer]
        //console.log(plyer+" "+play_chance[chance]+" "+syn_plyer);
        if(home[plyer][piece][0]+"px"==t && home[plyer][piece][1]+"px"==l && dice_val==6 && play_chance[chance]==plyer){
            console.log("1st")
            d.style.top=path[13*syn_plyer][0]+"px";
            d.style.left=path[13*syn_plyer][1]+"px";
            current_pos[plyer*4+piece]=13*syn_plyer;
            pl_home[plyer]=pl_home[plyer]-1;
            dice_val=0;
            roll1=0;
        }
        else if(home_pos[plyer*4+piece]!=-1){
            console.log("2nd")
            piece_won(plyer,piece,dice_val,d,dice_val);
            /*if(dice_val!=6){
                change_playerturn();
            }else{
                dice_val=0;
                roll1=0;
            }*/
        }
        else if(current_pos[4*plyer+piece]<=threshold[plyer]&&(current_pos[4*plyer+piece]+dice_val)>threshold[plyer]){
            console.log("3rd")
            let t=dice_val
            dice_val=dice_val-(threshold[plyer]-current_pos[4*plyer+piece]);
            current_pos[4*plyer+piece]=-2;
            home_pos[plyer*4+piece]=0;
            piece_won(plyer,piece,dice_val-1,d,t);
        }
        else if(home[plyer][piece][0]+"px"!=t && home[plyer][piece][1]+"px"!=l && play_chance[chance]==plyer &&dice_val!=0){
            console.log("4th")
            current_pos[4*plyer+piece]=(current_pos[4*plyer+piece]+dice_val)%52;
            d.style.top=path[current_pos[4*plyer+piece]][0]+"px";
            d.style.left=path[current_pos[4*plyer+piece]][1]+"px";
            flag=any_cross(plyer,piece);
            if(dice_val!=6 && flag==0){
                change_playerturn();
            }else{
                dice_val=0;
                roll1=0;
            }
        }
    }

    function any_cross(plyer,piece){
        let count=0;
        let p=-1;
        let i;
        for(i=0;i<8;i++){
            if(safe_spot[i]==current_pos[4*plyer+piece]){
                return 0;
            }
        }
        for(i=0;i<16;i++){
            if(i>=(plyer*4)&&i<(plyer*4+4))
                continue;
            else{
                if(current_pos[4*plyer+piece]==current_pos[i]){
                    count++;
                    p=i;
                }
            }
        }
        if(count!=1){
            return 0;
        }else{
            home_back(Math.floor(p/4),p%4,p);
            return 1;
        }
    }

    function home_back(plyer,piece,i){
        const c=document.getElementsByClassName('die')[i];
        plyer=Math.floor(plyer);
        pl_home[plyer]=pl_home[plyer]+1;
        c.style.top=home[plyer][piece][0]+"px";
        c.style.left=home[plyer][piece][1]+"px";
    }

    function piece_won(plyer,piece,dice_val,d,t){
        syn_plyer=player_syn[plyer]
        if(plyer==0 && dice_val+home_pos[plyer*4+piece]<=5){
            home_pos[plyer*4+piece]=dice_val+home_pos[plyer*4+piece];
            d.style.top=home_won_red[home_pos[plyer*4+piece]][0]+"px";
            d.style.left=home_won_red[home_pos[plyer*4+piece]][1]+"px";
            if(home_pos[plyer*4+piece]==5 || t==6){
                home_reached[plyer]+=1;
                winneradd(plyer);
                dice_val=0;
                roll1=0;
            }else{
                change_playerturn();
                dice_val=0;
            }
        }
        else if(plyer==1 && dice_val+home_pos[plyer*4+piece]<=5){
            home_pos[plyer*4+piece]=dice_val+home_pos[plyer*4+piece];
            d.style.top=home_won_blue[home_pos[plyer*4+piece]][0]+"px";
            d.style.left=home_won_blue[home_pos[plyer*4+piece]][1]+"px";
            if(home_pos[plyer*4+piece]==5 || t==6){
                home_reached[plyer]+=1;
                winneradd(plyer);
                dice_val=0;
                roll1=0;
            }else{
                change_playerturn();
                dice_val=0;
            }
        }
        else if(plyer==2 && dice_val+home_pos[plyer*4+piece]<=5){
            home_pos[plyer*4+piece]=dice_val+home_pos[plyer*4+piece];
            d.style.top=home_won_yellow[home_pos[plyer*4+piece]][0]+"px";
            d.style.left=home_won_yellow[home_pos[plyer*4+piece]][1]+"px";
            if(home_pos[plyer*4+piece]==5 || t==6){
                home_reached[plyer]+=1;
                winneradd(plyer);
                dice_val=0;
                roll1=0;
            }else{
                change_playerturn();
                dice_val=0;
            }
        }
        else if(plyer==3 && dice_val+home_pos[plyer*4+piece]<=5){
            home_pos[plyer*4+piece]=dice_val+home_pos[plyer*4+piece];
            d.style.top=home_won_green[home_pos[plyer*4+piece]][0]+"px";
            d.style.left=home_won_green[home_pos[plyer*4+piece]][1]+"px";
            if(home_pos[plyer*4+piece]==5 || t==6){
                home_reached[plyer]+=1;
                winneradd(plyer);
                dice_val=0;
                roll1=0;
            }else{
                change_playerturn();
                dice_val=0;
            }
        }
        dice_val=0;
    }
    function winneradd(plyer){
        const d=document.getElementsByClassName("winnerlist")[0];
        if(home_reached[plyer]==4){
            if(plyer==0){
                d.innerHTML=d.innerHTML+"<br><span style='color:red;'>"+win_pos+". Red Player</span>";
            }else if(plyer==1){
                d.innerHTML=d.innerHTML+"<br><span style='color:blue;'>"+win_pos+". Blue Player</span>";
            }else if(plyer==2){
                d.innerHTML=d.innerHTML+"<br><span style='color:yellow;'>"+win_pos+". Yellow Player</span>";
            }else{
                d.innerHTML=d.innerHTML+"<br><span style='color:green;'>"+win_pos+". Green Player</span>";
            }
            win_pos++;
            if(win_pos==no_of_players){
                display_winner();
            }
        }
    }
    function startagain(){
        const d=document.getElementsByClassName("player_selection")[0];
        d.style.display="none";
    }
    function popup(){
        const d=document.getElementsByClassName("warning")[0];
        d.style.display="flex";
    }
    function togame(){
        const d=document.getElementsByClassName("warning")[0];
        d.style.display="none";
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

function display_winner(){
    const d=document.getElementsByClassName("winmenu")[0];
    document.getElementsByClassName("winn")[0].innerHTML=document.getElementsByClassName("winnerlist")[0].innerHTML;
    d.style.display="flex";

}

function reback(){
    reset()
    document.getElementsByClassName("resume")[0].style.display="none";
    const d=document.getElementsByClassName("winmenu")[0];
    d.style.display="none";
    document.getElementsByClassName("player_selection")[0].style.display="flex";
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