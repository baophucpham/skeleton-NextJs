// import { categoriesData } from "@/constants/dummy";
// import { Settings } from "react-slick";
import AES from "crypto-js/aes";
import encUtf8 from "crypto-js/enc-utf8";
import enc from "crypto-js/enc-base64";
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

function encryptData(data: string = ""): string {
  const key = process.env.NEXT_PUBLIC_SECRET_KEY_LOCAL;
  if (key) {
    const ciphertext = AES.encrypt(data, key).toString();
    const encData = enc.stringify(encUtf8.parse(ciphertext));
    return encData;
  } else {
    console.error("Key is undefined!");
    return "";
  }
}

function decryptData(ciphertext: string = "") {
  console.log("ddsadas", ciphertext);
  if (ciphertext) {
    const key: string = process.env.NEXT_PUBLIC_SECRET_KEY_LOCAL || "";
    const decData = enc.parse(ciphertext).toString(encUtf8);
    const bytes = AES.decrypt(decData, key);
    const originalData = bytes.toString(encUtf8);

    // Check if originalData is empty
    if (!originalData) {
      // console.error("Decryption resulted in empty data");
      return "";
    }

    return originalData;
  }
}

//validate input with pattern
const onChangeInputPattren = (value: string = "", parttern: string = "") : string => {
  const regex = new RegExp(parttern, 'ig');
  const res = value.replace(regex, "");
  return res;
};

export {
  fakeApiCall,
  formatPrice,
  getEmoji,
  getMillisecondsDifference,
  encryptData,
  decryptData,
  onChangeInputPattren
  //   getNameCategory,
  //   settingCarouselHome,
};

export const isEmpty = (obj: any) =>
  [Object, Array].includes((obj || {}).constructor) &&
  !Object.entries(obj || {}).length;
