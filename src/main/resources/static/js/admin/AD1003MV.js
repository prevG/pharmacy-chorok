/******************************************************
 * 
 * customer
 * 
 ******************************************************/
function fnSearch() {
	var queryParams = $("#dg").datagrid('options').queryParams;
	queryParams.cbSrch = $('#cbSrch').combobox('getValue');
	queryParams.srchTxt = $("#srchTxt").val();
	queryParams.cbDelYn = $('#cbDelYn').combobox('getValue');
	queryParams.startDttm = $('#startDttm').datebox('getValue');
	queryParams.endDttm = $('#endDttm').datebox('getValue');
	
	$('#dg').datagrid('reload');
}

function fnInit() {
	// init combo
    initComboBox($('#addFrm select[textboxName=dlg_delYn]'), 	'/admin/getGrpCdWithCombo', { GrpCd: 'C1012', target: 'combo', targetKind: '1' });

    initComboBox($('#modFrm select[textboxName=dlg_delYn]'), 	'/admin/getGrpCdWithCombo', { GrpCd: 'C1012', target: 'combo', targetKind: '1' });

	$('#dg').datagrid({
	    url: '/admin/getUser',
	    /*
	    saveUrl: '/admin/saveUser',
	    updateUrl: '/admin/modifyUser',
	    destroyUrl: '/admin/removeUser',
	    */
	    singleSelect: true, 
	    ctrlSelect: true,
	    idField: 'custId',
	    rownumbers: true,
		fitColumns: true, 
        fit: true,
        emptyMsg: '검색 조건에 해당하는 자료가 없습니다.',
        pagination: true,
        pageSize: 50,
        pageList: [50],
        dragSelection: true,
        columns:[[
			{
				field: 'custId', 
				title: '고객ID', 
				hidden: true, 
				width: '0'
			},
        	{
        		field: 'custUsrNm', 
        		title: '고객이름', 
        		align: 'center', 
        		width: '150', 
        		editor: 'text'
        	},
        	{
        		field: 'custCellNo', 
        		title: '핸드폰번호', 
        		align: 'center', 
        		width: '150', 
        		editor: 'numberbox'
        	},
        	{
        		field: 'custBirthDt', 
        		title: '생년월일', 
        		align: 'center', 
        		width: '200', 
        		editor: 'text'
        	},
        	{
        		field: 'custGenTpCd', 
        		title: '성별', 
        		align: 'center', 
        		width: '350', 
        		editor: 'text'
        	},
        	{
        		field: 'mrgYn', 
        		title: '결혼유무', 
        		align: 'center', 
        		width: '150', 
        		editor: {
        			type: 'checkbox',
        			options: { on: 'Y', off: 'N' }
        		}
        	},
        	{
        		field: 'delYn', 
        		title: '삭제여부', 
        		align: 'center', 
        		width: '100', 
        		editor: { 
        			type: 'checkbox',
        			options: { on: 'Y', off: 'N' }
        		}
        	},
        ]]
	});
}

function addUserPop() {
	$('#addDlg').dialog('open').dialog('center').dialog('setTitle','회원 추가');
    $('#addFrm').form('clear');
    $('#addFrm').form('load', {
		dlg_delYn : '00000'
	});
}

function modifyUserPop() {
	var row = $('#dg').datagrid('getSelected');
	if (!row) return;
	
	$('#modDlg').dialog('open').dialog('center').dialog('setTitle','회원 수정');
	$('#modFrm').form('clear');
	$('#modFrm').form('load', {
		dlg_custId : row.custId,
		dlg_custUsrNm : row.custUsrNm,
		dlg_custCellNo : row.custCellNo,
		dlg_custBirthDt : row.custBirthDt,
		dlg_custGenTpCd : row.custGenTpCd,
		dlg_delYn : row.delYn
	});
}

function addUser() {
	var param = {
		custUsrNm : $('#addFrm input[textboxName=dlg_custUsrNm]').textbox('getValue'),
		custCellNo : $('#addFrm input[textboxName=dlg_custCellNo]').textbox('getValue'),
		custBirthDt : $('#addFrm input[textboxName=dlg_custBirthDt]').textbox('getValue'),
		custGenTpCd : $('#addFrm input[textboxName=dlg_custGenTpCd]').textbox('getValue'),
		delYn : $('#addFrm select[textboxName=dlg_delYn]').combobox('getValue') === '00000' ? 'N' : $('#addFrm select[textboxName=dlg_delYn]').combobox('getValue')
	};
	
	$.post('/admin/addUser', param, function(result) {
		if (result.success) {
			$.messager.show({ title: 'Success', msg: result.Msg });
			fnSearch();
		} else {
			$.messager.show({ title: 'Error', msg: result.Msg });
			return;
		}
		$('#addDlg').dialog('close');
	}, 'json')
	.fail(function(xhr, status, error) {
		$.messager.show({ title: 'Error', msg: xhr.responseJSON.message });
		return;
	});
}

function modifyUser() {
	var param = {
		custId : $('#modFrm input[name=dlg_custId]').val(),
		custUsrNm : $('#modFrm input[textboxName=dlg_custUsrNm]').textbox('getValue'),
		custCellNo : $('#modFrm input[textboxName=dlg_custCellNo]').textbox('getValue'),
		custBirthDt : $('#modFrm input[textboxName=dlg_custBirthDt]').textbox('getValue'),
		custGenTpCd : $('#modFrm input[textboxName=dlg_custGenTpCd]').textbox('getValue'),
		delYn : $('#modFrm select[textboxName=dlg_delYn]').combobox('getValue') === '00000' ? 'N' : $('#modFrm select[textboxName=dlg_delYn]').combobox('getValue')
	};
	
	$.post('/admin/modifyUser', param, function(result) {
		if (result.success) {
			$.messager.show({ title: 'Success', msg: result.Msg });
			fnSearch();
		} else {
			$.messager.show({ title: 'Error', msg: result.Msg });
			return;
		}
		$('#modDlg').dialog('close');
	}, 'json')
	.fail(function(xhr, status, error) {
		$.messager.show({ title: 'Error', msg: xhr.responseJSON.message });
		return;
	});
}

function removeUser() {
	var row = $("#dg").datagrid("getSelected");
	if (!row) return;
	
	$.messager.confirm('Confirm', '사용자를 삭제하겠습니까?', function(r) {
		if (!r) return;
		$.post('/admin/removeUser', { custId: row.custId }, function(result) {
			if (result.success) {
				$.messager.show({ title: 'Success', msg: result.Msg });
				fnSearch();
			} else {
				$.messager.show({ title: 'Error', msg: result.Msg });
			}
		}, 'json')
		.fail(function(xhr, status, error) {
			$.messager.show({ title: 'Error', msg: xhr.responseJSON.message });
			return;
		});
   });
}

$(document).ready(function() {
	fnInit();
});

function myformatter(date) {
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
}

function myparser(s) {
	if (!s) return new Date();
	var ss = (s.split('-'));
	var y = parseInt(ss[0],10);
	var m = parseInt(ss[1],10);
	var d = parseInt(ss[2],10);
	if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
		return new Date(y,m-1,d);
	} else {
		return new Date();
	}
}
