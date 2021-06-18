import React from "react";
import ContentLoader from "react-content-loader";

const Phone = () => (
  <ContentLoader
    preserveAspectRatio="xMaxYMid meet" //thanks for this magical attribute on svg
    viewBox="0 0 450 570"
    backgroundColor="#f0f0f0"
    foregroundColor="#dedede"
  >
    <rect x="10" y="6" rx="3" ry="3" width="430" height="100" />
    <rect x="85" s y="290" rx="10" ry="10" width="280" height="150" />
    <rect x="125" s y="130" rx="10" ry="10" width="200" height="140" />
  </ContentLoader>
);

export default Phone;
