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

function doMergeCells(dg, rows, col) {
	var merges = [];
	var k = 0;
	while (k < rows.length) {
		var c = 0;
		for (var l = k; l < rows.length; l++) {
			var obj = rows[k];
			var obj2 = rows[l];
			if (obj[col] === obj2[col])
				c++;
		}
		merges.push({ index: k, rowspan: c });
		k += c;
	}
	
	for (var i = 0; i < merges.length; i++) {
		dg.datagrid('mergeCells', {
			index: merges[i].index,
			field: col,
			rowspan: merges[i].rowspan
		});
	}
}

$(document).ready(function() {
	var SMS3 = {
		selectedIndex: -1,
		
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
		        onLoadSuccess: function(data) {
		        	doMergeCells($(this), data.rows, 'dosgTpCd');
		        	doMergeCells($(this), data.rows, 'dosgLvCd');
		        	doMergeCells($(this), data.rows, 'dosgSeq');
		        	
		        	// 선택행 처리
		        	if (data.rows.length === 0) {
		        		$('#dosgSmsFrm').form('reset');
		        	} else {
			        	if (SMS3.selectedIndex > 0)
			        		$(this).datagrid('selectRow', SMS3.selectedIndex);
			        	else
			        		$(this).datagrid('selectRow', 0);
		        	}
		        },
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
		        	
		        	SMS3.selectedIndex = index;
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
		        			return '<span style="font-weight:bold;">'+ row.dosgLvCdNm +'</span>';
		        		}
		        	},
		            {field: 'dosgSeq'    , title: '복용일차'    , align: 'center', width: '70',
		                formatter: function(value, row, index) {
		                	return value === 0 ? '시작전날' : value +' 일차';
		                }
		            },
		            {field: 'sendHhmi'    	, title: '발송시간' 	, align: 'center', width: '70'},
		            {field: 'smsTitle'    	, title: '제목' 		, align: 'center', width: '200'},
		            {field: 'smsContent'    , title: '내용'    	, align: 'center', width: '500'}
		        ]]
			});
		
			/**************************************************************
		     * "검색" 버튼 클릭시
		     **************************************************************/
			$('#btnSearch').click(function(e) {
				SMS3.search();
			});

			/**************************************************************
		     * "삭제 버튼" 클릭시
		     **************************************************************/
			$('#btnRemove').click(function(e) {
				var row = $('#dg').datagrid('getSelected');
				if (!row) {
					$.messager.alert('발송문자 삭제', '복용유형 목록에서 삭제할 항목을 선택하세요.');
					return false;
				}
			
				SMS3.removeDosgTpSms();
			});

			/**************************************************************
		     * "신규등록" 버튼 클릭시
		     **************************************************************/
			$('#btnAdd').click(function(e) {
				var row = $('#dg').datagrid('getSelected');
				if (!row) {
					$.messager.alert('발송문자 등록', '복용유형 목록에서 등록할 항목을 선택하세요.');
					return false;
				}
				
				SMS3.addDosgTpSms();
			});

			/**************************************************************
		     * "정보저장" 버튼 클릭시
		     **************************************************************/
			$('#btnModify').click(function(e) {
				var row = $('#dg').datagrid('getSelected');
				if (!row) {
					$.messager.alert('발송문자 수정', '복용유형 목록에서 편집할 항목을 선택하세요.');
					return false;
				}

				SMS3.modifyDosgTpSms();
			});
		},
		search: function() {
			var queryParams = $("#dg").datagrid('options').queryParams;
			queryParams.dosgTpCd 	= $("#dosgTpCd").val();
			
			$('#dg').datagrid('load', '/api/v1/sms/dosgTpList');		
		},
		addDosgTpSms: function() {
			var smsId 	 = $('#dosgSmsFrm input[name=smsId]').val();
			var formData = {
				criteria: {
					"smsId" 		: smsId,
					"dosgTpCd" 		: $('#dosgSmsFrm input[name=dosgTpCd]').val(),
					"dosgSeq" 		: $('#dosgSmsFrm input[name=dosgSeq]').val(),
					"sendHhmi" 		: $('#dosgSmsFrm input[textboxName=sendHhmi]').timespinner('getValue'),
					"smsTitle" 		: $('#dosgSmsFrm input[textboxName=smsTitle]').textbox('getValue'),
					"smsContent" 	: $('#dosgSmsFrm input[textboxName=smsContent]').textbox('getValue')
				}
			}
			
			$.messager.confirm('Confirm', '복용유형 발송문자를 생성하시겠습니까?', function(r) {
				if (!r) return;
				
				$.ajax({
					url: '/api/v1/sms/addDosgTpSms',
					method: 'post',
					contentType: 'application/json',
					dataType: 'json',
					data: JSON.stringify(formData),
					success: function(res) {
						if (res.status === 'success') {
							$.messager.show({ title: '발송문자 등록', msg: res.message });
							SMS3.search();
						} else {
							$.messager.alert('발송문자 등록', res.message);
							return;
						}
					},
					error: function(xhr, status, error) {
						$.messager.alert('발송문자 등록', xhr.responseJSON.message, 'error');
					}
				});
		   	});
		},
		modifyDosgTpSms: function() {
			var smsId 	 = $('#dosgSmsFrm input[name=smsId]').val();
			var formData = {
				criteria: {
					"smsId" 		: smsId,
					"dosgTpCd" 		: $('#dosgSmsFrm input[name=dosgTpCd]').val(),
					"dosgSeq" 		: $('#dosgSmsFrm input[name=dosgSeq]').val(),
					"sendHhmi" 		: $('#dosgSmsFrm input[textboxName=sendHhmi]').timespinner('getValue'),
					"smsTitle" 		: $('#dosgSmsFrm input[textboxName=smsTitle]').textbox('getValue'),
					"smsContent" 	: $('#dosgSmsFrm input[textboxName=smsContent]').textbox('getValue')
				}
			}
			
			$.messager.confirm('Confirm', '복용유형 발송문자를 저장하시겠습니까?', function(r) {
				if (!r) return;
				
				$.ajax({
					url: '/api/v1/sms/modifyDosgTpSms',
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
		removeDosgTpSms: function() {
			var smsId 	 = $('#dosgSmsFrm input[name=smsId]').val();
			var formData = {
				criteria: {
					"smsId": 	smsId
				}
			} 
			$.messager.confirm('Confirm', '복용유형 발송문자를 삭제하겠습니까?', function(r) {
				if (!r) return;
				
				$.ajax({
					url: '/api/v1/sms/removeDosgTpSms',
					method: 'post',
					contentType: 'application/json',
					dataType: 'json',
					data: JSON.stringify(formData),
					success: function(res) {
						if (res.status === 'success') {
							$.messager.show({ title: '발송문자 삭제', msg: res.message });
							SMS3.search();
						} else {
							$.messager.alert('발송문자 삭제', res.message);
							return;
						}
					},
					error: function(xhr, status, error) {
						$.messager.alert('발송문자 삭제', xhr.responseJSON.message, 'error');
					}
				});
		   	});
		}
	};
	
	SMS3.init();
	SMS3.search();
});
