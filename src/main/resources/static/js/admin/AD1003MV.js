var editingRowIdx = -1;


function fnSearch() {
	var queryParams=$("#dg").datagrid('options').queryParams;
	queryParams.cbSrch= $('#cbSrch').combobox('getValue');
	queryParams.srchTxt= $("#srchTxt").val();
	queryParams.cbDelYn= $('#cbDelYn').combobox('getValue');
	queryParams.startDttm= $('#startDttm').combobox('getValue');
	queryParams.endDttm= $('#endDttm').combobox('getValue');
	
	$('#dg').datagrid('reload');
}


function myformatter(date){
	var y = date.getFullYear();
	var m = date.getMonth()+1;
	var d = date.getDate();
	
	return  y + '-' + (m<10?('0'+m):m) + '-' + (d<10?('0'+d):d);
}
	
	
function myparser(s){
	if (!s) return new Date();
	var ss = (s.split('\.'));
	var d = parseInt(ss[0],10);
	var m = parseInt(ss[1],10);
	var y = parseInt(ss[2],10);
	if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
		return new Date(y,m-1,d);
	} else {
		return new Date();
	}
}



function fn_cancel(){
	if (editingRowIdx > -1){
		$('#dg').datagrid('cancelEdit', editingRowIdx);
		editingRowIdx = -1;
	}
}

function fn_save(){
	
	if (editingRowIdx > -1){
		console.log(editingRowIdx);
		$('#dg').datagrid('endEdit', editingRowIdx);
		//저장로직 추가
		
		var row = $('#dg').datagrid('getRows')[editingRowIdx];
		
		
        var grpCd = row.grpCd;
        var ditcCd = row.ditcCd;
        var ditcNm = row.ditcNm;
        var cdExp = row.cdExp;
        var vOrder = row.vOrder;
        var lockYn = row.lockYn;
        var useYn = row.useYn;
        
        console.log(grpCd+":"+ditcCd+":"+ditcNm+":"+cdExp+":"+vOrder+":"+lockYn+":"+useYn);
		//저장로직

        row.editing = false;
		$('#dg').datagrid('refreshRow', editingRowIdx);
		editingRowIdx=-1;
	}
}

function fn_edit(){
	var idx = -1;
	var row = $('#dg').datagrid('getSelected');
	if (row){
	  idx = $('#dg').datagrid('getRowIndex', row);
	}
	
	if(idx < 0) return;
	
	editingRowIdx = idx;
	
	$('#dg').datagrid('beginEdit', idx);
}



function fnInit() {
	
	$('#dg').datagrid({
	    url: '/admin/getUser',
	    saveUrl: '/admin/saveUser',
	    updateUrl: '/admin/modifyUser',
	    destroyUrl: '/admin/removeUser',
	    singleSelect:true, 
	    ctrlSelect:true,
	    idField:'custId',
	    rownumbers:true,
		fitColumns:true, 
        fit:true,
        emptyMsg:'검색 조건에 해당하는 자료가 없습니다.',
        pagination:true,pageSize:50,pageList:[50],
        dragSelection: true,
        columns:[[
			{field:'custId', title:'고객ID', hidden:true, width:'0'},
        	{field:'custUsrNm', title:'고객이름', align:'center', width:'150', editor:'text'},
        	{field:'custCellNo', title:'핸드폰번호', align:'center', width:'150', editor:'numberbox'},
        	{field:'custBirthDt', title:'생년월일', align:'center', width:'200', editor:'text'},
        	{field:'custGenTpCd', title:'성별', align:'center', width:'350', editor:'text'}, //코드
        	{field:'mrgYn', title:'결혼유무', align:'center', width:'150', editor:{type:'checkbox',options:{on:'Y',off:'N'}}},
        	{field:'delYn', title:'삭제여부', align:'center', width:'100', editor:{type:'checkbox',options:{on:'Y',off:'N'}}},
        ]],
	    onEndEdit:function(index,row){
			alert("a");
        },
        onBeforeEdit:function(index,row){
            row.editing = true;
            $(this).datagrid('refreshRow', index);
        },
        onAfterEdit:function(index,row){
            row.editing = false;
            $(this).datagrid('refreshRow', index);
        },
        onCancelEdit:function(index,row){
            row.editing = false;
            $(this).datagrid('refreshRow', index);
        }
	});
	
	
	$('#cb_grpCd').combobox({
		url: '/admin/getGrpCdWithCombo?GrpCd=00000&target=combo',
		valueField: 'ditcCd',
		textField: 'ditcCdNm',
		onSelect: function(rec) {
			console.log(rec);
		},
		onLoadSuccess: function() {
			$(this).combobox('setValue', '00000');
		}
	});



	$("#selCdKind").combobox({
		onSelect: function(rec) {
			if (rec.value == "G") {
				$("#grpRg").hide();
				$("#cdRg").show();

				$('#addFrm').form('clear');
			} else if (rec.value == "C") {
				$("#grpRg").show();
				$("#cdRg").hide();

				$('#grpRg_grpCd').combobox({
					url: '/admin/getGrpCdWithCombo?GrpCd=00000&target=combo',
					valueField: 'ditcCd',
					textField: 'ditcCdNm',
					onSelect: function(rec) {
						console.log(rec);
					}
				});

				$('#addFrm').form('clear');
			}
		}
	});
}


