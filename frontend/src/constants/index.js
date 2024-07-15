import accessorriesImg from './images/accessorries.png';
import admin from './images/admin.png'
import sales from "./images/sales.png";
import orders from "./images/cargo.png";
import box from "./images/box.png";
import productsLive from "./images/live-stream.png";
import ordersPending from "./images/ordersPending.png";
import inventory from "./images/inventory-management.png";
import taxes from "./images/taxes.png";
import bannerMan from "./images/banner-man.png";
import vroVector from "./images/vroVector.jpeg";
import logo from "./images/logo.png"
// import productImg from "./images/productImg";
// import vendorImg from "./images/vendorImg";
// import vroImg from "./images/vroImg.avif";
// import shopLogo from "./images/shopLogo.jpeg";
// import loginBanner from "./images/Rectangle 33.png";
// import sayhi from "./images/says hi.jpg";
// import admin from "./images/admin.png";
// import shopimg from "./images/shopLogo.jpeg";
// import vroimages from "./images/vroimages.png";
// import roundbutton from "./images/roundbutton.jpg";
// import vendorsimages from "./images/vendorsimages.png";
// import productimages from "./images/productimages.png";
// import card1 from "./images/card1.png";
// import card2 from "./images/card2.png";
// import card3 from "./images/card3.png";
// import card4 from "./images/card4.png";
// import card5 from "./images/card5.png";
// import card6 from "./images/card6.png";
// import handimage from "./images/handimage.png";
// import notification from "./images/notification.png";
// import setting from "./images/setting.png";
// import image2 from "./images/image 2.jpg";
// import zealshop from "./images/zealshop.png";
// import prodImg from "./images/iphone.png";
// import confirmationbutton from "./images/confirmation button.png";
// import deletebtn from "./images/deletebtn.png";
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${day}-${month}-${year} ${hours}:${minutes}`
 

}


function formatDateV2(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth()+1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${year}-${month.toString().padStart(2,'0')}-${day.toString().padStart(2,'0')}`
 
}

const categoryMap = {
  All: ["All"],
  Clothing: ["All", "Men", "Women", "Kids"],
  Electronics: ["All", "Home Appliances", "Gadgets", "Mobile Phones"],
  Beauty: ["All", "Skincare", "Cosmetics", "Fragrance"],
  Furniture: ["All", "Home", "Office"],
  Sports: ["All", "Volleyball", "Football", "Cricket", "Gym", "Basketball"],
};
const BASE_URL = "https://sahay24x7.com:4000/api/";
function formatIndianRupee(number) {
  // Check if the input is a valid number
  if (isNaN(number)) {
    return "Invalid Number";
  }

  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(number);

  return formattedAmount;
}

function formatDuration(minutes) {
  if(minutes == 0){
    return '0 mins';
  }
  const days = Math.floor(minutes / (24 * 60));
  minutes %= (24 * 60);
  const hours = Math.floor(minutes / 60);
  minutes %= 60;

  let duration = '';
  if (days > 0) {
    duration += `${days}d `;
  }
  if (hours > 0) {
    duration += `${hours}hrs `;
  }
  if (minutes > 0) {
    duration += `${minutes}mins`;
  }
  console.log(duration);
  return duration.trim();
}

export {
  BASE_URL,
  logo,
  sales,
  orders,
  box,
  productsLive,
  ordersPending,
  inventory,
  taxes,
  bannerMan,
  vroVector,
  formatIndianRupee,
  formatDate,
  categoryMap,
  admin,
  accessorriesImg,
  formatDuration,
  formatDateV2
};
