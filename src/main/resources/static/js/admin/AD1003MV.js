/******************************************************
 * 
 * 사용자 관리 - 사용자 (AD1003MV)
 * 
 ******************************************************/

function addUserPop() {
	$('#addDlg').dialog('open').dialog('center').dialog('setTitle','회원 추가');
    $('#addFrm').form('clear');
    $('#addFrm').form('load', {
    	/*dlg_custGenTpCd : 'F',
    	dlg_mrgYn : 'Y',
    	dlg_brstFdgYn : 'N',*/
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
    	dlg_mrgYn : row.mrgYn,
    	dlg_pcrtChdCnt : row.pcrtChdCnt,
    	dlg_lstPcrtYear : row.lstPcrtYear,
    	dlg_brstFdgYn : row.brstFdgYn,
		dlg_zipCode : row.zipCode,
		dlg_addr1 : row.addr1,
		dlg_addr2 : row.addr2,
		dlg_vistTpCd : row.vistTpCd,
		dlg_delYn : row.delYn
	});
}

function addUser() {
	var param = {
		custUsrNm : $('#addFrm input[textboxName=dlg_custUsrNm]').textbox('getValue'),
		custCellNo : $('#addFrm input[textboxName=dlg_custCellNo]').textbox('getValue'),
		custBirthDt : $('#addFrm input[textboxName=dlg_custBirthDt]').textbox('getValue'),
		custGenTpCd : $('#addFrm input[name=dlg_custGenTpCd]:checked').val(),
		mrgYn : $('#addFrm input[name=dlg_mrgYn]:checked').val(),
		pcrtChdCnt : $('#addFrm input[textboxName=dlg_pcrtChdCnt]').textbox('getValue'),
		lstPcrtYear : $('#addFrm input[textboxName=dlg_lstPcrtYear]').textbox('getValue'),
		brstFdgYn : $('#addFrm input[name=dlg_brstFdgYn]:checked').val(),
		vistTpCd : $('#addFrm input[name=dlg_vistTpCd]:checked').val(),
		zipCode : $('#addFrm input[textboxName=dlg_zipCode]').textbox('getValue'),
		addr1 : $('#addFrm input[textboxName=dlg_addr1]').textbox('getValue'),
		addr2 : $('#addFrm input[textboxName=dlg_addr2]').textbox('getValue'),
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
		custGenTpCd : $('#modFrm input[name=dlg_custGenTpCd]:checked').val(),
		mrgYn : $('#modFrm input[name=dlg_mrgYn]:checked').val(),
		pcrtChdCnt : $('#modFrm input[textboxName=dlg_pcrtChdCnt]').textbox('getValue'),
		lstPcrtYear : $('#modFrm input[textboxName=dlg_lstPcrtYear]').textbox('getValue'),
		brstFdgYn : $('#modFrm input[name=dlg_brstFdgYn]:checked').val(),
		vistTpCd : $('#modFrm input[name=dlg_vistTpCd]:checked').val(),
		zipCode : $('#modFrm input[textboxName=dlg_zipCode]').textbox('getValue'),
		addr1 : $('#modFrm input[textboxName=dlg_addr1]').textbox('getValue'),
		addr2 : $('#modFrm input[textboxName=dlg_addr2]').textbox('getValue'),
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
	var AD1003MV = {
		init: function() {
		    /**************************************************************
		     * 고객목록 테이블
		     **************************************************************/
			$('#dg').datagrid({
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
		        onDblClickRow: function(value) {
		        	$("#btnCustInfo").trigger('click');
		        },
		        columns:[[
					{
						field: 'custId', 
						title: '고객번호',
						align: 'center',  
						width: '100'
					},
		        	{
		        		field: 'custUsrNm', 
		        		title: '고객이름', 
		        		align: 'center', 
		        		width: '150', 
		        		editor: 'text',
		        		formatter: function(value, row, index) {
		        			return '<span style="color:blue;font-weight:bold;">'+ value +'</span>';
		        		}
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
		        		width: '100', 
		        		editor: 'text',
		        		formatter: function(value, row) {
		        			return row.custGenTpCdVal;
		        		}
		        	},
		        	{
		        		field: 'mrgYn', 
		        		title: '결혼유무', 
		        		align: 'center', 
		        		width: '100', 
		        		editor: 'text',
		        		formatter: function(value, row) {
		        			return row.mrgYnVal;
		        		}
		        	},
		        	{
		        		field: 'zipCode', 
		        		title: '우편번호', 
		        		align: 'center', 
		        		width: '100', 
		        		editor: 'text'
		        	},
		        	{
		        		field: 'addr1', 
		        		title: '주소', 
		        		align: 'center', 
		        		width: '200', 
		        		editor: 'text'
		        	},
		        	{
		        		field: 'addr2', 
		        		title: '상세주소', 
		        		align: 'center', 
		        		width: '150', 
		        		editor: 'text'
		        	},
		        	{
		        		field: 'delYn', 
		        		title: '삭제여부', 
		        		align: 'center', 
		        		width: '100', 
		        		editor: 'text',
		        		formatter: function(value, row, index) {
		        			return '<span>'+ (value) ? value : 'N' +'</span>';
		        		}
		        	},
		        ]]
			});
		
			/**************************************************************
		     * "조회 버튼" 클릭시
		     **************************************************************/
			$('#btnUsrSearch').click(function(e) {
				AD1003MV.search();
			});
			
			/**************************************************************
		     * "추가 버튼" 클릭시
		     **************************************************************/
			$('#btnAddUserPop').click(function(e) {
				$("#custDlg").load("/admin/AD1003MV_D/0", function (data, status, xhr) {
					$('#saveCustFrm').form('clear');
					$('#custDlg').dialog('open').dialog('center').dialog('setTitle','고객정보');
					$.parser.parse($('#custDlg'));
		        });
			});

			/**************************************************************
		     * "삭제 버튼" 클릭시
		     **************************************************************/
			$('#btnRemoveUser').click(function(e) {
				AD1003MV.removeUser();
			});

			/**************************************************************
		     * "편집 버튼" 클릭시
		     **************************************************************/
			$('#btnModifyUserPop').click(function(e) {
				var row = $('#dg').datagrid('getSelected');
				if (!row) {
					$.messager.confirm('사용자 관리', '사용자 목록에서 항목을 선택해 주세요');
					return;	
				}
	
				$("#custDlg").load("/admin/AD1003MV_D/"+ row.custId, function (data, status, xhr) {
					$('#custDlg').dialog('open').dialog('center').dialog('setTitle','고객정보');
					$.parser.parse($('#custDlg'));
		        });
			});
		},
		search: function() {
			var queryParams = $("#dg").datagrid('options').queryParams;
			queryParams.cbSrch = $('#cbSrch').combobox('getValue');
			queryParams.srchTxt = $("#srchTxt").val();
			queryParams.cbDelYn = $('#cbDelYn').combobox('getValue');
			queryParams.startDttm = $('#startDttm').datebox('getValue');
			queryParams.endDttm = $('#endDttm').datebox('getValue');
			
			$('#dg').datagrid('load', '/admin/getUser');
		},
		removeUser: function() {
			var row = $("#dg").datagrid("getSelected");
			if (!row) {
				$.messager.alert('사용자 관리', '사용자 목록에서 삭제할 항목을 선택하세요.');
				return false;
			}
			
			var formData = {
				criteria: {
					"custId": 	row.custId
				}
			}
			$.messager.confirm('Confirm', '사용자를 삭제하겠습니까?', function(r) {
				if (!r) return;
				
				$.ajax({
					url: '/admin/removeUser',
					method: 'post',
					contentType: 'application/json',
					dataType: 'json',
					data: JSON.stringify(formData),
					success: function(res) {
						if (res.status === 'success') {
							$.messager.show({ title: '사용자 관리', msg: res.message });
							AD1001MV.search();
						} else {
							$.messager.alert('사용자 관리', res.message);
							return;
						}
					},
					error: function(xhr, status, error) {
						$.messager.alert('사용자 관리', xhr.responseJSON.message, 'error');
					}
				});
		   	});
		}
	};

	// init
	AD1003MV.init();
	AD1003MV.search();	
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
