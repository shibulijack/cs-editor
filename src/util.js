function isObject(obj) {
  return obj && typeof obj === "object";
}

export function safePrint(data) {
  if (isObject(data)) {
    return `${JSON.stringify(data, null, 2)}`;
  }
  return data;
}

export function customPrint(data) {
  let returnStr = "";
  if (data && Array.isArray(data)) {
    for (let element of data) {
      if (isObject(element)) {
        returnStr += `${JSON.stringify(element, null, 2)}`;
      } else if (Array.isArray(element)) {
        returnStr += element.toString();
      } else {
        returnStr += element;
      }
    }
  }
  return returnStr;
}
