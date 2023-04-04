import React from "react";
import image from "../../assets/testslikahtml.jpg";
import image2 from "../../assets/moreImages/finalPath/img2.jpg";
import image3 from "../../assets/moreImages/img3.jpg";

const InnerComponentImageHtml = () => {
  return (
    <div>
      <div>This is inner component that uses image inside of JSX</div>
      <img src={image} />
      <div>second image in JSX</div>
      <img src={image2} />
      <div>third image in JSX</div>
      <img src={image3} />
    </div>
  );
};

export default InnerComponentImageHtml;
