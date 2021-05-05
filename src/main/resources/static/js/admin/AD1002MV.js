


function fnSearch() {

	var param = {
		grpCd: $('#cb_grpCd').combobox('getValue'),
		useYn: $('#cb_useYn').combobox('getValue'),
		target: "grid",
		srchKind: $('#cb_cd').combobox('getValue'),
		srchTxt: $("#srchTxt").val()
	};

	$.ajax({
		type: "POST",
		url: '/admin/getCodesByGrpCd',
		dataType: 'json',
		//data:$('#searchUser').serialize(),    
		data: param,
	}).done(function(responseJson) {
		console.log(responseJson);
		$('#dg').datagrid('loadData', responseJson);

	});

}


function fnChkDup(target) {

}


function fnInit() {
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

function addCode() {
	$('#addDlg').dialog('open').dialog('center').dialog('setTitle', '코드추가');
	$('#addFrm').form('clear');
}


function removeCode() {
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

function editCode() {
	var row = $('#dg').datagrid('getSelected');
	if (row) {
		$('#dlg').dialog('open').dialog('center').dialog('setTitle', '코드수정');
		$('#fm').form('load', row);
		//url = 'update_user.php?id='+row.id;
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