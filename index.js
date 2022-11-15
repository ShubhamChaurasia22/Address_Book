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
                        <td value="${items.id}"><input type="text" id="name name-${items.id}" value="${items.name}" class="outline" disabled></td>
                        <td><input type="text" id="last" value="${items.last}" class="outline" disabled></td>
                        <td><input type="tel" id="tel" value="${items.Contact}" class="outline" disabled></td>
                        <td>
                            <button id="edit" class="btn btn-outline-primary" value="${items.id}">Edit</button>
                            <button id="save" class="btn btn-outline-success d-none" value="${items.id}">Save</button>
                            <button id="del" class="btn btn-outline-danger" value="${items.id}">Delete</button>
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

// function deleteData() {
//     $.ajax({
//         url: 'http://localhost:3000/user',
//         type: 'DELETE',
//         dataType: 'json'
//     })
//     .done(function (response) {
//         $.getJSON("./API/db.json", function(posts) {
//             console.log(`${posts}`);
//         });
        
//     })
//     .fail(function (e) {
//         console.log(e);
//     })
// }

$(document).on('click', '#del', function () {
    var url = 'http://localhost:3000/user/delete';
    var getID = $(this).val();

    $.ajax({
        url: url,
        type: 'DELETE',
        dataType: 'json',
        success: function (data) {
            url = url + '/' + getID;
            console.log(url);
        }
    })
})

$(document).on('click', '#add', function () {
    var url = 'http://localhost:3000/user';

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            console.log(SuccessMessage);
        },
        error : function () {
            console.log("Fail Add button");
        }
    })
})

$(document).on('click', '#edit', function () {

    $('#edit').addClass('d-none');
    $('#save').removeClass('d-none');
    $('input').prop('disabled', false);
    
})

$(document).on('click', '#save', function () {
    $('#save').addClass('d-none');
    $('#edit').removeClass('d-none');
    $('input').prop('disabled', false);
    
})