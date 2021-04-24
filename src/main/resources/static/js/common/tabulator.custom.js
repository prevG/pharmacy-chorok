//Create Date Editor
var dateEditor = function(cell, onRendered, success, cancel) {
    let cellValue = moment(cell.getValue(), "YYYY-MM-DD").format("YYYY-MM-DD"),
    input = document.createElement("input");
    input.setAttribute("type", "date");
    input.style.padding = "4px";
    input.style.width = "100%";
    input.style.boxSizing = "border-box";
    input.value = cellValue;
    onRendered(function(){
        input.focus();
        input.style.height = "100%";
    });
    function onChange() {
        if (input.value != cellValue) {
            success(moment(input.value, "YYYY-MM-DD").format("YYYY-MM-DD"));
        } else {
            cancel();
        }
    }
    input.addEventListener("blur", onChange);
    input.addEventListener("keydown", function(e) {
        if (13==e.keyCode) onChange();
        if (27==e.keyCode) cancel();
    });
    return input;
};

//Tabulator column 설정 부분에서 아래와 같이 설정하면, edited 되서 값이 바뀌면 셀 색이 grey color 로 바뀝니다.
//향후 색 변경 가능성 있음. 
//cellEdited:function(cell){ displayEdited(cell)}}   
function displayEdited(cell){
    if(cell.getValue() != cell.getInitialValue()){
      cell.getElement().style.backgroundColor = "#DCDCDC";
      }
  }



//tabulator Grid상에서 사용자가 editing 하지 않고, 시스템이 값을 바꾸는 경우
//param table : table  = object
//row : row Component = object
//column : column name = String
//value : 바꿀 값  = 보통 String 이겠죠..?
function setCellValueAndMarkEdited(table, row, columnNm,value){
    let columnTarget = row.getCell(columnNm);
    //set Value
    columnTarget.setValue(value);
    // mark as edited
    columnTarget._cell.modules.edit ={edited:true}  
    table.modules.edit.editedCells.push(columnTarget._cell); 
}