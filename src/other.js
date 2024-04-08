window.addEventListener("message", function (event) {
  const data = event.data;

  switch (data.type) {
    case "notification":
      // data.message & data.author
      // explaination: http://cdn.henrythehoover.vip/VpdUpzgt07jNp89
      break;
    case "updateLocation":
      // data.location
      // explaination: http://cdn.henrythehoover.vip/lUvJbpn1cgkE7yc
      break;
    case "updateJobInfo":
      // data.company & data.rank
      // explaination: http://cdn.henrythehoover.vip/S4dwkuXZ8okVS6R
      break;
    case "progressbar":
      // data.time (in ms) & data.text
      // explaination: http://cdn.henrythehoover.vip/NfQh2UoO7dtDhBo
      break;
    case "announcement":
      // data.message
      // explaination: http://cdn.henrythehoover.vip/IhbaRb24JqMgvH0
      break;
    case "updatePlayers":
      // data.online & data.id
      // explaination: http://cdn.henrythehoover.vip/N9D1rIppqd6tq3y
      break;
    case "updateWantedlevel":
      // data.level (max 6)
      // explaination: http://cdn.henrythehoover.vip/XBREzaHdbmle4cI
      break;
    case "updateMoney":
      // data.money
      // explaination: http://cdn.henrythehoover.vip/zAXNO4MnazA3K0V
      break;
    case "updateVoice":
      // data.key & data.range (max 3)
      // explaination: http://cdn.henrythehoover.vip/a9IaP14ceTscVsq
      break;
    case "toggleWeapon":
      // data.enabled
      // explaination: http://cdn.henrythehoover.vip/HXKJk0pKh6aFdfG
      break;
    case "updateWeapon":
      // data.weapon (a url) & data.clip & data.ammo & data.name
      // explaination: http://cdn.henrythehoover.vip/wi51LTNbsbo7yfw
      break;
    case "teamchat":
      // data.message
      // explaination: http://cdn.henrythehoover.vip/c0auqp52ok5PMhj
      break;
    case "toggleSafezone":
      // data.enabled
      // explaination: http://cdn.henrythehoover.vip/kom29kSR4K6s6mg
      break;
    case "toggleSpeedo":
      // data.enabled
      // explaination: http://cdn.henrythehoover.vip/oYJAds2KcE4MPFw
      break;
    case "updateFuel":
      // data.fuel & data.maxFuel
      // explaination: http://cdn.henrythehoover.vip/5vc9xYa84rhpn5d
      break;
    case "updateSpeed":
      // data.speed
      // explaination: http://cdn.henrythehoover.vip/ZIn35JOdZsX1Yw4
      break;
    case "toggleLight":
      // data.enabled
      // explaination: http://cdn.henrythehoover.vip/0C8374qtSdXBf4g
      break;
    case "updateDoors":
      // data.doors
      // explaination: http://cdn.henrythehoover.vip/ywT6UwbaHI59lUg
      break;
    case "updateEngine":
      // data.enabled
      // explaination: http://cdn.henrythehoover.vip/e6wyobQVaCHNrTg
      break;
    case "updateRPM":
      // data.rpm & data.maxRPM
      // explaination: http://cdn.henrythehoover.vip/54JLeJMY63L59w0
      break;
  }
});
