import React from "react";
import ContentLoader from "react-content-loader";

const Desktop = () => (
  <ContentLoader
    preserveAspectRatio="xMaxYMid meet" //thanks for this magical attribute on svg
    viewBox="0 0 450 570"
    backgroundColor="#f0f0f0"
    foregroundColor="#dedede"
  >
    <rect x="10" y="6" rx="3" ry="3" width="430" height="80" />
    <rect x="20" s y="90" rx="10" ry="10" width="100" height="150" />
    <rect x="140" s y="90" rx="10" ry="10" width="130" height="150" />
    <rect x="290" s y="90" rx="10" ry="10" width="130" height="80" />
  </ContentLoader>
);

export default Desktop;
