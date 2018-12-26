import React from "react";

import OutputLog from "./output-log";
import ConsoleLog from "./console-log";

class CSOutput extends React.PureComponent {
  render() {
    const { outputValue, consoleData } = this.props;
    return (
      <div className="log-wrapper">
        <OutputLog outputValue={outputValue} />
        <ConsoleLog consoleData={consoleData} />
      </div>
    );
  }
}

export default CSOutput;
