import React from "react";
import ContentLoader from "react-content-loader";

const Mobile = () => (
  <ContentLoader
    preserveAspectRatio="xMaxYMid meet" //thanks for this magical attribute on svg
    viewBox="0 70 450 450"
    backgroundColor="#f0f0f0"
    foregroundColor="#dedede"
  >
    <rect x="125" s y="70" rx="3" ry="3" width="200" height="100" />
    <rect x="50" s y="182" rx="3" ry="3" width="165" height="25" />
    <rect x="50" s y="217" rx="3" ry="3" width="240" height="10" />
    //250
    <circle cx="112.5" cy="265" r="15" />
    <rect x="140" s y="252" rx="3" ry="3" width="190" height="30" />

    <circle cx="112.5" cy="315" r="15" />
    <rect x="140" s y="300" rx="3" ry="3" width="190" height="30" />

    <circle cx="112.5" cy="360" r="15" />
    <rect x="140" s y="345" rx="3" ry="3" width="190" height="30" />

    <circle cx="112.5" cy="415" r="15" />
    <rect x="140" s y="400" rx="3" ry="3" width="190" height="30" />


    {/* <rect x="107" s y="465" rx="2" ry="2" width="140" height="12" />
    <rect x="107" s y="490" rx="2" ry="2" width="130" height="6" />
    <rect x="280" s y="490" rx="2" ry="2" width="1" height="6" />
    <rect x="107" s y="502" rx="2" ry="2" width="130" height="3.5" />
    <rect x="350" s y="502" rx="2" ry="2" width="50" height="3.5" />
    <rect x="107" s y="514" rx="2" ry="2" width="130" height="3.5" />
    <rect x="350" s y="514" rx="2" ry="2" width="50" height="3.5" /> */}

    {/* <rect x="220" s y="40" width="1.5" height="150" /> */}
    {/* <rect x="250" s y="40" rx="10" ry="10" width="150" height="150" /> */}
    {/* //kjfdjfjdfnj */}
    {/* <rect x="250" s y="40" rx="2" ry="2" width="150" height="30" /> */}
    {/* <rect x="260" s y="60" rx="2" ry="2" width="30" height="20" />
    <rect x="350" s y="60" rx="2" ry="2" width="30" height="20" /> */}
    {/* <rect x="250" s y="100" rx="2" ry="2" width="100" height="5" />
    <rect x="250" s y="117" rx="2" ry="2" width="80" height="5" />
    <rect x="250" s y="125" rx="2" ry="2" width="80" height="5" />

    <rect x="300" s y="155" rx="2" ry="2" width="60" height="20" /> */}
    {/* <rect x="25" s y="550" rx="10" ry="10" width="400" height="100" /> */}
  </ContentLoader>
);

export default Mobile;
