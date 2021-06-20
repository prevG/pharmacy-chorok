/******************************************************
 * 
 * administrator
 * 
 ******************************************************/
var gC1003; //직윈 
var gC1002; //권한
var gC1010; //승인

function fnSearch() {
	var queryParams = $("#dg").datagrid('options').queryParams;
	queryParams.cbSrch = $('#cb_srch').combobox('getValue');
	queryParams.cbAuth = $('#cb_usrAuth').combobox('getValue');
	queryParams.cbAppv = $('#cb_usrAprv').combobox('getValue');
	queryParams.target = "grid";
	queryParams.srchTxt = $("#srchTxt").val();
	
	$('#dg').datagrid('reload');
}
/*
function formatDate(value, row) {
  var d = new Date(value);
  return $.fn.datebox.defaults.formatter(d);
}
*/
function fnInit() {
	// init combo
	initComboBox($('#cb_usrAuth'), 	'/admin/getGrpCdWithCombo', { GrpCd: 'C1002', target: 'combo', targetKind: '0' });
	initComboBox($('#cb_usrAprv'), 	'/admin/getGrpCdWithCombo', { GrpCd: 'C1010', target: 'combo', targetKind: '0' });
	
    initComboBox($('#addFrm select[textboxName=dlg_usrGrade]'), '/admin/getGrpCdWithCombo', { GrpCd: 'C1003', target: 'combo', targetKind: '1' });
    initComboBox($('#addFrm select[textboxName=dlg_usrAuth]'), 	'/admin/getGrpCdWithCombo', { GrpCd: 'C1002', target: 'combo', targetKind: '1' });
    initComboBox($('#addFrm select[textboxName=dlg_usrAprv]'), 	'/admin/getGrpCdWithCombo', { GrpCd: 'C1010', target: 'combo', targetKind: '1' });
    initComboBox($('#addFrm select[textboxName=dlg_delYn]'), 	'/admin/getGrpCdWithCombo', { GrpCd: 'C1012', target: 'combo', targetKind: '1' });

    initComboBox($('#modFrm select[textboxName=dlg_usrGrade]'), '/admin/getGrpCdWithCombo', { GrpCd: 'C1003', target: 'combo', targetKind: '1' });
    initComboBox($('#modFrm select[textboxName=dlg_usrAuth]'), 	'/admin/getGrpCdWithCombo', { GrpCd: 'C1002', target: 'combo', targetKind: '1' });
    initComboBox($('#modFrm select[textboxName=dlg_usrAprv]'), 	'/admin/getGrpCdWithCombo', { GrpCd: 'C1010', target: 'combo', targetKind: '1' });
    initComboBox($('#modFrm select[textboxName=dlg_delYn]'), 	'/admin/getGrpCdWithCombo', { GrpCd: 'C1012', target: 'combo', targetKind: '1' });

	// get grid combo	
	gC1003 = getCodeData('C1003');
	gC1002 = getCodeData('C1002');
	gC1010 = getCodeData('C1010');
	
	$('#dg').datagrid({
	    url: '/admin/getAdmin',
	    /*
	    saveUrl: '/admin/saveAdmin',
	    updateUrl: '/admin/modifyAdmin',
	    destroyUrl: '/admin/removeAdmin',
	    */
	    singleSelect: true, 
	    ctrlSelect: true,
	    idField: 'usrNo',
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
        		field: 'usrNo', 
        		title: '사용자번호', 
        		hidden: true, 
        		width: '0'
        	},
        	{
        		field: 'usrNm', 
        		title: '사용자이름', 
        		align: 'center', 
        		width: '150', 
        		editor: 'text'
        	},
        	{
        		field: 'usrEml', 
        		title: '이메일', 
        		align: 'center', 
        		width: '250', 
        		editor:{
        			type: 'validatebox', 
        			options: { required:true, validType:'email' }
        		}
        	},
        	{
        		field: 'usrPhnNo', 
        		title: '핸드폰번호', 
        		align: 'center', 
        		width: '200', 
        		editor: 'text'
        	},
        	{
        		field: 'usrGrade', 
        		title: '직위', 
        		align: 'center', 
        		width: '100', 
        		editor: {
        			type: 'combobox',
        			options: { valueField: 'ditcCd', textField: 'ditcNm', data: gC1003, required: true }
        		}, 
        		formatter: function(value, row) { return row.usrGradeVal||value; }
        	},
        	{
        		field: 'usrAuth', 
        		title: '권한', 
        		align: 'center', 
        		width: '100', 
        		editor: {
        			type: 'combobox',
        			options: { valueField: 'ditcCd', textField: 'ditcNm', data: gC1002, required: true }
        		}, 
        		formatter: function(value, row) { return row.usrAuthVal||value; }
        	},
        	{
        		field: 'usrAprv', 
        		title: '승인여부', 
        		align: 'center', 
        		width: '100', 
        		editor: {
        			type: 'combobox',
        			options: { valueField: 'ditcCd', textField: 'ditcNm', data: gC1010, required: true }
        		}, 
        		formatter: function(value, row) { return row.usrAprvVal||value; }
        	},
        	{
        		field: 'delYn', 
        		title: '삭제여부', 
        		align: 'center', 
        		width: '150', 
        		editor: { type: 'checkbox', options: { on: 'Y', off: 'N' }}
        	}
        	/*{field:'regDt', title:'등록날짜', align:'center', width:'200', editor:'text', formatter:function(value){
				console.log(value);
			  	var d = new Date(value);
			  	return $.fn.datebox.defaults.formatter(d);
			}}*/
        ]]
	});
}

