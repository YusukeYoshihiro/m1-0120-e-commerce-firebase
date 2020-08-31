import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

// import "./directory.styles.scss";
import { DirectoryMenuContainer } from "./directory.styles";

import MenuItem from "../menu-item/menu-item.component";
import { selectDirectorySections } from "../../redux/directory/directory.selector";

const Directory = ({ sections }) => {
  return (
    <DirectoryMenuContainer>
      {sections.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
    </DirectoryMenuContainer>
    // <div className="directory-menu">
    //   {sections.map(({ id, ...otherSectionProps }) => (
    //     <MenuItem key={id} {...otherSectionProps} />
    //   ))}
    // </div>
  );
};

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
});

export default connect(mapStateToProps)(Directory);
