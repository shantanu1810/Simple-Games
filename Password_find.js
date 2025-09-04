let i=0, t=0;
        let digits=[0,1,2,3,4,5,6,7,8,9]
        let number=[0,0,0,0,0,0];
        let position=[0,0,0,0,0,0,0,0,0,0]
        let gue=0;
        function generate(){
            for(let j=0;j<6;j++){
                let index=Math.floor(Math.random()*digits.length);
                number[j]=digits[index];
                digits.splice(index,1);
                position[number[j]]++;
                console.log(number[j])
            }
            digits=[0,1,2,3,4,5,6,7,8,9];
        }

        function check(){
            const di=document.getElementsByClassName("storeval");
            let current=[0,0,0,0,0,0,0,0,0,0]
            let present=[0,0,0,0,0,0]
            const doc=document.getElementsByClassName('passin');
            let correct=0, wpos=0, wrong=0;
            let k=i;
            for(;k<i+6;k++){
                let v=doc[i].value;
                if(v=="")
                return
            }
            k=i;
            for(;i<k+6;i++){
                let v=doc[i].value;
                let c=parseInt(v);
                doc[i].style.display="none";
                di[i].style.display="flex";
                di[i].innerHTML=v;
                current[c]++;
                if(c==number[i%6]){
                    correct++;
                }
            }
            let d=document.getElementsByClassName("result")[gue];
            if(correct==6){
                d.innerHTML=d.innerHTML+"<div class='output'><span style='color:green;'>Congratulation you find the correct password</span></div>"
                document.getElementsByClassName('continue')[0].style.display='block';
                return;
            }
            for(let j=0;j<10;j++){
                if(position[j]!=0&&current[j]!=0){
                    if(position[j]>current[j]){
                        wpos+=current[j];
                    }else{
                        wpos+=position[j];
                    }
                }
            }
            wrong=6-wpos;
            wpos=wpos-correct;
            document.getElementsByClassName("check")[gue].style.display="none";
            gue++;
            d.innerHTML=d.innerHTML+"<div class='output'><span style='color: green;'>"+correct+" digits are in correct place</span><br><span style='color: blue;'>"+wpos+" are correct digits but in wrong place</span><br><span style='color: red;'> "+wrong+" digits are wrong.</span> </div>"
            
            text='<div class="placeinput"><div class="guess">Guess '+(gue+1)+' :</div>'+
            '<input class="passin" type="text" maxlength="1" onkeyup="moveToNext(this, '+(i+1)+')">'+
            '<input class="passin" type="text" maxlength="1" onkeyup="moveToNext(this, '+(i+2)+')">'+
            '<input class="passin" type="text" maxlength="1" onkeyup="moveToNext(this, '+(i+3)+')">'+
            '<input class="passin" type="text" maxlength="1" onkeyup="moveToNext(this, '+(i+4)+')">'+
            '<input class="passin" type="text" maxlength="1" onkeyup="moveToNext(this, '+(i+5)+')">'+
            '<div class="storeval"></div><div class="storeval"></div><div class="storeval"></div><div class="storeval"></div><div class="storeval"></div><div class="storeval"></div>'+
            '<input class="passin" type="text" maxlength="1"><button class="check" onclick="check()">TRY</button><br>'+
            '</div>'+'<br><br>'+
            '<div class="result">'+
            '<div class="head">Result : </div>'+
            '</div><br>'
            const ele=document.getElementsByClassName('mainbody')[0];
            ele.innerHTML=(ele.innerHTML+text);
        }
        function moveToNext(currentInput, id) {
            if (currentInput.value.length === currentInput.maxLength) {
                const nextInput = document.getElementsByClassName('passin')[id];
                if (nextInput) {
                    nextInput.focus();
                }
            }
        }
        function restart(){
            const d=document.getElementsByClassName('continue')[0];
            const c=document.getElementsByClassName('mainbody')[0];
            let i=0, t=0;
            let digits=[0,1,2,3,4,5,6,7,8,9]
            let number=[0,0,0,0,0,0];
            let position=[0,0,0,0,0,0,0,0,0,0]
            let gue=0;
            html='<div class="placeinput"><div class="guess">Guess 1 :</div>'+
            '<input class="passin" type="text" maxlength="1" onkeyup="moveToNext(this, 1)">'+
            '<input class="passin" type="text" maxlength="1" onkeyup="moveToNext(this, 2)">'+
            '<input class="passin" type="text" maxlength="1" onkeyup="moveToNext(this, 3)">'+
            '<input class="passin" type="text" maxlength="1" onkeyup="moveToNext(this, 4)">'+
            '<input class="passin" type="text" maxlength="1" onkeyup="moveToNext(this, 5)">'+
            '<input class="passin" type="text" maxlength="1">'+
            '<div class="storeval"></div><div class="storeval"></div><div class="storeval"></div><div class="storeval"></div><div class="storeval"></div><div class="storeval"></div>'+
            '<button class="check" onclick="check()">TRY</button><br>'+
        '</div><br><br>'+
        '<div class="result">'+
        '<div class="head">Result : </div>'+
        '</div><br>'
        c.innerHTML=html;
        d.style.display='none';
        }