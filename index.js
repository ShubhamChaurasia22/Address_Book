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
                        <td><input type="text" id="name-${items.id}" value="${items.name}" name="update_name" class="outline" required /></td>
                        <td><input type="text" id="last-${items.id}" value="${items.last}" name="update_last" class="outline" required /></td>
                        <td><input type="tel" id="tel-${items.id}" value="${items.Contact}" name="update_contact" class="outline" required /></td>
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
    var update_name = $('#name-'+id).val();
    var update_last = $('#last-'+id).val();
    var update_contact = $('#tel-'+id).val(); 

    var regex_update_name = new RegExp("^[a-zA-Z]*$").test(update_name);
    var regex_update_last = new RegExp("^[a-zA-Z]*$").test(update_last);
    var regex_update_contact = new RegExp("^[6-9]{1}[0-9]{9}$").test(update_contact);

    if(update_name.length > 0 && update_last.length > 0 && update_contact.length > 0) {
        if(regex_update_name && regex_update_last && regex_update_contact) {
            data.name = update_name;
            data.last = update_last;
            data.Contact =update_contact;

            var dataObj = JSON.stringify(data);
            updateForm();
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
        } else {
            alert("Fill Right Information");
        }
    }else {
        alert("Fill the Information");
    }
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
    var name = $('#form_name').val();
    var last = $('#form_last').val();
    var contact = $('#form_contact').val(); 

    data.name = name;
    data.last = last;
    data.Contact = contact;
    var dataObj = JSON.stringify(data);
    var regex_name = new RegExp("^[a-zA-Z]*$").test(name);
    var regex_last = new RegExp("^[a-zA-Z]*$").test(last);
    var regex_contact = new RegExp("^[6-9]{1}[0-9]{9}$").test(contact);
    if(name.length > 0 && last.length > 0 && contact.length > 0) {
        if(regex_name && regex_last && regex_contact) {
            $.ajax({
                url: "http://localhost:3000/user",
                method: "POST",
                data: dataObj,
                contentType: 'application/json; charset=utf-8',
                success: function(){
                    $('.address_popup').addClass('d-none');
                    alert("Successfull Added");
                },
                error: function (e) {
                    console.log(e);
                }
            });
        } else {
            alert("Fill Right Information");
        }
    }else {
        alert("Fill the Information");
    }
}

(function(){
    var $form = $('#form');
    if($form.length) {
        $form.validate({
            rules: {
                name: {
                    required: true,
                    maxlength: '15',
                },
                last: {
                    required: true,
                    maxlength: '15'
                },
                contact: {
                    number: true,
                    minlength: '10',
                    maxlength: '10',
                    required: true
                }
            },
            messages: {
                name: {
                    required: 'First name is required!'
                },
                last: {
                    required: 'Last name is required!'
                },
                contact: {
                    required: 'Contact is required!'
                }
            }
        })
    }
})();