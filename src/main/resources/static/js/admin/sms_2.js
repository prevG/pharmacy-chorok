/******************************************************
 * 
 * 공통코드 관리 - 공통코드 (AD1002MV)
 * 
 ******************************************************/

function myformatter(date) {
	var dt = new Date(date || Date.now());
	var y = dt.getFullYear();
	var m = dt.getMonth() + 1;
	var d = dt.getDate();
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

$(document).ready(function() {
	var AD1002MV = {
		init: function() {
			
		    /**************************************************************
		     * 복용상담스케줄 테이블
		     **************************************************************/
		     $('#dg').datagrid({
			    singleSelect: true, 
			    ctrlSelect: true,
			    idField: 'custId',
			    rownumbers: true,
				fitColumns: false, 
		        fit: true,
		        emptyMsg: '검색 조건에 해당하는 자료가 없습니다.',
		        pagination: true,
		        pageSize: 50,
		        pageList: [50],
		        dragSelection: true,
		        onSelect: function(index, row) {
		        	$('#dosgSmsFrm').form('load', {
		        		custUsrNm 	: row.custUsrNm,
		        		custCellNo 	: row.custCellNo,
		        		cnstId		: row.cnstId,
		        		dosgSeq		: row.dosgSeq,
		        		dosgTpNm 	: row.dosgTpNm,
		        		dosgDt 		: row.dosgDt,
		        		dosgSeqNm 	: row.dosgSeq === 0 ? '시작전날' : row.dosgSeq +' 일차',
		        		smsMsg 		: 'xxx'
		        	});
		        },
		        columns:[[
		            {field: 'custId'   , title: '고객번호', align: 'center', halign: 'center', width: '80'},
		        	{field: 'custUsrNm', title: '고객이름', align: 'center', halign: 'center', width: '80',
		        		formatter: function(value, row, index) {
		        			return '<span style="color:blue;font-weight:bold;">'+ value +'</span>';
		        		}
		        	},
		            {field: 'custCellNo' , title: '핸드폰번호'  , align: 'center', width: '100', editor: 'numberbox'},
		            {field: 'custGenTpNm', title: '성별'       , align: 'center', width: '80'},
		            {field: 'custAge'    , title: '나이'       , align: 'center', width: '60'},
		            {field: 'cnstId'     , title: '상담번호'    , align: 'center', width: '80' },
		            {field: 'dosgDt'     , title: '복용일자'    , align: 'center', width: '80' },
		            {field: 'dosgTpNm'	 , title: '복용유형'    , align: 'center', width: '110'},
		            {field: 'dosgSeq'    , title: '복용일차'    , align: 'center', width: '70',
		                formatter: function(value, row, index) {
		                    if( value == 0 ) {
		                        return '시작전날';    
		                    } else {
		                        return value +' 일차';
		                    }
		                }
		            },
		            {field: 'pausYn'     , title: '통화여부'    , align: 'center', width: '90'},
		            {field: 'picUsrNm'   , title: '담당한약사'   , align: 'center', width: '80'},
		            {field: 'pic2UsrNm'  , title: '담당상담실장' , align: 'center', width: '80'},
		            {field: 'cnstHhNm'	 , title: '상담가능시간' , align: 'center', width: '80'},
					{field: 'cnstHhMemo' , title: '상담시간메모' , align: 'left' , halign: 'center', width: '200'}
		        ]]
			});
		
			/**************************************************************
		     * "조회 버튼" 클릭시
		     **************************************************************/
			$('#btnSearch').click(function(e) {
				AD1002MV.search();
			});
			
			/**************************************************************
		     * "추가 버튼" 클릭시
		     **************************************************************/
			$('#btnAddUserPop').click(function(e) {
				$('#userFrm [textboxName=dlg_usrPwd]').parent().show(); // 비밀번호 숨김 처리 해제.
				$('#userDlg').dialog('open').dialog('center').dialog('setTitle','관리자 추가');
			    $('#userFrm').form('clear');
			    $('#userFrm').form('load', {
			    	dlg_usrNo 	 : '',
					dlg_usrGrade : '',
					dlg_usrAuth  : '',
					dlg_usrAprv  : '',
			    	dlg_delYn 	 : 'N'
				});
			});

			/**************************************************************
		     * "삭제 버튼" 클릭시
		     **************************************************************/
			$('#btnRemoveUser').click(function(e) {
				AD1002MV.removeUser();
			});

			/**************************************************************
		     * "편집 버튼" 클릭시
		     **************************************************************/
			$('#btnModifyUserPop').click(function(e) {
				var row = $('#dg').datagrid('getSelected');
				if (!row) {
					$.messager.alert('관리자 삭제', '관리자 목록에서 편집할 항목을 선택하세요.');
					return false;
				}
				
				$('#userFrm [textboxName=dlg_usrPwd]').parent().hide(); // 비밀번호 숨김 처리.
				$('#userDlg').dialog('open').dialog('center').dialog('setTitle','관리자 수정');
				$('#userFrm').form('clear');
				$('#userFrm').form('load', {
					dlg_usrNo 	 : row.usrNo,
					dlg_usrEml 	 : row.usrEml,
					dlg_usrNm 	 : row.usrNm,
					dlg_usrPhnNo : row.usrPhnNo,
					dlg_usrGrade : row.usrGrade,
					dlg_usrAuth  : row.usrAuth,
					dlg_usrAprv  : row.usrAprv,
					dlg_delYn 	 : row.delYn
				});
			});

			/**************************************************************
		     * "관리자 저장" 클릭시
		     **************************************************************/
			$('#btnSaveUser').click(function(e) {
				AD1002MV.saveUser();
			});

			/**************************************************************
		     * "비밀번호 변경" 클릭시
		     **************************************************************/
			$('#btnModifyPassPop').click(function(e) {
				var row = $('#dg').datagrid('getSelected');
				if (!row) return;
				
				$('#passDlg').dialog('open').dialog('center').dialog('setTitle','비밀번호 변경');
				$('#passFrm').form('clear');
				$('#passFrm').form('load', {
					dlg_usrNo : row.usrNo
				});
			});

			/**************************************************************
		     * "비밀번호 저장" 클릭시
		     **************************************************************/
			$('#btnModifyPass').click(function(e) {
				AD1002MV.changePass();
			});
		},
		search: function() {
		    var dosgDtObj = $("#dosgDt");
		    if( $isEmpty( dosgDtObj.val() )) {
		        alert("복용일자 입력 후 검색버튼을 클릭해 주세요.");
		        dosgDtObj.focus();
		        return;
		    }
			var queryParams = $("#dg").datagrid('options').queryParams;
			queryParams.dosgDt 		= $("#dosgDt").val();
			queryParams.picUsrNo 	= $("#picUsrNo").val();
			queryParams.pic2UsrNo 	= $("#pic2UsrNo").val();
			queryParams.pausYn 		= $("#pausYn").val();
			
			
			
			$('#dg').datagrid('load', '/api/v1/main/customer/findCustomerByDosgDt');		
		},
		saveUser: function() {
			var usrNo 	 = $('#userFrm input[name=dlg_usrNo]').val();
			var formData = {
				criteria: {
					"usrNo" 	: usrNo,
					"usrEml" 	: $('#userFrm input[textboxName=dlg_usrEml]').textbox('getValue'),
					"usrPwd" 	: $('#userFrm input[textboxName=dlg_usrPwd]').passwordbox('getValue'),
					"usrNm" 	: $('#userFrm input[textboxName=dlg_usrNm]').textbox('getValue'),
					"usrPhnNo" 	: $('#userFrm input[textboxName=dlg_usrPhnNo]').textbox('getValue'),
					"usrGrade" 	: $('#userFrm select[textboxName=dlg_usrGrade]').combobox('getValue'),
					"usrAuth" 	: $('#userFrm select[textboxName=dlg_usrAuth]').combobox('getValue'),
					"usrAprv" 	: $('#userFrm select[textboxName=dlg_usrAprv]').combobox('getValue'),
					"delYn" 	: $('#userFrm select[textboxName=dlg_delYn]').combobox('getValue')
				}
			}
			
			$.messager.confirm('Confirm', '사용자 정보를 저장하겠습니까?', function(r) {
				if (!r) return;
				
				$.ajax({
					url: (usrNo === '') ? '/admin/addAdmin' : '/admin/modifyAdmin',
					method: 'post',
					contentType: 'application/json',
					dataType: 'json',
					data: JSON.stringify(formData),
					success: function(res) {
						if (res.status === 'success') {
							$.messager.show({ title: '관리자 저장', msg: res.message });
							AD1002MV.search();
							$('#userDlg').dialog('close');
						} else {
							$.messager.alert('관리자 저장', res.message);
							return;
						}
					},
					error: function(xhr, status, error) {
						$.messager.alert('관리자 저장', xhr.responseJSON.message, 'error');
					}
				});
		   	});
		},
		changePass: function() {
			var dlg_usrPwd = $('#passFrm input[textboxName=dlg_usrPwd]').textbox('getValue');
			var dlg_usrPwdCfm = $('#passFrm input[textboxName=dlg_usrPwdCfm]').textbox('getValue');
			if (dlg_usrPwd !== dlg_usrPwdCfm) {
				$.messager.alert('비밀번호 변경','비밀번호가 일치하지 않습니다');
				return;
			}
			var formData = {
				criteria: {
					usrNo : $('#passFrm input[name=dlg_usrNo]').val(),
					usrPwd : dlg_usrPwd,
					usrPwdCfm : dlg_usrPwdCfm
				}
			};
						
			$.messager.confirm('Confirm', '비밀번호를 변경하시겠습니까?', function(r) {
				if (!r) return;
				
				$.ajax({
					url: '/admin/modifyAdminPwd',
					method: 'post',
					contentType: 'application/json',
					dataType: 'json',
					data: JSON.stringify(formData),
					success: function(res) {
						if (res.status === 'success') {
							$.messager.show({ title: '비밀번호 변경', msg: res.message });
							AD1002MV.search();
							$('#passDlg').dialog('close');
						} else {
							$.messager.alert('비밀번호 변경', res.message);
							return;
						}
					},
					error: function(xhr, status, error) {
						$.messager.alert('비밀번호 변경', xhr.responseJSON.message, 'error');
					}
				});
		   	});
		},
		removeUser: function() {
			var row = $('#dg').datagrid('getSelected');
			if (!row) {
				$.messager.alert('관리자 삭제', '관리자 목록에서 삭제할 항목을 선택하세요.');
				return false;
			}
			
			var formData = {
				criteria: {
					"usrNo": 	row.usrNo
				}
			} 
			$.messager.confirm('Confirm', '사용자를 삭제하겠습니까?', function(r) {
				if (!r) return;
				
				$.ajax({
					url: '/admin/removeAdmin',
					method: 'post',
					contentType: 'application/json',
					dataType: 'json',
					data: JSON.stringify(formData),
					success: function(res) {
						if (res.status === 'success') {
							$.messager.show({ title: '관리자 삭제', msg: res.message });
							AD1002MV.search();
						} else {
							$.messager.alert('관리자 삭제', res.message);
							return;
						}
					},
					error: function(xhr, status, error) {
						$.messager.alert('관리자 삭제', xhr.responseJSON.message, 'error');
					}
				});
		   	});
		}
	};
	
	AD1002MV.init();
	AD1002MV.search();
});
