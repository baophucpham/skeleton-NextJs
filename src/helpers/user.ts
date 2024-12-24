export const generateCustomerFullname = (
  firstName: string,
  middleName: string | any,
  lastName: string
) => {
  return `${lastName ?? ""} ${middleName ? middleName + " " : ""} ${
    firstName ?? ""
  }`;
};
