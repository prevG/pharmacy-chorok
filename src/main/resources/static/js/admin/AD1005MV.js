var editingRowIdx = -1;


function fnSearch() {
	var queryParams=$("#dg").datagrid('options').queryParams;
	queryParams.grpCd= $('#cb_grpCd').combobox('getValue');
	queryParams.useYn= $('#cb_useYn').combobox('getValue');
	queryParams.target= "grid";
	queryParams.srchKind= $('#cb_cd').combobox('getValue');
	queryParams.srchTxt= $("#srchTxt").val();
	$('#dg').datagrid('reload');
}


function fnChkDup(target) {

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
	
	initComboBox($('#cb_cd'), '/admin/getGrpCdWithCombo', {GrpCd:'C1015',target:'combo', targetKind:'1'});
	
	$('#dg').datagrid({
	    url: '/admin/getVersion',
	    saveUrl: '/admin/saveVersion',
	    updateUrl: '/admin/modifyVersion',
	    destroyUrl: '/admin/removeVersion',
	    singleSelect:true, 
	    ctrlSelect:true,
	    idField:'trg',
	    rownumbers:true,
		fitColumns:true, 
        fit:true,
        emptyMsg:'검색 조건에 해당하는 자료가 없습니다.',
        pagination:true,pageSize:50,pageList:[50],
        dragSelection: true,
        columns:[[
        	{field:'trg', title:'그룹코드', align:'center', width:'150'},
        	{field:'ver', title:'상세코드', align:'center', width:'150', editor:'text'},
        	{field:'trgDes', title:'상세코드이름', align:'center', width:'200', editor:'text'},
        	{field:'delYn', title:'사용여부', align:'center', width:'100', editor:{type:'checkbox',options:{on:'Y',off:'N'}}},
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