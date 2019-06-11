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
            success: (data) => $("#acoes").html(data)
        })
    })

})

