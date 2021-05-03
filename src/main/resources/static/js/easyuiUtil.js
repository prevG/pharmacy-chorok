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
	var retVal = {};
	
	var params = {
		"grpCd":grpCd,
		"useYn":"Y"
	};
	
	$.ajax({
		type: 'post',
		url: '/admin/getCodes',
		data: params,
		success: function (result) {
			
			console.log(result);
			retVal = result.data;
			if (result.status == "success") {
				alert(result.message);
			} else {
				alert(result.errorMessage);
			}
			
		}
	});
	
	return retVal;
}

