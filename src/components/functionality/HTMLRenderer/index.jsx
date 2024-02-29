import React from "react";

class HTMLRenderer extends React.Component {
  render() {
    const { htmlString } = this.props;
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  }
}

export default HTMLRenderer;
