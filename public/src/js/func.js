
    document.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      if (username.length > 0 && password.length > 0) {
        var myHeaders = new Headers();
        myHeaders.append("apikey", "JpywR23@W8");

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          redirect: 'follow'
        };

        fetch("https://apis.paysolutions.asia/auth/admin/login/?pass=" + password + "&user=" + username, requestOptions)
          .then(response => response.text())
          .then(result => checkLogin(result, username))
          .catch(error => errorLogin());
      }
    });
    function checkLogin(data, username) {
      const obj = JSON.parse(data);
      console.log("Login ==> " + obj.result)
      if (obj.message != "fail" && obj.result != false) {
        var myHeaders = new Headers();
        myHeaders.append("apikey", "JpywR23@W8");

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        fetch("https://apis.paysolutions.asia/auth/users/search/findByUserName/?userName=" + username, requestOptions)
          .then(response => response.text())
          .then(result => checkMerchant(result)) //console.log(result)
          .catch(error => errorLogin());
      } else {
        errorLogin()
      }
    }
    function checkMerchant(data) {
      const obj = JSON.parse(data);
      if(obj.merchantId != null && obj.merchantId > 0) {
          window.localStorage.setItem('mid', obj.merchantId)
          window.location.href = '/dashboard.html';
      }
    }

    function errorLogin() {
      const modal = document.getElementById("modal-one");
      modal.classList.add("open");
      modal.classList.add("modal-show");
    }

    document.addEventListener('click', function (event) {
      if (!event.target.matches('.modal-exit')) return;
      const modal = document.getElementById("modal-one");
      modal.classList.remove("open");
      modal.classList.remove("modal-show");
    }, false);

    function checkUser() {
        merchantid = window.localStorage.getItem('mid')
        if (merchantid == null) {
            window.location.href = '/index.html';
        }else{
            window.location.href = '/dashboard.html';
        }
    }

    checkUser();