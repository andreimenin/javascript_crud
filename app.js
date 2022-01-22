var selectedRow = null;
function onFormSubmit(e){
    event.preventDefault();
    var formData = readFormData();
    
    var nome = formData["name"] = document.getElementById("name"). value;
    if(nome==''){
        alert("Preencha o campo 'Nome'"); 
    }
    else{
        if(selectedRow === null){
            if(!contemNome(nome)){
                insertNewRecord(formData);     
            }
        }
        else{
            updateRecord(formData);    
        } 
        resetForm(); 
        sortTableAsc();
    }
}       


//Retrieve the data
function readFormData(){
    var formData = {};
    formData["name"] = document.getElementById("name"). value;
    formData["age"] = document.getElementById("age"). value;    
    return formData;
}


//Insert the date
function insertNewRecord(data){
    var table = document.getElementById("peopleList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    var cell1 = newRow.insertCell(0);
        cell1.className = "cellText";
        cell1.innerHTML = data.name;
    var cell2 = newRow.insertCell(1);
        cell2.className = "cellText";
        cell2.innerHTML = data.age;
    var cell3 = newRow.insertCell(2);
        cell3.className = "width140";
        cell3.innerHTML = `<button onClick='onEdit(this)'>Alterar</button> <button onClick='onDelete(this)'>Excluir</button>`

}

//Edit the data
function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById('name').value = selectedRow.cells[0].innerHTML;
    document.getElementById('age').value = selectedRow.cells[1].innerHTML;    
}

function updateRecord(formData){
    selectedRow.cells[0].innerHTML = formData.name;
    selectedRow.cells[1].innerHTML = formData.age;    
}

//Delete the data
function onDelete(td){
    if(confirm('Deseja apagar esta linha?')){
        row = td.parentElement.parentElement;
        document.getElementById('peopleList').deleteRow(row.rowIndex);
    }    
    resetForm();
}

//Reset the data
function resetForm(){
    document.getElementById('name').value = '';
    document.getElementById('age').value = '0'; 
    selectedRow = null;   
}


function contemNome(nome){
    var contemNome = false;
    // var nome = formData["name"] = document.getElementById("name"). value;
    
    var table = document.getElementById("peopleList");
        for (var i = 1, row; row = table.rows[i]; i++) {            
        if(row.cells[0].innerHTML===nome){
            contemNome = true;
        }    
    }
    if(contemNome){
        alert("O nome '" +nome+  "' já está em uso"); 
    }
    return contemNome;
}

function sortTable(table, col, reverse) {
    var tb = table.tBodies[0], // use `<tbody>` to ignore `<thead>` and `<tfoot>` rows
        tr = Array.prototype.slice.call(tb.rows, 0), // put rows into array
        i;
    reverse = -((+reverse) || -1);
    tr = tr.sort(function (a, b) { // sort rows
        return reverse // `-1 *` if want opposite order
            * (a.cells[col].textContent.trim() // using `.textContent.trim()` for test
                .localeCompare(b.cells[col].textContent.trim())
               );
    });
    for(i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // append each row in order
}

// function makeSortable(table) {
//     var th = table.tHead, i;
//     th && (th = th.rows[0]) && (th = th.cells);
//     if (th) i = th.length;
//     else return; // if no `<thead>` then do nothing
//     while (--i >= 0) (function (i) {
//         var dir = 1;
//         th[i].addEventListener('click', function () {sortTable(table, i, (dir = 1 - dir))});
//     }(i));
// }

function makeSortable(table) {
    var th = table.tHead, i;
    th && (th = th.rows[0]) && (th = th.cells);
    if (th) i = 1;
    else return; // if no `<thead>` then do nothing
    while (--i >= 0) (function (i) {
        var dir = 1;
        th[1].addEventListener('click', function () {sortTable(table, i, (dir = 1 - dir))});
    }(i));
}

function makeAllSortable(parent) {
    parent = parent || document.body;
    var t = parent.getElementsByTagName('table'), i = t.length;
    while (--i >= 0) makeSortable(t[i]);
}


function sortTableAsc() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("peopleList");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[1];
        y = rows[i + 1].getElementsByTagName("TD")[1];
        // Check if the two rows should switch place:
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }


window.onload = function () {
    makeAllSortable();
    resetForm();
};