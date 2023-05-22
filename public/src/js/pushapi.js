let enableNotificationsButtons = document.querySelectorAll('.enable-notifications');
if (!window.Promise) {
    window.Promise = Promise;
  }


function displayConfirmNotification(message) {
  
    let options = {
        body: `Refno : 202305221452 , จำนวนเงิน 100 บาท`,
        icon: 'src/images/icon_payso.png',
        image: 'src/images/icon_payso.png',
    };

    navigator.serviceWorker.getRegistration().then(
       reg => {
        reg.showNotification(`ยืนยันการชำระเงินของ MID: ${message}`, options);
          self.addEventListener('notificationclick', function (event) {
              event.notification.close();
              clients.openWindow("https://https://paysolutions.asia");
            });
      })
  }
  
  function askForNotificationPermission() {
    Notification.requestPermission(function (result) {
      if (result !== "granted") {
        console.log("No notification permission granted!");
      } else {
        displayConfirmNotification("Check");
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

  