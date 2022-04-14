$(document).ready(function(){
    if(window.sessionStorage.getItem('loggedIn') !== 'true' ){
        window.location.href = '/';
    }
    $('#logout-button').click(function(){
        window.sessionStorage.clear();
        window.localStorage.clear();
        window.location.href = '/';
    })

    function createRow(data){
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.innerHTML = data.REGISTRATION;
        td.onclick = function() {
            console.log(data.REGISTRATION);
            window.location.href = `./detailpage`;
            window.localStorage.setItem('searchVal',data.LAN)
        }
        tr.appendChild(td)
        return tr;
    }

    var vehicleData = [];
    $.get('./api/getdata',function(data,status){
        if(status === "success"){
            vehicleData = data;
            vehicleData?.map(item => {
                if(item.REGISTRATION !== ''){
                    $('#vehicle-table').append(
                        // `<tr>
                        // <td class="number-button" onClick = function()>${item.REGISTRATION}</td>
                        // </tr>`
                        createRow(item)
                    )
                    // document.getElementById('#vehicle-table').appendChild(createRow(item))             
                }
               
            })
        } 
    });
 
    $('#search-button').click(function(e){
        e.preventDefault();
        $('#vehicle-table').empty();
        $.get(`./api/getdetaildata?searchvalue=${document.getElementById('search-box').value}`,function(data,status){
            if(status === "success"){

                vehicleData = data;
                vehicleData?.map(item => {
                    if(item.REGISTRATION !== ''){
                        $('#vehicle-table').append(
                            // `
                            // // <tr>
                            // // <td class="number-button">${item.REGISTRATION}</td>
                            // // </tr>`
                            createRow(item)
                        )
                    }
                })
            }
        })
    })
});