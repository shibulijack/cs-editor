function _isObject(obj) {
  return obj && typeof obj === "object";
}

function _safePrint(element) {
  if (_isObject(element)) {
    return `${JSON.stringify(element, null, 2)}`;
  } else if (Array.isArray(element)) {
    return element.toString();
  } else {
    return element;
  }
}

export function safePrint(data) {
  let returnData = [];
  if (data && Array.isArray(data)) {
    for (let element of data) {
      returnData.push(_safePrint(element));
    }
  } else {
    returnData.push(_safePrint(data));
  }
  return returnData.join(", ");
}

export function captureConsole() {
  window.console = {
    log: function() {
      window.postMessage(
        {
          data: [...arguments],
          type: "log"
        },
        process.env.REACT_APP_ROOT_URL
      );
    },
    warn: function() {
      window.postMessage(
        {
          data: [...arguments],
          type: "warn"
        },
        process.env.REACT_APP_ROOT_URL
      );
    },
    error: function() {
      window.postMessage(
        {
          data: [...arguments],
          type: "error"
        },
        process.env.REACT_APP_ROOT_URL
      );
    }
  };
}
