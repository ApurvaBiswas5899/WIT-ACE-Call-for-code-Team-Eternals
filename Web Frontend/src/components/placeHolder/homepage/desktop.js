import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    preserveAspectRatio="xMaxYMid meet" //thanks for this magical attribute on svg
    viewBox="0 20 450 470"
    backgroundColor="#f0f0f0"
    foregroundColor="#dedede"
  >
    {/* <rect x="20" y="6" rx="3" ry="3" width="124" height="14" />
    <rect x="370" y="6" rx="3" ry="3" width="60" height="14" /> */}

    <rect x="20" s y="30" rx="5" ry="5" width="85" height="80" />
    <rect x="20" s y="115" rx="2" ry="2" width="50" height="7" />
    <rect x="20" s y="125" rx="2" ry="2" width="75" height="5" />

    <rect x="125" s y="30" rx="5" ry="5" width="85" height="80" />
    <rect x="125" s y="115" rx="2" ry="2" width="50" height="7" />
    <rect x="125" s y="125" rx="2" ry="2" width="75" height="5" />

    <rect x="235" s y="30" rx="5" ry="5" width="85" height="80" />
    <rect x="235" s y="115" rx="2" ry="2" width="50" height="7" />
    <rect x="235" s y="125" rx="2" ry="2" width="75" height="5" />

    <rect x="345" s y="30" rx="5" ry="5" width="85" height="80" />
    <rect x="345" s y="115" rx="2" ry="2" width="50" height="7" />
    <rect x="345" s y="125" rx="2" ry="2" width="75" height="5" />

    {/* second */}
{/* 
    <rect x="20" y="146" rx="3" ry="3" width="124" height="14" />
    <rect x="370" y="146" rx="3" ry="3" width="60" height="14" />

    <rect x="20" s y="170" rx="5" ry="5" width="85" height="80" />
    <rect x="20" s y="255" rx="2" ry="2" width="50" height="7" />
    <rect x="20" s y="265" rx="2" ry="2" width="75" height="5" />

    <rect x="125" s y="170" rx="5" ry="5" width="85" height="80" />
    <rect x="125" s y="255" rx="2" ry="2" width="50" height="7" />
    <rect x="125" s y="265" rx="2" ry="2" width="75" height="5" />

    <rect x="235" s y="170" rx="5" ry="5" width="85" height="80" />
    <rect x="235" s y="255" rx="2" ry="2" width="50" height="7" />
    <rect x="235" s y="265" rx="2" ry="2" width="75" height="5" />

    <rect x="345" s y="170" rx="5" ry="5" width="85" height="80" />
    <rect x="345" s y="255" rx="2" ry="2" width="50" height="7" />
    <rect x="345" s y="265" rx="2" ry="2" width="75" height="5" /> */}
  </ContentLoader>
);

export default MyLoader;
