var a=new Array(11);
        var f=1,st_pt=0,fla=0;
        let flagpos=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
        let flagid=0;
        function cell_matrix(){
            var e=document.getElementsByClassName("block")[0];
            var c="";
            for(let i=0;i<121;i++){
                c+='<div class="cell" onclick="change_cell('+i.toString()+')"></div>';
            }
            e.innerHTML=c;
        }
        function fill_bomb(){
            cell_matrix();
            var j,c;
            for(let i=0;i<11;){
                c=Math.floor(Math.random()*121);
                for(j=0;j<i;j++){
                    if(a[j]==c)
                    break;
                }
                if(j==i){
                    a[i]=c;
                    i++;
                }
            }
        }
        function check(d){
            for(var i=0;i<11;i++){
                if(a[i]==d)
                return 1;
            }
            return 0;
        }
        function around(d){
            var c=0;
            if(d-11>=0){
                if(check(d-11)==1)
                c++;
                if(d-11-1>=0&&(d-11)%11!=0){
                    if(check(d-11-1)==1)
                    c++;
                }
                if((d-11+1)%11!=0){
                    if(check(d-11+1)==1)
                    c++;
                }
            }
            if(d+11<121){
                if(check(d+11)==1)
                c++;
                if((d+1)%11!=0){
                    if(check(d+11+1)==1)
                    c++;
                }if(d%11!=0){
                    if(check(d+11-1)==1)
                    c++;
                }
            }if(d%11!=0){
                if(check(d-1)==1)
                c++;
            }if((d+1)%11!=0){
                if(check(d+1)==1)
                c++;
            }
            return c;
        }
        function check_win(){
            let count=0;
            for(let i=0;i<11;i++){
                for(let j=0;j<11;j++){
                    if(a[i]==flagpos[j])
                    count++;
                }
            }
            if(count==11) return true;
            return false;
        }
        function change_cell(c){
            var d=parseInt(c);
            var e=document.getElementsByClassName('cell');
            console.log("okay"+d+fla+" "+flagid+" "+e[d].style.background)
            if(fla==1 && flagid<=11 && e[d].style.background!="white"){
                let i;
                for(i=0;i<flagid;i++){
                    if(flagpos[i]==d){
                        e[d].innerHTML="";
                        break;
                    }
                }
                if(i!=flagid){
                    for(let j=i;j<flagid-1;j++){
                        flagpos[j]=flagpos[j+1];
                    }
                    flagid--;
                    return;
                }
                flagpos[flagid++]=d;
                e[d].innerHTML="&#128681";
                if(flagid==11){
                if(check_win()){
                    e=document.getElementsByClassName("message")[0];
                    e.innerHTML="CONGRATULATION"
                    show_all();
                }
                }
            }
            else if(check(d)==1&&f==0){
                e[d].style.background="rgba(255, 50, 50, 0.7)";
                e[d].innerHTML="&#128163";
                f=1;
                document.getElementsByClassName("message")[0].innerHTML="YOU LOST!!";
                show_all();
            }else if(f==0&&e[d].style.background!="white"){
                e[d].style.background="white";
                var aro=around(d);
                if(aro==0){
                    safe_space(Math.floor(d/11),d%11,0,e);
                }else{
                    e[d].innerHTML=aro;
                }
            }
        }
        function start(){
                fill_bomb();
                f=1
                st_pt=0
                fla=0;
                flagpos=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
                flagid=0;
                document.getElementsByClassName("message")[0].innerHTML="START PLAY!!";
            document.getElementsByClassName("message")[0].innerHTML="START PLAY!!";
            document.getElementsByTagName("button")[1].innerText="RESTART"
            f=0;
            flag_dis();
        }
        function safe_space(r,c,dir,ele){
            if(dir==0){
                safe_space(r-1,c,-1,ele);
                safe_space(r+1,c,1,ele);
                safe_space(r,c-1,-2,ele);
                safe_space(r,c+1,2,ele);
            }else if(dir==-1 && r>=0){
                if(ele[r*11+c].style.background=="white")
                return;
                var aro;
                if((aro=around(r*11+c))!=0){
                    ele[r*11+c].style.background="white";
                    st_pt+=1
                    ele[r*11+c].innerHTML=aro;
                    return;
                }
                ele[r*11+c].style.background="white"
                st_pt+=1
                safe_space(r-1,c,-1,ele);
                safe_space(r,c-1,-2,ele);
                safe_space(r,c+1,2,ele);
            }else if(dir==1 && r<=10){
                if(ele[r*11+c].style.background=="white")
                return;
                var aro;
                if((aro=around(r*11+c))!=0){
                    ele[r*11+c].style.background="white";
                    ele[r*11+c].innerHTML=aro;
                    st_pt+=1
                    return;
                }
                ele[r*11+c].style.background="white"
                st_pt+=1
                safe_space(r+1,c,1,ele);
                safe_space(r,c-1,-2,ele);
                safe_space(r,c+1,2,ele);
            }else if(dir==-2 && c>=0){
                if(ele[r*11+c].style.background=="white")
                return;
                var aro;
                if((aro=around(r*11+c))!=0){
                    ele[r*11+c].style.background="white";
                    ele[r*11+c].innerHTML=aro;
                    st_pt+=1
                    return;
                }
                ele[r*11+c].style.background="white"
                st_pt+=1
                safe_space(r-1,c,-1,ele);
                safe_space(r+1,c,1,ele);
                safe_space(r,c-1,-2,ele);
            }else if(dir==2 && c<=10){
                if(ele[r*11+c].style.background=="white")
                return;
                var aro;
                if((aro=around(r*11+c))!=0){
                    ele[r*11+c].style.background="white";
                    ele[r*11+c].innerHTML=aro;
                    st_pt+=1
                    return;
                }
                ele[r*11+c].style.background="white"
                st_pt+=1
                safe_space(r-1,c,-1,ele);
                safe_space(r+1,c,1,ele);
                safe_space(r,c+1,-2,ele);
            }
        }
        function show_all(){
            for(let i=0;i<11;i++){
                var e=document.getElementsByClassName('cell')[a[i]];
                e.style.background="rgba(255, 50, 50, 0.7)";
                e.innerHTML="&#128163";
            }
        }
        function flag_dis(){
            var e=document.getElementsByClassName('fl')[0];
            e.innerHTML='<button class="flagbtn" style="width:40px" onclick="flag()">&#128681</button>';
            fla=0;
        }
        function flag(){
            const d=document.getElementsByClassName('flagbtn')[0];
            if(fla==0){
                fla=1;
                d.style.background="lightblue";
            }
            else{
                d.style.background="white";
                fla=0;
            }
        }