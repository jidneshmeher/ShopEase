import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const validatePhoneNumber = (phone) => {
  if (!phone) return false;
  const phoneNumber = parsePhoneNumberFromString(phone);
  return phoneNumber?.isValid() || false;
};

export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  const phoneNumber = parsePhoneNumberFromString(phone);
  return phoneNumber?.formatInternational() || phone; // safe fallback
};

export const getCountryCode = (phone) => {
  const phoneNumber = parsePhoneNumberFromString(phone);
  return phoneNumber ? `+${phoneNumber.countryCallingCode}` : '';
};

export const getLocalNumber = (phone) => {
  const phoneNumber = parsePhoneNumberFromString(phone);
  return phoneNumber?.nationalNumber || phone;
};
