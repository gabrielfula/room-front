import { useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";

export const useCookie = (cookieKeyName: string, defaultValue: any) => {

  const [storedValue, setStoredValue] = useState(() => {

    try {
      const cookies = parseCookies();
      
      if (cookies[cookieKeyName]) {

        return JSON.parse(cookies[cookieKeyName]);

      } else {
        setCookie(null, cookieKeyName, JSON.stringify(defaultValue));

        return defaultValue;
      }

    } catch (err) {

      return defaultValue;
    }
  });


  const setValue = (cookieValue : any) => {
    try {
      setCookie(null, cookieKeyName, JSON.stringify(cookieValue));
    } catch (err) {}

    setStoredValue(cookieValue);
  };

  const clearCookie = (cookieKeyName : string) => {
    destroyCookie(null, cookieKeyName)
  }
  
  return [storedValue, setValue, clearCookie];
};