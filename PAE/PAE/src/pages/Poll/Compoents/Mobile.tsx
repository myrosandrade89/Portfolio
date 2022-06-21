//Chakra
import {
  Grid,
  GridItem,
  Image,
  Text,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";

//Componets
import { DividedCard } from "../../../components/DividedCard";

//Assets Enum Types
import asesor from "../../../assets/asesor-icon.png";
import asesorado from "../../../assets/asesorado-icon.png";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css/navigation";

// Import Swiper styles
import "swiper/css";

//Dark Mode
import { DarkMode } from "../../../colors";

interface IMobilePoll {
  Asesor?: any;
  Asesorado?: any;
  active?: boolean;
}

export const MobilePoll = ({ Asesor, Asesorado, active }: IMobilePoll) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const size = useBreakpointValue({ base: "sm", md: "2xl" });
  return (
    <Box width="100%">
      <Modal isOpen={isOpen} onClose={onClose} size={size} isCentered={true}>
        <ModalOverlay />
        <ModalContent rounded={30} height={550}>
          <ModalHeader
            margin={4}
            fontSize={25}
            fontWeight="bold"
            marginBottom={-70}
          >
            Encuestas
          </ModalHeader>
          <Text
            textColor="#9D9E9D"
            fontWeight="bold"
            marginLeft={10}
            fontSize={10}
            marginTop={50}
            marginBottom={-55}
          >
            Selecciona una encuesta para editar su perfil de preguntas
          </Text>
          <ModalCloseButton
            margin={4}
            rounded={30}
            backgroundColor="#F44336"
            color={DarkMode().bgTotalv2}
            p={5}
          />
          <ModalBody>
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              navigation={true}
              modules={[Navigation]}
            >
              <SwiperSlide>
                <Grid
                  templateRows="repeat(1, 1fr)"
                  templateColumns="repeat(12, 1fr)"
                  gap={2}
                  padding={3}
                >
                  <GridItem colStart={2} colEnd={12} rowStart={10} rowEnd={26}>
                    <Box as="button" onClick={Asesor} width="100%">
                      <DividedCard
                        contentFirst={<Image src={asesor} boxSize={250} />}
                        contentSecond={
                          <Text fontWeight="bold" fontSize={25}>
                            Asesor
                          </Text>
                        }
                        colorFirst={DarkMode().pink}
                        colorSecond={DarkMode().bgTotalv2}
                        percentageFirst="80"
                        percentageSecond="20"
                        vertical={true}
                        overlap={false}
                      />
                    </Box>
                  </GridItem>
                </Grid>
              </SwiperSlide>
              <SwiperSlide>
                <Grid
                  templateRows="repeat(1, 1fr)"
                  templateColumns="repeat(12, 1fr)"
                  gap={2}
                  padding={3}
                >
                  <GridItem colStart={2} colEnd={12} rowStart={10} rowEnd={26}>
                    <Box as="button" onClick={Asesorado} width="100%">
                      <DividedCard
                        contentFirst={<Image src={asesorado} boxSize={250} />}
                        contentSecond={
                          <Text fontWeight="bold" fontSize={25}>
                            Asesorados
                          </Text>
                        }
                        colorFirst={DarkMode().blue}
                        colorSecond={DarkMode().bgTotalv2}
                        percentageFirst="80"
                        percentageSecond="20"
                        vertical={true}
                        overlap={false}
                      />
                    </Box>
                  </GridItem>
                </Grid>
              </SwiperSlide>
            </Swiper>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
