// import { categoriesData } from "@/constants/dummy";
// import { Settings } from "react-slick";

/**
 * ## Example usage:
 * const endTime = new Date().getTime(); // End time in milliseconds \
 * const millisecondsDifference = getMillisecondsDifference(endTime); \
 * console.log(millisecondsDifference);
 */
function getMillisecondsDifference(endTime: number) {
  const startTime: number = Date.now();
  const millisecondsDifference = endTime - startTime;
  return millisecondsDifference;
}

// const settingCarouselHome: Settings = {
//   infinite: true,
//   speed: 500,
//   autoplay: true,
//   autoplaySpeed: 2000,
//   slidesToShow: 1,
//   waitForAnimate: false,
//   fade: true,
//   dots: true,
// };

// const getNameCategory = (categoryName: string) => {
//   const getTitleCate: string =
//     categoriesData.find((x) => x.name === categoryName).title || "";
//   return getTitleCate;
// };

const getEmoji = (categoryName: string) => {
  const getEmoji: Record<string, string> = {
    home: "⚡",
    products: "💻",
    featured: "🖥️",
    accessories: "🖱️",
    gifts: "🎁",
  };
  return getEmoji[categoryName];
};

function fakeApiCall(data: any) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 2000); // Simulate a 2-second delay
  });
}

function formatPrice(number: string = "0", currencyCode = "VNĐ") {
  const formattedNumber = number
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${formattedNumber} ${currencyCode}`;
}

export {
  fakeApiCall,
  formatPrice,
  getEmoji,
  getMillisecondsDifference,
//   getNameCategory,
//   settingCarouselHome,
};