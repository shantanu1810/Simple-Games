let f1=0;
        let ms=0,ss=0,mn=0,h=0;
        var ar=['1','2','3','4','5','6','7','8',''];
        var id=["1","2","3","4","5","6","7","8","9"];
        var i=['11','12','13','14','15','16','17','18','19'],f=0,g=0;
        let st;
        function timer(){
            if(f1==0){
                f1=1;
                st=setInterval(
                    function(){
                    if(ms==99){
                        ms=0;
                        if(ss==59){
                            ss=0;
                            if(mn==59){
                                mn=0;
                                h+=1;
                            }else{
                                mn+=1;
                            }
                        }else{
                            ss+=1;
                        }
                    }else{
                        ms+=1;
                    }
                    let min=(mn<10)?'0'+mn.toString():mn.toString();
                    let sec=(ss<10)?'0'+ss.toString():ss.toString();
                    let msec=(ms<10)?'0'+ms.toString():ms.toString();
                    document.getElementById("timer").innerHTML="Time : "+min+':'+sec+':'+msec;
                },10
                )
            }
        }
        function move(s,d){
            let t=0;
            if(ar[d]!=='' && f==1){
                const ci=document.getElementById(id[d]);
                if(d+3<9 && ar[d+3]==''){
                    ar[d+3]=ar[d];
                    ar[d]='';
                    const bi=document.getElementById(id[d+3]);
                    bi.innerHTML=ar[d+3];
                    document.getElementById(i[d+3]).style.backgroundColor='rgb(45, 45, 205)';
                    ci.innerHTML='';
                    document.getElementById(i[d]).style.backgroundColor='white';
                    t=1;
                }else if(d-3>=0 && ar[d-3]==''){
                    ar[d-3]=ar[d];
                    ar[d]='';
                    const bi=document.getElementById(id[d-3]);
                    bi.innerHTML=ar[d-3];
                    document.getElementById(i[d-3]).style.backgroundColor='rgb(45, 45, 205)';
                    ci.innerHTML='';
                    document.getElementById(i[d]).style.backgroundColor='white';
                    t=1;
                }else if((d+1)%3!=0 && d+1<9 && ar[d+1]==''){
                    ar[d+1]=ar[d];
                    ar[d]='';
                    const bi=document.getElementById(id[d+1]);
                    bi.innerHTML=ar[d+1];
                    document.getElementById(i[d+1]).style.backgroundColor='rgb(45, 45, 205)';
                    ci.innerHTML='';
                    document.getElementById(i[d]).style.backgroundColor='white';
                    t=1;
                }else if(d%3!=0 && d-1>=0 && ar[d-1]==''){
                    ar[d-1]=ar[d];
                    ar[d]='';
                    const bi=document.getElementById(id[d-1]);
                    bi.innerHTML=ar[d-1];
                    document.getElementById(i[d-1]).style.backgroundColor='rgb(45, 45, 205)';
                    ci.innerHTML='';
                    document.getElementById(i[d]).style.backgroundColor='white';
                    t=1;
                }
                if(t==1){
                    movement=movement+1;
                    document.getElementById('movement').innerHTML="Moves - "+movement;
                    g=0;
                    for(let i=0;i<8;i++){
                        if(id[i]!=ar[i]){
                            g=1;
                            break;
                        }
                    }
                    if(g==0){
                        f=0;
                        f1=0;
                        clearInterval(st);
                        document.getElementById('message').innerHTML="CONGRATULATION,YOU WIN!!!";
                    }
                }
            }
        }
        function shuffle(){
            document.getElementById('message').innerHTML="";
            f=1;
            ms=0,ss=0,mn=0,h=0;
            movement=0;
            document.getElementById('movement').innerHTML="Moves - "+movement;
            let d=Math.floor(Math.random()*16)+5;
            let ar1=[1,3,5,7],ar2=[0,2,6,8],a,b,c;
            for(a=0;a<9;a++){
                if(a==4 && ar[a]==''){
                    break;
                }
                if(ar[a]==''){
                    if(a%2==0){
                        if(a==2||a==8){
                            ar[a]=ar[5];
                            ar[5]=ar[4];
                            ar[4]='';
                        }else{
                            ar[a]=ar[3];
                            ar[3]=ar[4];
                            ar[4]='';
                        }
                    }else{
                        ar[a]=ar[4];
                        ar[4]='';
                    }
                }
            }
            while(d!=0){
                a=Math.floor(Math.random()*4);
                b=Math.floor(Math.random()*4);
                c=ar[ar1[a]];
                ar[ar1[a]]=ar[ar2[b]];
                ar[ar2[b]]=c;
                c=Math.floor(Math.random()*4);
                a=ar[ar2[b]];
                ar[ar2[b]]=ar[ar1[c]];
                ar[ar1[c]]=a;
                d=d-1;
            }
            d=Math.floor(Math.random()*3);
            if(d==0){
                a=Math.floor(Math.random()*4);
                ar[4]=ar[ar1[a]];
                ar[ar1[a]]='';
            }else if(d==1){
                a=Math.floor(Math.random()*4);
                ar[4]=ar[ar1[a]];
                ar[ar1[a]]='';
                if(ar1[a]==1||ar1[a]==7){
                    ar[ar1[a]]=ar[ar1[a]-1];
                    ar[ar1[a]-1]='';
                }else{
                    ar[ar1[a]]=ar[ar1[a]+3];
                    ar[ar1[a]+3]='';
                }
            }
            for(a=0;a<9;a++){
                let s=document.getElementById(id[a]);
                s.innerHTML=ar[a];
                if(ar[a]!=''){
                    document.getElementById(i[a]).style.backgroundColor='rgb(45, 45, 205)';
                }else{
                    document.getElementById(i[a]).style.backgroundColor='white';
                }
            }
            timer()
        }
        function reset(){
            shuffle();
            timer();
            document.getElementById('message').innerHTML="";
        }