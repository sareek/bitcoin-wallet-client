
export const addComma = (val) => {
  return val && val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const getReadTime = time => {
  const readTime =
    time !== undefined
      ? `${time} ${time === 1 ? "min read" : "mins read"}`
      : "Not Available";
  return readTime;
};

export const capitaliseFirstLetter = (text, index = 0) => {
  return text.charAt(index).toUpperCase() + text.slice(index + 1);
};

export const text_truncate = (fullStr, strLen, separator) => {
  if (fullStr.length <= strLen) return fullStr;
  
  separator = separator || '...';
  
  var sepLen = separator.length,
      charsToShow = strLen - sepLen,
      frontChars = Math.ceil(charsToShow/4),
      backChars = Math.floor(charsToShow/4);

  return fullStr.substr(0, frontChars) + 
         separator + 
         fullStr.substr(fullStr.length - backChars);
};

export const validateEmail = email => {
  if (
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i.test(
      email
    )
  ) {
    return true;
  }
  return false;
};

