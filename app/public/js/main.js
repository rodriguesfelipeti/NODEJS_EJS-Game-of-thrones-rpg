// sair
$(document).ready((e)=> {
    $("#btn-sair").click((e)=>{
        window.location.href= '/sair'
    })

    //btn suditos
    $("#btn-suditos").click((e)=>{
       $("#msg").hide() 
       $.ajax({
           url: '/suditos',
           method: 'get',
           success: (data) => $("#acoes").html(data)
       })
    })

    //btn-pergaminho
    $("#btn-pergaminho").click((e)=>{
       $("#msg").hide() 
        $.ajax({
            url: '/pergaminhos',
            method: 'get',
            success: (data) =>{
                $("#acoes").html(data)
                clearTimeout(timer_id)
                cronometro()
            } 
        })
    })
    
    var timer_id = null
    function cronometro(){
        
        $('.tempo_restante').each(function(){
            var segundos = $(this).html()
            var segundos_atuais = parseInt(segundos) - 1

            if(segundos_atuais < 0){
                window.location.href= "/jogo?msg=C"
            }else{
                $(this).html(segundos_atuais)
            }
        })
        timer_id = setTimeout(cronometro, 1000)
    }

})




