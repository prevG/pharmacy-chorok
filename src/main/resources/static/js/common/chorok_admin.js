function initComboBox(target, srvUrl, param){
	console.log(target);
	$(target).combobox({
		url:srvUrl+'?GrpCd='+param.GrpCd+'&target='+param.target+'&targetKind='+param.targetKind,
	    valueField:'ditcCd',
	    textField:'ditcCdNm',
	    onSelect:function(rec){
			console.log(rec);
		},
		onLoadSuccess:function(){
			$(target).combobox('setValue', '00000');
		}
	
	});
}


function initCodeData(grpCd){
	
	var ret = new Array();
	
	var params = {
		"grpCd":grpCd,
		"useYn":"Y"
	};
	
	$.ajax({
		type: 'post',
		url: '/admin/getAbbrCodes',
		data: params,
		async: false,
		success: function (result) {
			result = JSON.parse(result);
			for(var i=0; i<result.length;i++){
				var temp = {ditcCd:result[i].ditcCd, ditcNm:result[i].ditcNm}; 
				ret.push(temp);
			}
		}
	});
	
	
	return ret;
}

