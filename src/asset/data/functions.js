const fancyTimeFormat = (duration, par) => {
   // Giờ, phút và giây
   var hrs = ~~(duration / 3600);
   var mins = ~~((duration % 3600) / 60);
   var secs = ~~duration % 60;
   var ret = "";
   if (par) {
      if(hrs > 0) {
         ret += "" + hrs + " giờ";
      };
      ret += " " + mins + " phút" + (secs < 10 ? "0" : "");
      return ret;
   };
   if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
   };
   ret += "" + mins + ":" + (secs < 10 ? "0" : "");
   ret += "" + secs;
   return ret;
};
/*========================================================*/
const formartTimeNewFeed = (time) => {
   var date = new Date(time * 1000);
   var month = ("0" + (date.getMonth() + 1)).slice(-2);
   var day = ("0" + date.getDate()).slice(-2);
   var dates = new Date(null);
   dates.setSeconds(time);
   var results = date.toISOString().substr(11, 5);
   return `${day} tháng ${month} lúc ${results}`;
};
/*========================================================*/
function formatTime(seconds) {
   let minutes;
   minutes = Math.floor(seconds / 60);
   minutes = minutes >= 10 ? minutes : "0" + minutes;
   seconds = Math.floor(seconds % 60);
   seconds = seconds >= 10 ? seconds : "0" + seconds;
   return minutes + ":" + seconds;
};
/*========================================================*/
const getConterTimeRelese = (timeRelease, isAlbum = false) => {
   const d = new Date();
   let time = d.getTime() / 1000;
   // if (isAlbum) {
   //    let dateString = timeRelease
   //    console.log(dateString)
   //    // let dateParts = dateString?.split("/")
   //    // let dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])
   //    // timeRelease = dateObject.getTime() / 1000
   // }
   let timeFormat = Math.ceil(time - timeRelease);
   let day = Math.ceil(timeFormat / (3600 * 24));
   if (day >= 7) {
      day = "1 tuần"
   } else if (day >= 14) {
      day = "2 tuần"
   } else {
      day += " ngày"
   };
   return day;
};
/*========================================================*/
const getFormartMiute = (time) => {
   var minutes = Math.floor(time / 60);
   return minutes;
};
/*========================================================*/
const getFormartTimeDDYY = (time) => {
   var date = new Date(time * 1000)
   var year = date.getFullYear()
   var month = ("0" + (date.getMonth() + 1)).slice(-2)
   var day = ("0" + date.getDate()).slice(-2)
   return `${day}/${month}/${year}`
};
/*========================================================*/
const scrollTop = () => {
   const main = document.querySelector("#scrollableDiv");
   main.scrollTo({ top: 0, left: 0 });
   return;
};
/*========================================================*/
function scrollToActive(e) {
   setTimeout(function () {
      e?.scrollIntoView({
         behavior: "smooth",
         block: "center",
         inline: "center",
      })
   }, 200)
}
/*========================================================*/
export {
  scrollTop,
  formatTime,
  scrollToActive,
  fancyTimeFormat,
  getFormartMiute,
  getFormartTimeDDYY,
  formartTimeNewFeed,
  getConterTimeRelese
}