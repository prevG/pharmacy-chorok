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


