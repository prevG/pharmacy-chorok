
/*콤보박스 세팅*/
function initComboBox(target, srvUrl, param){
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

/*코드리턴*/
function getCodeData(grpCd){
	
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

/*ajax 콜*/
function callAsynAjax(pUrl, pParam, pMethod='post'){
	
	$.ajax({
		type: pMethod,
		url: pUrl,
		data: pParam,
		async: true,
		success: function (result) {
			console.log(result);
		}
	});
}

/*ajax 콜*/
function callSynAjax(pUrl, pParam, pMethod='post'){
	$.ajax({
		type: pMethod,
		url: pUrl,
		data: pParam,
		async: false,
		success: function (result) {
			console.log(result);
		}
	});
}

/*포맷데이타(날짜) */
function formattedDate(date,row){
	
	var d = new Date(date || Date.now()),
		
	month = '' + (d.getMonth() + 1),
	day = '' + d.getDate(),
	year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [day, month, year].join('-');
}

