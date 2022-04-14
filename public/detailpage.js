$(document).ready(function(){
    if(window.sessionStorage.getItem('loggedIn') !== 'true' ){
        window.location.href = '/';
    }
    $('#logout-button').click(function(){
        window.sessionStorage.clear();
        window.localStorage.clear();
        window.location.href = '/';
    })
    $('#go-back').click(function(){
        window.location.href = '/main'
    })
    $.ajax({
        type: "get",
        url:"./api/getvaluebylan",
        data: {role:window.sessionStorage.getItem('role'),
                searchVal:localStorage.getItem('searchVal')
            },
        success: function(data){
           console.log(data);
           $('#inner-wrapper').empty();
                   $('#inner-wrapper').append(
                       `
                       <div><span>REGISTRATION NO</span>:<span>${data[0].REGISTRATION}</span><br></div>
                       <div><span>LAN</span>:<span>${data[0].LAN}</span><br></div>
                       <div> <span>CUSTOMER_NAME</span>:<span>${data[0].CUSTOMER_NAME}</span><br></div>
                       <div> <span>ASSET_MODEL</span>:<span>${data[0].ASSET_MODEL}</span><br></div>
                       <div> <span>VIN</span>:<span>${data[0].VIN}</span><br></div>
                       <div><span>ENGINE</span>:<span>${data[0].ENGINE}</span><br></div>
                       <div> <span>ADDRESS</span>:<span>${data[0].ADDRESS}</span><br></div>
                       <div> <span>LOCATION</span>:<span>${data[0].LOCATION}</span><br></div>
                       <div> <span>STATE</span>:<span>${data[0].STATE}</span><br></div>
                       `
                   )
        },
        error: function(){
            
        },
      });
    // $.get(`http://localhost:9000/api/getvaluebylan?searchVal=${localStorage.getItem('searchVal')}`,function(data,status){
    //     console.log(data);
    //     if(status === "success"){
    //         $('#inner-wrapper').empty();
    //         $('#inner-wrapper').append(
    //             `
    //             <div><span>REGISTRATION NO</span>:<span>${data[0].REGISTRATION}</span><br></div>
    //             <div><span>LAN</span>:<span>${data[0].LAN}</span><br></div>
    //             <div> <span>CUSTOMER_NAME</span>:<span>${data[0].CUSTOMER_NAME}</span><br></div>
    //             <div> <span>ASSET_MODEL</span>:<span>${data[0].ASSET_MODEL}</span><br></div>
    //             <div> <span>VIN</span>:<span>${data[0].VIN}</span><br></div>
    //             <div><span>ENGINE</span>:<span>${data[0].ENGINE}</span><br></div>
    //             <div> <span>ADDRESS</span>:<span>${data[0].ADDRESS}</span><br></div>
    //             <div> <span>LOCATION</span>:<span>${data[0].LOCATION}</span><br></div>
    //             <div> <span>STATE</span>:<span>${data[0].STATE}</span><br></div>
    //             `
    //         )
    //     }
    // })
})