$(document).ready(function() {
	fnInit();
});


function chgSeLCdKind() {
	alert("a");
}

function fn_add() {
	$('#addDlg').dialog('open').dialog('center').dialog('setTitle', '코드추가');
	$('#addFrm').form('clear');
}


function fn_remove() {
	var row = $("#dg").datagrid("getSelected");

	console.log(row);

	if (row) {
		$.messager.confirm('Confirm', '코드를 삭제하겠습니까?', function(r) {
			if (r) {
				$.post('/admin/removeCode', { grpCd: row.grpCd, ditcCd: row.ditcCd }, function(result) {
					if (result.success) {
						//$('#dg').datagrid('reload');    // reload the user data
						$.messager.show({    // show error message
							title: 'Success',
							msg: result.Msg
						});
						fnSearch();
					} else {
						$.messager.show({    // show error message
							title: 'Error',
							msg: result.Msg
						});
					}
				}, 'json');
			}
		});
	}
}


function saveDlgCode(x) {
	if (x == 1) {
		var param = {
			grpCd: $('#cdRg_grpCd').textbox('getValue'),
			ditcCd: $('#cdRg_ditcCd').textbox('getValue'),
			ditcNm: $('#ditcNm').textbox('getValue'),
			cdExp: $('#cdExp').textbox('getValue'),
			lockYn: $('#lockYn').combobox('getValue'),
			useYn: $('#useYn').combobox('getValue')
		};
	} else if (x == 2) {
		var param = {
			grpCd: $('#grpRg_grpCd').textbox('getValue'),
			ditcCd: $('#grpRg_ditcCd').textbox('getValue'),
			ditcNm: $('#ditcNm').textbox('getValue'),
			cdExp: $('#cdExp').textbox('getValue'),
			lockYn: $('#lockYn').combobox('getValue'),
			useYn: $('#useYn').combobox('getValue')
		};
	} else {
		// 코드구분 미선택 처리
	}


	$.post('/admin/saveCode', param, function(result) {
		if (result.success) {

			$.messager.show({    // show error message
				title: 'Success',
				msg: result.Msg
			});

			fnSearch();
		} else {
			$.messager.show({    // show error message
				title: 'Error',
				msg: result.Msg
			});
		}

		$('#addFrm').dialog('close');
	}, 'json')


	/*
	 $('#addFrm').form('submit',{
		 url: url,
		 iframe: false,
		 onSubmit: function(){
			 return $(this).form('validate');
		 },
		 success: function(result){
			 var result = eval('('+result+')');
			 if (result.errorMsg){
				 $.messager.show({
					 title: 'Error',
					 msg: result.errorMsg
				 });
			 } else {
				 $('#dlg').dialog('close');        // close the dialog
				 $('#dg').datagrid('reload');    // reload the user data
			 }
		 }
	 });
	 */

}