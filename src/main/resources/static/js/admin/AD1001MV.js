var gDataArr = new Array();

var gC1003; //직윈 
var gC1002; //권한
var gC1010; //승인
var editingRowIdx = -1; 

function fnSearch() {
	var queryParams = $("#dg").datagrid('options').queryParams;
	queryParams.cbSrch = $('#cb_srch').combobox('getValue');
	queryParams.cbAuth = $('#cb_usrAuth').combobox('getValue');
	queryParams.cbAppv = $('#cb_usrAprv').combobox('getValue');
	queryParams.target = "grid";
	queryParams.srchTxt = $("#srchTxt").val();
	$('#dg').datagrid('reload');
}

function formatDate(value, row) {
  var d = new Date(value);
  return $.fn.datebox.defaults.formatter(d);
}

function fnInit() {
	// init combo
	initComboBox($('#cb_usrAuth'), 	'/admin/getGrpCdWithCombo', { GrpCd: 'C1002', target: 'combo', targetKind: '0' });
	initComboBox($('#cb_usrAprv'), 	'/admin/getGrpCdWithCombo', { GrpCd: 'C1010', target: 'combo', targetKind: '0' });

	// get combo	
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
        		editor: { type: 'checkbox', options: { on:'Y', off:'N' }}
        	}
        	/*{field:'regDt', title:'등록날짜', align:'center', width:'200', editor:'text', formatter:function(value){
				console.log(value);
			  	var d = new Date(value);
			  	return $.fn.datebox.defaults.formatter(d);
			}}*/
        ]]
	});
}

function cancelAdmin() {
	if (editingRowIdx < 0) return;
	
	$('#dg').datagrid('cancelEdit', editingRowIdx);
	editingRowIdx = -1;		
}

function saveAdmin() {
	if (editingRowIdx < 0) return;
	
	$('#dg').datagrid('endEdit', editingRowIdx);
	var row = $('#dg').datagrid('getRows')[editingRowIdx];
	var param = {
		usrNo : row.usrNo,
		usrNm : row.usrNm,
		usrEml : row.usrEml,
		usrPhnNo : row.usrPhnNo,
		usrGrade : row.usrGrade === undefined ? '00000' : row.usrGrade,
		usrAuth : row.usrAuth === undefined ? '00000' : row.usrAuth,
		usrAprv : row.usrAprv,
		delYn : row.delYn
	};
    
    alert(param.usrNo+":"+param.usrNm+":"+param.usrEml+":"+param.usrPhnNo+":"+param.usrGrade+":"+param.usrAuth+":"+param.usrAprv+":"+param.delYn);
    
    row.editing = false;
    $('#dg').datagrid('refreshRow', editingRowIdx);
    editingRowIdx = -1;
}

function editAdmin() {
	var row = $('#dg').datagrid('getSelected');
	if (!row) return;
	
	$('#addDlg').dialog('open').dialog('center').dialog('setTitle','관리자 수정');
	$('#addFrm').form('clear');

    initComboBox($('#dlg_usrGrade'), 	'/admin/getGrpCdWithCombo', { GrpCd: 'C1003', target: 'combo', targetKind: '1' });
    initComboBox($('#dlg_usrAuth'), 	'/admin/getGrpCdWithCombo', { GrpCd: 'C1002', target: 'combo', targetKind: '1' });
    initComboBox($('#dlg_usrAprv'), 	'/admin/getGrpCdWithCombo', { GrpCd: 'C1010', target: 'combo', targetKind: '1' });
    initComboBox($('#dlg_delYn'), 		'/admin/getGrpCdWithCombo', { GrpCd: 'C1012', target: 'combo', targetKind: '1' });

	$('#dlg_usrNo').val('setValue', row.usrNo);
	$('#dlg_em').textbox('setValue', row.usrEml);
	/*$('#dlg_pw').textbox('setValue', row.usrPwd);*/
	$('#dlg_usrNm').textbox('setValue', row.usrNm);
	$('#dlg_usrPhnNo').textbox('setValue', row.usrPhnNo);
	$('#dlg_usrGrade').combobox('setValue', row.usrGrade);
	$('#dlg_usrAuth').combobox('setValue', row.usrAuth);
	$('#dlg_usrAprv').combobox('setValue', row.usrAprv);
	$('#dlg_delYn').combobox('setValue', row.delYn);
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

function addAdmin() {
	$('#addDlg').dialog('open').dialog('center').dialog('setTitle','관리자 추가');
    $('#addFrm').form('clear');
     
    initComboBox($('#dlg_usrGrade'), 	'/admin/getGrpCdWithCombo', { GrpCd: 'C1003', target: 'combo', targetKind: '1' });
    initComboBox($('#dlg_usrAuth'), 	'/admin/getGrpCdWithCombo', { GrpCd: 'C1002', target: 'combo', targetKind: '1' });
    initComboBox($('#dlg_usrAprv'), 	'/admin/getGrpCdWithCombo', { GrpCd: 'C1010', target: 'combo', targetKind: '1' });
    initComboBox($('#dlg_delYn'), 		'/admin/getGrpCdWithCombo', { GrpCd: 'C1012', target: 'combo', targetKind: '1' });
}

function saveDlgAdmin() {
	var param = {
		usrNo : $('#dlg_usrNo').textbox('getValue'),
		usrEml : $('#dlg_em').textbox('getValue'),
		usrPwd : $('#dlg_pw').textbox('getValue'),
		usrNm : $('#dlg_usrNm').textbox('getValue'),
		usrPhnNo : $('#dlg_usrPhnNo').textbox('getValue'),
		usrGrade : $('#dlg_usrGrade').combobox('getValue'),
		usrAuth : $('#dlg_usrAuth').combobox('getValue'),
		usrAprv : $('#dlg_usrAprv').combobox('getValue') === '00000' ? 'A01' : $('#dlg_usrAprv').combobox('getValue'),
		delYn : $('#dlg_delYn').combobox('getValue') === '00000' ? 'N' : $('#dlg_delYn').combobox('getValue')
	};
	
	$.post('/admin/saveAdmin', param, function(result) {
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

$(document).ready(function() {
	fnInit();
});
