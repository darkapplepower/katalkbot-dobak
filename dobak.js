/*
MIT LICENCE
Copyright (c) 2020 darkapplepower
*/
const PATH="sdcard/darkapple/도박/정보";
data=FileStream.read(PATH);
const DATA=JSON.parse(data===null?FileStream.write(PATH,"{}"):data);
delete data;
const MT={};
const ROOM=["Devlobots | 카톡봇 게임","DEBUG ROOM"];
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    if(!ROOM.includes(room))return;
    const split=msg.split(" ");
    if(split[0]==='d도박'){
        const hash=imageDB.getProfileHash();
        switch(split[1]){
            case "가입":
                if(!Object.keys(DATA).includes(sender)){
                    DATA[sender]={};
                    DATA[sender][hash]="10000000";
                    replier.reply("가입되었습니다.");
                    save();
                }else{
                    replier.reply("이미 가입되었습니다.");
                }
                break;
            case "내돈":
                if(DATA[sender]===undefined?false:DATA[sender][hash]===undefined?false:true){
                    replier.reply(sender+"님의 돈: "+setD(DATA[sender][hash]));
                }
                break;
            case "받기":
                if(DATA[sender]===undefined?false:DATA[sender][hash]===undefined?false:true){
                    if(!Object.keys(MT).includes(sender)){
                        MT[sender]={};
                    }
                    if(MT[sender][hash]===undefined){
                        MT[sender][hash]=0;
                    }
                    if(MT[sender][hash]+60000<Date.now()){
                        MT[sender][hash]=Date.now();
                        DATA[sender][hash]=plus(DATA[sender][hash],"100000");
                        replier.reply("지급 완료");
                        save();
                    }else{
                        replier.reply("1분에 한번씩만 받을 수 있습니다.");
                    }
                }
                break;
            case "랭킹":
                replier.reply("전체보기 눌러!\n"+"\u200b".repeat(1000)+Object.keys(DATA).sort((x,y)=>big(DATA[y][Object.keys(DATA[y])[0]],DATA[x][Object.keys(DATA[x])[0]])).map((x,xx)=>(xx+1)+"위"+x+"\n"+setD(DATA[x][Object.keys(DATA[x])[0]])).join("\n"))
                break;
            default:
                if(DATA[sender]===undefined?false:DATA[sender][hash]===undefined?false:true){
                    if(split[1]==="올인")split[1]=DATA[sender][hash];
                    if(split[1].replace(/[0-9]/g,"")!==""||big(split[1],"500")===-1)return replier.reply("값이 잘못됨\n500이상의 정수여야 함");
                    if(big(DATA[sender][hash],split[1])!==-1){
                        switch(Math.random()*15|0){
                            case 0:
                            case 1:
                            {
                                split[1]=half(split[1]);
                                let result=minus(DATA[sender][hash],split[1]);
                                DATA[sender][hash]=result;
                                replier.reply("도박 실패! (-"+setD(split[1])+")\n당신의 돈: "+setD(result));
                                save();
                                break;
                            }
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                            case 7:
                            {
                                let result=minus(DATA[sender][hash],split[1]);
                                DATA[sender][hash]=result;
                                replier.reply("도박 실패! (-"+setD(split[1])+")\n당신의 돈: "+setD(result));
                                save();
                                break;
                            }
                            case 8:
                            case 9:
                            {
                                split[1]=times(split[1],"3");
                                let result=plus(DATA[sender][hash],split[1]);
                                DATA[sender][hash]=result;
                                replier.reply("도박 성공!(×4)! (+"+setD(split[1])+")\n당신의 돈: "+setD(result));
                                save();
                                break;
                            }
                            default:
                            {
                                let result=plus(DATA[sender][hash],split[1]);
                                DATA[sender][hash]=result;
                                replier.reply("도박 성공(x2)! (+"+setD(split[1])+")\n당신의 돈: "+setD(result));
                                save();
                                break;
                            }
                        }
                    }else{
                        replier.reply("돈이 부족함\n당신의 돈: "+setD(DATA[sender][hash]));
                    }
                }
        }
    }
}
function save(){
    FileStream.write(PATH,JSON.stringify(DATA));
}
function setD(x){
    return x;
}
function plus(str1,str2){
    str1=str1.replace(/^0+|[\D]/g,"");
    str2=str2.replace(/^0+|[\D]/g,"");
    const count=Math.max(str1.length,str2.length);
    const list=new Array();
    str1="0".repeat(count-str1.length)+str1;
    str2="0".repeat(count-str2.length)+str2;
    for(let i=0;i<count;i++){
        list[i]=Number(str1[i])+Number(str2[i]);
    }
    const result=[];
    list.reverse();
    list.forEach(function(x,xx){
        if(result[xx]===undefined)result[xx]=0;
        if(result[xx]+x>=10){
            result[xx+1]=1;
            x-=10;
        }
        result[xx]+=x;
    });
    return result.reverse().join("");
}
function minus(str1,str2){
    str1=str1.replace(/^0+|[\D]/g,"");
    str2=str2.replace(/^0+|[\D]/g,"");
    const count=Math.max(str1.length,str2.length);
    const list=new Array();
    str1="0".repeat(count-str1.length)+str1;
    str2="0".repeat(count-str2.length)+str2;
    for(let i=0;i<count;i++){
        list[i]=Number(str1[i])-Number(str2[i]);
    }
    const result=[];
    list.reverse();
    list.forEach(function(x,xx){
        if(result[xx]===undefined)result[xx]=0;
        if(result[xx]+x<0){
            result[xx+1]=-1;
            x+=10;
        }
        result[xx]+=x;
    });
    result.reverse();
    if(result[0]=="-1"){
        return "-"+minus("1"+("0".repeat(result.length-1)),result.join("").replace("-1",""));
    }
    return result.join("").replace(/^0+/,"")===""?"0":result.join("").replace(/^0+/,"");
}
function times(str1,str2){
    str1=str1.replace(/^0+|[\D]/g,"");
    str2=str2.replace(/^0+|[\D]/g,"");
    const count=Math.max(str1.length,str2.length);
    const list=new Array();
    str1=str1.split("").reverse();
    str2=str2.split("").reverse();
    str1.forEach((_,i)=>{
        str2.forEach((_,o)=>{
            if(list[i+o]===undefined)list[i+o]=0;
            list[i+o]+=Number(str1[i])*Number(str2[o]);
        });
    });
    const result=[];
    list.forEach(function(x,xx){
        if(result[xx]===undefined)result[xx]=0;
        while(result[xx]+x>=10){
            if(result[xx+1]===undefined)result[xx+1]=0;
            result[xx+1]+=1;
            x-=10;
        }
        result[xx]+=x;
    });
    if(result.length===0)result.push(0);
    return result.reverse().join("");
}
function half(str){
    str=str.replace(/^0+|[\D]/g,"").split("").map(x=>Number(x));
    const list=new Array();
    str.forEach((x,xx)=>{
        if(list[xx]===undefined)list[xx]=0;
        if((x+list[xx])%2){
            x--;
            list[xx+1]=10;
        }
        list[xx]=(x+list[xx])/2;
    });
    list.length=str.length;
    return list.join("").replace(/^0+/,"");
}
function big(str1,str2){
    str1=str1.replace(/^0+|[\D]/g,"");
    str2=str2.replace(/^0+|[\D]/g,"");
    if(str1===str2)return 0;
    if(str1.length===str2.length){
        for(let i in str1){
            if(str1[i]!==str2[i]){
                return Number(str1[i])>Number(str2[i])?1:-1;
            }
        }
    }else{
        return str1.length>str2.length?1:-1;
    }
}
function setD(str){
    str=str.replace(/^0+|[\D]/g,"").split("").reverse().join("");
    var result=[];
    for(let i=0;i<str.length;i+=4){
        if(danwi[i/4]===undefined){
            result[danwi.length]=str.substr(i);
            break;
        }else{
            let dark=str.substr(i,4);
            if(dark!=="0000"){
                result[i/4]=danwi[i/4]+dark;
            }else{
                result[i/4]="";
            }
        }
    }
    return result.reverse().map(x=>x.split("").reverse().join("").replace(/^0+/,"")).join("")+"원";
}
const danwi=[
    "",
    "만",
    "억",
    "조",
    "경",
    "해",
    "자",
    "양",
    "구",
    "간",
    "정",
    "재",
    "극",
    "사하항",
    "기승아",
    "타유나",
    "의사가불",
    "수대량무"
]
