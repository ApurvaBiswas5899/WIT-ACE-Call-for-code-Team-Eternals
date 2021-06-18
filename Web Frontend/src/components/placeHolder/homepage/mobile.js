import React from "react";
import ContentLoader from "react-content-loader";

const PhoneView = () => (
  <ContentLoader
    preserveAspectRatio="xMaxYMid meet"
    viewBox="0 -15 450 300"
    backgroundColor="#f0f0f0"
    foregroundColor="#dedede"
  >
    <rect x="10" y="6" rx="3" ry="3" width="124" height="14" />
    <rect x="370" y="6" rx="3" ry="3" width="60" height="14" />

    <rect x="100" s y="50" rx="10" ry="10" width="250" height="150" />
    <rect x="100" y="210" rx="3" ry="3" width="80" height="14" />
    <rect x="100" y="230" rx="3" ry="3" width="180" height="14" />

    <rect x="100" s y="290" rx="10" ry="10" width="250" height="150" />
    <rect x="100" y="450" rx="3" ry="3" width="80" height="14" />
    <rect x="100" y="470" rx="3" ry="3" width="180" height="14" />

    {/* <rect x="100" s y="664" rx="10" ry="10" width="250" hei390ght="150" />
    <rect x="100" y="570" rx="3" ry="3" width="124" height="14" />
    <rect x="100" y="590" rx="3" ry="3" width="60" height="14" /> */}
  </ContentLoader>
);

export default PhoneView;
