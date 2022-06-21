import { IUserComponents } from "../../interfaces";
import { Img1, Img2, Img3, Img4, ImgMan } from "../../assets/login/LoginMobile";

import { Center } from "@chakra-ui/react";

export const MobileComponents = ({ userComponent }: IUserComponents) => {
  return (
    <>
      <div style={{ height: "25vh", minHeight: "190px" }}>
        {/* Background */}
        <div
          style={{
            maskImage: `radial-gradient(110% 50% at bottom, transparent 50%, #fff 51%)`,
            WebkitMaskImage: `radial-gradient(110% 50% at bottom, transparent 50%, #fff 51%)`,
            background: `linear-gradient(to right, rgba(114,9,183,0.6), rgba(67,97,238,0.6))`,
            width: "min(100vw,100%)",
            height: "22vh",
            maxHeight: "160px",
            minHeight: "120px",
          }}
        ></div>
        <Center>
          <div style={{ width: "60%", position: "absolute", top: "0px" }}>
            {/* Img1 */}
            <div
              style={{
                position: "absolute",
                top: "0px",
                right: "0px",
                width: "12%",
                minWidth: "50px",
              }}
            >
              <Img1></Img1>
            </div>
            {/* Img2 */}
            <div
              style={{
                width: "12%",
                minWidth: "48px",
                position: "absolute",
                top: "25px",
                right: "12vw",
              }}
            >
              <Img2></Img2>
            </div>
            {/* Img3 */}
            <div
              style={{
                position: "absolute",
                top: "0px",
                left: "15vw",
                width: "14%",
                minWidth: "50px",
              }}
            >
              <Img3></Img3>
            </div>
            {/* Img4 */}
            <div
              style={{
                position: "absolute",
                top: "25px",
                left: "0px",
                width: "12%",
                minWidth: "55px",
              }}
            >
              <Img4></Img4>
            </div>
            {/* Man */}
            <Center>
              <div
                style={{
                  width: "20%",
                  minWidth: "140px",
                  position: "absolute",
                  top: "20px",
                }}
              >
                <ImgMan></ImgMan>
              </div>
            </Center>
          </div>
        </Center>
      </div>
      {userComponent}
    </>
  );
};
