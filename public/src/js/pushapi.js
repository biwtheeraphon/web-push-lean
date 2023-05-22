let enableNotificationsButtons = document.querySelectorAll('.enable-notifications');
if (!window.Promise) {
    window.Promise = Promise;
  }


function displayConfirmNotification() {
    let options = {
        body: "Refno : 202305221452 , จำนวนเงิน 100 บาท",
        icon: 'src/images/icon_payso.png',
        image: 'src/images/icon_payso.png',
    };
    new Notification("ยืนยันการชำระเงิน", options);
  }
  
  function askForNotificationPermission() {
    Notification.requestPermission(function (result) {
      console.log("User Choice", result);
      if (result !== "granted") {
        console.log("No notification permission granted!");
      } else {
        alert("Notification permission", result);
        displayConfirmNotification();
      }
    });
  }
  
  if ("Notification" in window) {
    for (var i = 0; i < enableNotificationsButtons.length; i++) {
      enableNotificationsButtons[i].style.display = "inline-block";
      enableNotificationsButtons[i].addEventListener(
        "click",
        askForNotificationPermission
      );
    }
  }