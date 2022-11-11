
var address = fetch("./API/db.json")
  .then(function (response) { return response.json()}).then(function(data) {
    console.log(data.user[0].name);
    for (var i = 0; i < data.length; i++) {
        
        document.querySelector('tbody').innerHTML += `
        <tr>
            <td><input type="text" id="name" value="${data.user[i].name}" class="outline"></td>
            <td><input type="text" id="last" value="${data.user[i].last}" class="outline"></td>
            <td><input type="tel" id="tel" value="${data.user[i].Contact}" class="outline"></td>
            <td>
                <button class="btn btn-outline-primary">Edit</button>
                <button class="btn btn-outline-success d-none">Save</button>
                <button class="btn btn-outline-danger">Delete</button>
            </td>
        </tr>
        `;
    }
}).catch(function (e) {
    console.log(e);
})