function addAdminPop() {
	$('#addDlg').dialog('open').dialog('center').dialog('setTitle','관리자 추가');
    $('#addFrm').form('clear');
    $('#addFrm').form('load', {
		dlg_usrGrade : '00000',
		dlg_usrAuth : '00000',
		dlg_usrAprv : '00000',
		dlg_delYn : '00000'
	});
}

function modifyAdminPop() {
	var row = $('#dg').datagrid('getSelected');
	if (!row) return;
	
	$('#modDlg').dialog('open').dialog('center').dialog('setTitle','관리자 수정');
	$('#modFrm').form('clear');
	$('#modFrm').form('load', {
		dlg_usrNo : row.usrNo,
		dlg_usrEml : row.usrEml,
		dlg_usrNm : row.usrNm,
		dlg_usrPhnNo : row.usrPhnNo,
		dlg_usrGrade : row.usrGrade,
		dlg_usrAuth : row.usrAuth,
		dlg_usrAprv : row.usrAprv,
		dlg_delYn : row.delYn
	});
}

function modifyAdminPwdPop() {
	var row = $('#dg').datagrid('getSelected');
	if (!row) return;
	
	$('#pwdDlg').dialog('open').dialog('center').dialog('setTitle','비밀번호 변경');
	$('#pwdFrm').form('clear');
	$('#pwdFrm').form('load', {
		dlg_usrNo : row.usrNo
	});
}

function addAdmin() {
	var param = {
		usrEml : $('#addFrm input[textboxName=dlg_usrEml]').textbox('getValue'),
		usrPwd : $('#addFrm input[textboxName=dlg_usrPwd]').textbox('getValue'),
		usrNm : $('#addFrm input[textboxName=dlg_usrNm]').textbox('getValue'),
		usrPhnNo : $('#addFrm input[textboxName=dlg_usrPhnNo]').textbox('getValue'),
		usrGrade : $('#addFrm select[textboxName=dlg_usrGrade]').combobox('getValue') === '00000' ? '002' : $('#addFrm select[textboxName=dlg_usrGrade]').combobox('getValue'),
		usrAuth : $('#addFrm select[textboxName=dlg_usrAuth]').combobox('getValue') === '00000' ? 'B00' : $('#addFrm select[textboxName=dlg_usrAuth]').combobox('getValue'),
		usrAprv : $('#addFrm select[textboxName=dlg_usrAprv]').combobox('getValue') === '00000' ? 'A01' : $('#addFrm select[textboxName=dlg_usrAprv]').combobox('getValue'),
		delYn : $('#addFrm select[textboxName=dlg_delYn]').combobox('getValue') === '00000' ? 'N' : $('#addFrm select[textboxName=dlg_delYn]').combobox('getValue')
	};
	
	$.post('/admin/addAdmin', param, function(result) {
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

function modifyAdmin() {
	var param = {
		usrNo : $('#modFrm input[name=dlg_usrNo]').val(),
		usrEml : $('#modFrm input[textboxName=dlg_usrEml]').textbox('getValue'),
		usrNm : $('#modFrm input[textboxName=dlg_usrNm]').textbox('getValue'),
		usrPhnNo : $('#modFrm input[textboxName=dlg_usrPhnNo]').textbox('getValue'),
		usrGrade : $('#modFrm select[textboxName=dlg_usrGrade]').combobox('getValue') === '00000' ? '002' : $('#modFrm select[textboxName=dlg_usrGrade]').combobox('getValue'),
		usrAuth : $('#modFrm select[textboxName=dlg_usrAuth]').combobox('getValue') === '00000' ? 'B00' : $('#modFrm select[textboxName=dlg_usrAuth]').combobox('getValue'),
		usrAprv : $('#modFrm select[textboxName=dlg_usrAprv]').combobox('getValue') === '00000' ? 'A01' : $('#modFrm select[textboxName=dlg_usrAprv]').combobox('getValue'),
		delYn : $('#modFrm select[textboxName=dlg_delYn]').combobox('getValue') === '00000' ? 'N' : $('#modFrm select[textboxName=dlg_delYn]').combobox('getValue')
	};
	
	$.post('/admin/modifyAdmin', param, function(result) {
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

function modifyAdminPwd() {
	var dlg_usrPwd = $('#pwdFrm input[textboxName=dlg_usrPwd]').textbox('getValue');
	var dlg_usrPwdCfm = $('#pwdFrm input[textboxName=dlg_usrPwdCfm]').textbox('getValue');
	if (dlg_usrPwd !== dlg_usrPwdCfm) {
		$.messager.show({ title: 'Error', msg: '패스워드가 일치하지 않습니다' });
		return;
	}
	var param = {
		usrNo : $('#pwdFrm input[name=dlg_usrNo]').val(),
		usrPwd : dlg_usrPwd,
		usrPwdCfm : dlg_usrPwdCfm
	};
	
	$.post('/admin/modifyAdminPwd', param, function(result) {
		if (result.success) {
			$.messager.show({ title: 'Success', msg: result.Msg });
			fnSearch();
		} else {
			$.messager.show({ title: 'Error', msg: result.Msg });
			return;
		}
		$('#pwdDlg').dialog('close');
	}, 'json')
	.fail(function(xhr, status, error) {
		$.messager.show({ title: 'Error', msg: xhr.responseJSON.message });
		return;
	});
}

function removeAdmin() {
	var row = $("#dg").datagrid("getSelected");
	if (!row) return;
	
	$.messager.confirm('Confirm', '사용자를 삭제하겠습니까?', function(r) {
		if (!r) return;
		$.post('/admin/removeAdmin', { usrNo: row.usrNo }, function(result) {
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
