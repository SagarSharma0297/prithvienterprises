$(document).ready(function () {
    $('#login-form').submit(function (e) {
        e.preventDefault();
        var data = {
            "username": e.target.username.value,
            "password": e.target.password.value
        }
        $.ajax({
            type: "POST",
            url:"./api/login",
            data: data,
            success: function(role){
                window.sessionStorage.setItem('role',role)
                window.sessionStorage.setItem('loggedIn','true')
                window.sessionStorage.setItem('username',data.username)
                window.location.href = './main'
            },
            error: function(error){
                alert('Wrong Credentials')
            },
          });
    });


});