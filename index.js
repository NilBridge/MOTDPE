const ping = require('mcpe-ping');
function on_ping(e){
    if(e.group_id != NIL._vanilla.self_Id)return;
    let text = getText(e);
    if(text.startsWith("!motdpe")){
        if(text.split(' ').length == 1){e.reply('请指定一个motdpe地址！',true);return};
        var target = text.substring(8);
        var host = target;
        var port = 19132;
        if(target.indexOf(':') != -1){
            port = Number(target.split(':')[1]);
            host = target.split(':')[0];
        }
        ping(host,port,(err,dt)=>{
            try{
                if(err != null){
                    e.reply('服务器离线',true);
                    return;
                }
                var inf = dt.advertise.split(';');
                var str = `[MCBE服务器信息]\n协议版本：${inf[2]}\n游戏版本：${dt.version}\n描述文本：${dt.cleanName}\n在线人数：${dt.currentPlayers}/${dt.maxPlayers}\n存档名称：${inf[7]}\n游戏模式：${inf[8]}`
                e.reply(str,true);
            }catch(err){
                e.reply('motd出错：'+err);
            }
            
        });
    }
}

function getText(e) {
    var rt = '';
    for (i in e.message) {
        switch (e.message[i].type) {
            case "text":
                rt += e.message[i].text;
                break;
        }
    }
    return rt;
}

function onStart(api){
    api.listen('onMainMessageReceived',on_ping);
}

function onStop(){
}

module.exports = {
    onStart,
    onStop
};