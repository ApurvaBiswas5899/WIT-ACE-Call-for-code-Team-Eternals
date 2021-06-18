import React from "react";
import ContentLoader from "react-content-loader";

const CartPageLoader = () => (
  <ContentLoader
    preserveAspectRatio="xMaxYMid meet" //thanks for this magical attribute on svg
    viewBox="-18 30 250 150"
    backgroundColor="#f0f0f0"
    foregroundColor="#dedede"
  >
    {/* <rect x="50" y="6" rx="3" ry="3" width="30" height="20" />
    <rect x="90" y="6" rx="2" ry="2" width="70" height="20" /> */}

    <rect x="20" s y="40" rx="3" ry="3" width="30" height="30" />
    <rect x="60" s y="40" rx="3" ry="3" width="45" height="10" />
    <rect x="60" s y="54" rx="3" ry="3" width="100" height="5" />

    <circle cx="67.5" cy="73.5" r="7.5" />
    <rect x="77.5" s y="66" rx="3" ry="3" width="130" height="15" />

    <circle cx="67.5" cy="90.5" r="7.5" />
    <rect x="77.5" s y="83" rx="3" ry="3" width="130" height="15" />

    <circle cx="67.5" cy="107.5" r="7.5" />
    <rect x="77.5" s y="100" rx="3" ry="3" width="130" height="15" />
    <circle cx="67.5" cy="124.5" r="7.5" />
    <rect x="77.5" s y="117" rx="3" ry="3" width="130" height="15" />

    {/* <rect x="107" s y="140" rx="2" ry="2" width="40" height="12" />
    <rect x="107" s y="155" rx="2" ry="2" width="30" height="6" />
    <rect x="180" s y="155" rx="2" ry="2" width="15" height="6" />

    <rect x="107" s y="164" rx="2" ry="2" width="30" height="3.5" />
    <rect x="180" s y="164" rx="2" ry="2" width="15" height="3.5" />

    <rect x="107" s y="172" rx="2" ry="2" width="30" height="3.5" />
    <rect x="180" s y="172" rx="2" ry="2" width="15" height="3.5" />

    <rect x="220" s y="40" width="1.5" height="150" /> */}
    {/* <rect x="250" s y="40" rx="10" ry="10" width="150" height="150" /> */}
    {/* <rect x="250" s y="40" rx="2" ry="2" width="150" height="30" /> */}
    {/* <rect x="260" s y="60" rx="2" ry="2" width="30" height="20" />
    <rect x="350" s y="60" rx="2" ry="2" width="30" height="20" /> */}


    {/* <rect x="250" s y="100" rx="2" ry="2" width="100" height="5" />
    <rect x="250" s y="117" rx="2" ry="2" width="80" height="5" />
    <rect x="250" s y="125" rx="2" ry="2" width="80" height="5" />

    <rect x="300" s y="155" rx="2" ry="2" width="60" height="20" />

    <rect x="75" s y="200" rx="10" ry="10" width="300" height="100" /> */}
  </ContentLoader>
);

export default CartPageLoader;
