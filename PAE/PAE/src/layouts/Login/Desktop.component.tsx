import React from "react";

import { IUserComponents } from "../../interfaces";
import { Img1, Img2, Img3, Img4, ImgMan } from "../../assets/login/LoginMobile";

import { Flex } from "@chakra-ui/react";

export const DesktopComponents = ({ userComponent }: IUserComponents) => {
  return (
    <div>
      <Flex>
        <div>
          {/* Background */}
          <div
            style={{
              maskImage: `radial-gradient(40% 100% at right, transparent 50%, #fff 51%)`,
              WebkitMaskImage: `radial-gradient(40% 100% at right, transparent 50%, #fff 51%)`,
              background: `linear-gradient(to right, rgba(114,9,183,0.6), rgba(67,97,238,0.6))`,
              width: "30vw",
              height: "max(100vh, 100%)",
              maxWidth: "700px",
            }}
          ></div>
          {/* Img1 */}
          <div
            style={{
              maxWidth: "8%",
              minWidth: "70px",
              position: "absolute",
              top: "0px",
              left: "27vw",
            }}
          >
            <Img1></Img1>
          </div>
          <div
            style={{
              maxWidth: "8%",
              minWidth: "70px",
              position: "absolute",
              top: "15vh",
              left: "10vw",
            }}
          >
            <Img2></Img2>
          </div>
          {/* Img3 */}
          <div
            style={{
              maxWidth: "12%",
              minWidth: "70px",
              position: "absolute",
              bottom: "18vh",
              left: "0",
            }}
          >
            <Img3></Img3>
          </div>
          {/* Img4 */}
          <div
            style={{
              maxWidth: "8%",
              minWidth: "70px",
              position: "absolute",
              bottom: "5vh",
              left: "7vw",
            }}
          >
            <Img4></Img4>
          </div>
          {/* ImgMan */}
          <div
            style={{
              width: "15%",
              minWidth: "250px",
              position: "absolute",
              left: "15vw",
              top: "max(50vh, 50%)",
              transform: "translateY(-50%)",
              WebkitTransform: "translateY(-50%)",
            }}
          >
            <ImgMan></ImgMan>
          </div>
        </div>
        {userComponent}
      </Flex>
    </div>
  );
};
