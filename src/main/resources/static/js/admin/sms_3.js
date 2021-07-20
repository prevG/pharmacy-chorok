/******************************************************
 * 
 * SMS 관리 - SMS 등록 (sms_3)
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
	var SMS3 = {
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
		        		dosgTpCd 	: row.dosgTpCd,
		        		dosgSeq		: row.dosgSeq,
		        		dosgSeqNm 	: row.dosgSeq === 0 ? '시작전날' : row.dosgSeq +' 일차',
		        		dosgTpCdNm 	: row.dosgTpCdNm,
		        		dosgLvCdNm 	: row.dosgLvCdNm,
		        		smsId 		: row.smsId,
		        		sendHhmi 	: row.sendHhmi,
		        		smsTitle 	: row.smsTitle,
		        		smsContent 	: row.smsContent
		        	});
		        },
		        columns:[[
		        	{field: 'smsId'    	 , title: '복용문자번호' , align: 'center', width: '70', hidden: true},
		            {field: 'dosgTpCd'   , title: '복용유형', align: 'center', halign: 'center', width: '100',
		            	formatter: function(value, row, index) {
		        			return row.dosgTpCdNm;
		        		}
		            },
		        	{field: 'dosgLvCd' 	 , title: '복용단계', align: 'center', halign: 'center', width: '100',
		        		formatter: function(value, row, index) {
		        			return row.dosgLvCdNm;
		        		}
		        	},
		            {field: 'dosgSeq'    , title: '복용일차'    , align: 'center', width: '70',
		                formatter: function(value, row, index) {
		                	return value === 0 ? '시작전날' : value +' 일차';
		                }
		            },
		            {field: 'sendHhmi'    	, title: '발송시간' 	, align: 'center', width: '70'},
		            {field: 'smsTitle'    	, title: '제목' 		, align: 'center', width: '150'},
		            {field: 'smsContent'    , title: '내용'    	, align: 'center', width: '250'}
		        ]]
			});
		
			/**************************************************************
		     * "조회 버튼" 클릭시
		     **************************************************************/
			$('#btnSearch').click(function(e) {
				SMS3.search();
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
				SMS3.removeUser();
			});

			/**************************************************************
		     * "저장" 버튼 클릭시
		     **************************************************************/
			$('#btnSave111').click(function(e) {
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
		     * "저장" 버튼 클릭시
		     **************************************************************/
			$('#btnSave').click(function(e) {
				SMS3.saveDosgTpSms();
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
				SMS3.changePass();
			});
		},
		search: function() {
			var queryParams = $("#dg").datagrid('options').queryParams;
			queryParams.dosgTpCd 	= $("#dosgTpCd").val();
			
			$('#dg').datagrid('load', '/api/v1/sms/dosgTpList');		
		},
		saveDosgTpSms: function() {
			var smsId 	 = $('#dosgSmsFrm input[name=smsId]').val();
			var formData = {
				criteria: {
					"smsId" 		: smsId,
					"dosgTpCd" 		: $('#dosgSmsFrm input[name=dosgTpCd]').val(),
					"dosgSeq" 		: $('#dosgSmsFrm input[name=dosgSeq]').val(),
					"sendHhmi" 		: $('#dosgSmsFrm input[textboxName=sendHhmi]').textbox('getValue'),
					"smsTitle" 		: $('#dosgSmsFrm input[textboxName=smsTitle]').textbox('getValue'),
					"smsContent" 	: $('#dosgSmsFrm input[textboxName=smsContent]').textbox('getValue')
				}
			}
			
			$.messager.confirm('Confirm', '복용유형 발송문자를 저장하시겠습니까?', function(r) {
				if (!r) return;
				
				$.ajax({
					url: (Number(smsId) === 0) ? '/api/v1/sms/addDosgTpSms' : '/api/v1/sms/modifyDosgTpSms',
					method: 'post',
					contentType: 'application/json',
					dataType: 'json',
					data: JSON.stringify(formData),
					success: function(res) {
						if (res.status === 'success') {
							$.messager.show({ title: '발송문자 저장', msg: res.message });
							SMS3.search();
						} else {
							$.messager.alert('발송문자 저장', res.message);
							return;
						}
					},
					error: function(xhr, status, error) {
						$.messager.alert('발송문자 저장', xhr.responseJSON.message, 'error');
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
							SMS3.search();
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
							SMS3.search();
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
	
	SMS3.init();
	SMS3.search();
});
