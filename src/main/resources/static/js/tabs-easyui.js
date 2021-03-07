function addTabMenu( menuId, menuNm ) {

    // //$('#home-tab-menu').

    if ($('#tt').tabs('exists', menuId)){
        $('#tt').tabs('select', menuId);
    } else {
        var content = '<iframe scrolling="auto" frameborder="0" src="'+menuNm+'" style="width:100%;height:100%;"></iframe>';
        $('#tt').tabs('add',{
            title:menuId,
            content:content,
            closable:true
        });
    }
}

function deleteTabMenu( menuId, menuNm ) {
    
}