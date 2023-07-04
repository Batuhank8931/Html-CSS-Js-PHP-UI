
'use strict';

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var jsonString = xhr.responseText; 
    var jsonObject = JSON.parse(jsonString); 
    var n = Object.keys(jsonObject).length;

    var table = document.getElementById("myTable");
    for (var i = 0; i < n; i++) {

        var newRow = table.insertRow();

        newRow.id = i+"row";
      
        var cell1 = newRow.insertCell();
        var cell2 = newRow.insertCell();
        var cell3 = newRow.insertCell();
        var cell4 = newRow.insertCell();

        cell1.innerHTML = (i + 1);
        cell2.innerHTML = (jsonObject[(i + 1)]["Username"]);
        cell3.innerHTML = (jsonObject[(i + 1)]["Email"]);
        cell4.innerHTML = (jsonObject[(i + 1)]["Enabled"]);
    }


  }
};

xhr.open('GET', 'load.php', true);
xhr.send();


var button1 = document.getElementById('showButton');
var button2 = document.getElementById('hideButton');
var button3 = document.getElementById('saveButton');
var button4 = document.getElementById('EnabledButton');
var hiddenDiv = document.getElementById('hiddenDiv');
var buttons = document.querySelectorAll('.tablebutton');

var checkbox = document.getElementById('hideCheckbox');

button1.addEventListener('click', function() {
    hiddenDiv.style.display = 'block';
    button3.disabled = false;
    button1.disabled= true;
});


button2.addEventListener('click', function() {
    hiddenDiv.style.display = 'none';
    button3.disabled = true;
    button1.disabled= false;
});

button3.addEventListener('click', function() {
    var Username= document.getElementById('Username').value;
    var Displayname= document.getElementById('Displayname').value;
    var Phone= document.getElementById('Phone').value;
    var Email= document.getElementById('Email').value;
    var Userrole= document.getElementById('Userrole').value;
    var Enabled= document.getElementById('Enabled');
    var EnabledValue = Enabled.checked;

    if(Username ==""||
        Displayname==""||
        Phone==""||
        Email==""||
        Userrole==""
    ){
        var favDialogfill = document.getElementById("favDialog");
        var model1 =document.getElementById("model1")
        var model2 =document.getElementById("model2")
        
        favDialogfill.showModal();
        model1.textContent="Please Complete"
        model2.textContent="New User Form"

        
    }else{

        var xhr = new XMLHttpRequest();

        var params = 'Usernamephp=' + encodeURIComponent(Username) +
        '&Displaynamephp=' + encodeURIComponent(Displayname) +
        '&Phonephp=' + encodeURIComponent(Phone)+
        '&Emailphp=' + encodeURIComponent(Email)+
        '&Userrolephp=' + encodeURIComponent(Userrole)+
        '&Enabledphp=' + encodeURIComponent(EnabledValue);
       
        xhr.open("POST", "save.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var favDialog = document.getElementById("favDialog");
                var model1 =document.getElementById("model1")
                var model2 =document.getElementById("model2")
                
                var table = document.getElementById("myTable");
                var rowCount = table.rows.length;
                var rows = table.getElementsByTagName('tr');



                var newRow = table.insertRow();

                newRow.id = (rowCount-1)+"row";
      
                var cell1 = newRow.insertCell();
                var cell2 = newRow.insertCell();
                var cell3 = newRow.insertCell();
                var cell4 = newRow.insertCell();


                cell1.innerHTML = (rowCount);
                cell2.innerHTML = (Username);
                cell3.innerHTML = (Email);
                cell4.innerHTML = (EnabledValue);
               
                favDialog.showModal();
                model1.textContent="New User"
                model2.textContent="Saved Succesfully"
            }
        };

        xhr.send(params);


        var inputElements = document.getElementsByClassName("inputline");
        for (var i = 0; i < inputElements.length; i++) {
            inputElements[i].value = "";
        }    
        document.getElementsByClassName("inputline1")[0].selectedIndex = 0;
        hiddenDiv.style.display = 'none';
        button3.disabled = true;
        button1.disabled= false;
        
    }
    
});


buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        var value = button.value;

        if (value!=0){
            var table = document.getElementById('myTable');
            var rowsarray = Array.from(table.getElementsByTagName('tr'));


            var sortedRows = rowsarray.slice(1);

            sortedRows.sort(function(a, b) {
                var textA = a.cells[value].textContent.trim().toLowerCase();
                var textB = b.cells[value].textContent.trim().toLowerCase();
                if (textA < textB) return -1;
                if (textA > textB) return 1;
                return 0;
            });
    

            for (var i = 0; i < sortedRows.length; i++) {
                table.appendChild(sortedRows[i]);
            }
        }else if(value==0){
            var table = document.getElementById('myTable');
            var rowsarray = Array.from(table.getElementsByTagName('tr'));
    
            var sortedRows = rowsarray.slice(1);
                
            sortedRows.sort(function(a, b) {
                var numA = parseInt(a.cells[0].textContent.trim());
                var numB = parseInt(b.cells[0].textContent.trim());
                return numA - numB;
              });
        
    
            for (var i = 0; i < sortedRows.length; i++) {
                table.appendChild(sortedRows[i]);
            }

        }
    });
  });
  

  function deleteRow(rowid)  
  {   
      var row = document.getElementById(rowid);
      row.parentNode.removeChild(row);
  }


checkbox.addEventListener('change', function() {
    var table = document.getElementById('myTable');
    var rowsarray = Array.from(table.getElementsByTagName('tr'));
    var sortedRows = rowsarray.slice(1);

    if (checkbox.checked) {
        var no =1; 
        for (var i = 0; i < sortedRows.length; i++) {
            var line = sortedRows[i].cells[3].textContent.trim().toLowerCase();       
            var lineRemove = document.getElementById(i+"row"); 
            if (line == "false"){
                lineRemove.style.display="none";
            }else{
                var tdElement = lineRemove.querySelector("td:first-child");
                tdElement.textContent = no;
                no=no+1;                
            }
        }
        button4.disabled= true;

    } else {
        var no =1; 
        for (var i = 0; i < sortedRows.length; i++) {     
            var lineRemove = document.getElementById(i+"row"); 
            lineRemove.style.display="";
            var tdElement = lineRemove.querySelector("td:first-child");
            tdElement.textContent = no;
            no=no+1;           
        }
        button4.disabled= false;
    }


});














