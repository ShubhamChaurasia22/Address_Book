(function getData() {
    $.ajax({
        url: './API/db.json',
        type: 'GET',
        dataType: 'json'
    })
    .done(function (response) {
        $.getJSON("./API/db.json", function(posts) {
            posts.user.forEach(items => {
                document.querySelector('tbody').innerHTML += `
                    <tr>
                        <td><input type="text" id="name-${items.id}" value="${items.name}" class="outline"></td>
                        <td><input type="text" id="last-${items.id}" value="${items.last}" class="outline"></td>
                        <td><input type="tel" id="tel-${items.id}" value="${items.Contact}" class="outline"></td>
                        <td>
                            <button id="edit-${items.id}" class="button-click btn btn-outline-primary" onclick="editCol('${items.id}')">Edit</button>
                            <button id="save-${items.id}" class="button-click btn btn-outline-success d-none" onclick="updateCol('${items.id}')">Save</button>
                            <button class="button-click btn btn-outline-danger" onclick="deleteCol('${items.id}')" >Delete</button>
                        </td>
                    </tr>
                `;
            });
        });
    })
    .fail(function (e) {
        console.log(e);
    })
})();
    
function deleteCol(id) {
    $.ajax({
        url: 'http://localhost:3000/user/'+id,
        method: 'DELETE',
        success: function () {
            alert('record deleted');
            getData();
        },
        error: function () {
            alert('error deleting record');
        }

    })
}
    
function editCol(id) {
    var getID = id;
    $.ajax({
        url: 'http://localhost:3000/user/'+getID,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            $("#edit-"+getID).addClass('d-none');
            $('#save-'+getID).removeClass('d-none');
            $('#name-'+getID).removeClass('outline');
            $('#last-'+getID).removeClass('outline');
            $('#tel-'+getID).removeClass('outline');
            $('#name-'+getID).val(data.name);
            $('#last-'+getID).val(data.last);
            $('#tel-'+getID).val(data.Contact);
            getData();
        },
        error: function (e) {
            console.log(e);
        }
    })
}

function updateCol(id) {
    var data = {};
    data.name = $('#name-'+id).val();
    data.last = $('#last-'+id).val();
    data.Contact = $('#tel-'+id).val();

    var dataObj = JSON.stringify(data);
    $.ajax({
    url: "http://localhost:3000/user/"+id,
    method: "PUT",
    data: dataObj,
    contentType: 'application/json; charset=utf-8',
    success: function (){
        alert('Successfully updated');
    },
    error: function (e) {
        console.log(e);
    }
    })
    $("#save-"+id).addClass('d-none');
    $("#edit-"+id).removeClass('d-none');
    $('#name-'+id).addClass('outline');
    $('#last-'+id).addClass('outline');
    $('#tel-'+id).addClass('outline');
}

function addCol() {
    $.ajax({
        url: "./",
        success: function (){
            $('.address_popup').removeClass('d-none');
            $('.address_heading').addClass('blur_bg');
            $('.address_details').addClass('blur_bg');
            $('.button-click').attr("disabled", "disabled");
        },
        error: function (e) {
            console.log(e);
        }
    })
}

function cancelPopUp() {
    $.ajax({
        url: "./",
        success: function (){
            $('.address_popup').addClass('d-none');
            $('.address_heading').removeClass('blur_bg');
            $('.address_details').removeClass('blur_bg');
            $('.button-click').removeAttr('disabled');
        },
        error: function (e) {
            console.log(e);
        }
    })
}

function submitPopUp() {
    var data = {};
    data.name = $('#form_name').val();
    data.last = $('#forem_last').val();
    data.Contact = $('#form_tel').val(); 

    var dataObj = JSON.stringify(data);
    $.ajax({
        url: "http://localhost:3000/user/",
        method: "POST",
        data: dataObj,
        contentType: 'application/json; charset=utf-8',
        success: function (){
            $('.address_popup').addClass('d-none');
        },
        error: function (e) {
            console.log(e);
        }
        })
}