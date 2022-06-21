import { useEffect, useRef, useState } from "react";
import { Flex, IconButton, Text } from "@chakra-ui/react";

import "./style.css";
import imageIcon from "../../assets/imagen.png";
import { DeleteIcon } from "@chakra-ui/icons";

//Dark Mode
import { DarkMode } from "../../colors";

export const FileUploadButton = ({
  onChange,
  currentFile,
  mobile,
}: {
  onChange: React.Dispatch<File | undefined>;
  currentFile: File | undefined;
  mobile: boolean;
}) => {
  const [fileError, setFileError] = useState("");
  const drop = useRef<HTMLDivElement>(null);

  const truncateFileName = (fileName: string, maxLength = 50) =>
    fileName.length > maxLength
      ? `${fileName.substring(0, maxLength)}…`
      : fileName;

  const extension = (fileName: string) =>
    fileName.substring(fileName.lastIndexOf(".") + 1);

  const onUpload = (files: FileList | null) => {
    if (files) {
      if (files[0].type.substring(0, files[0].type.indexOf("/")) === "image") {
        if (files[0].size / 1000 / 1000 < 2) {
          onChange(files[0]);
          setFileError("");
        } else {
          onChange(undefined);
          setFileError("El tamaño de la imágen no puede ser mayor a 2MB");
        }
      } else {
        onChange(undefined);
        setFileError("Tipo de archivo inválido. Solo se pueden subir imágenes");
      }
    } else {
      onChange(undefined);
      setFileError(
        "Hubo un error al procesar tu archivo. Por favor inténtalo de nuevo"
      );
    }
  };

  useEffect(() => {
    drop.current?.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
    drop.current?.addEventListener("drop", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const files = e.dataTransfer?.files;

      if (files && files.length) {
        onUpload(files);
      }
    });

    return () => {
      drop.current?.removeEventListener("dragover", (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
      drop.current?.removeEventListener("drop", (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
    };
  }, []);

  return mobile ? (
    <Flex w="85%">
      <label
        className="FileUpload"
        style={{
          width: "max-content",
          backgroundColor: DarkMode().blue,
          height: "2.5rem",
          paddingInlineStart: "1rem",
          paddingInlineEnd: "1rem",
          borderRadius: "40px",
          display: "inline-flex",
          alignContent: "center",
          justifyItems: "center",
          alignItems: "center",
          cursor: "pointer",
          flexGrow: 0,
        }}
      >
        <img style={{ height: "100%" }} src={imageIcon}></img>
        <input
          style={{ display: "none" }}
          type="file"
          accept=".jpg,.png,.jpeg,.gif"
          onChange={(e) => {
            onUpload(e.target.files);
          }}
        />
      </label>

      {fileError != "" ? (
        <Text flexGrow={1} flexBasis={0} color={"#ed3441"} ml="0.5em">
          {fileError}
        </Text>
      ) : (
        <Text flexGrow={1} flexBasis={0} ml="0.5em" color="grey" as="i">
          {currentFile
            ? `Se cargó el archivo ${
                truncateFileName(
                  currentFile.name.substring(
                    currentFile.name.lastIndexOf(".") + 1,
                    0
                  ),
                  12
                ) + extension(currentFile.name)
              } correctamente`
            : ""}
        </Text>
      )}
      {currentFile ? (
        <IconButton
          ml="0.5em"
          onClick={() => {
            onChange(undefined);
          }}
          colorScheme="purpleScheme"
          icon={<DeleteIcon />}
          aria-label={"Eliminar archivo"}
        ></IconButton>
      ) : (
        <></>
      )}
    </Flex>
  ) : (
    <div ref={drop}>
      <label
        className="FileUpload"
        style={{
          textAlign: "center",
          backgroundColor: DarkMode().blue,
          fontSize: "1rem",
          fontWeight: "600",
          height: "2.5rem",
          paddingInlineStart: "1rem",
          paddingInlineEnd: "1rem",
          borderRadius: "40px",
          display: "inline-flex",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        Añadir foto
        <input
          style={{ display: "none" }}
          type="file"
          accept=".jpg,.png,.jpeg,.gif"
          onChange={(e) => {
            onUpload(e.target.files);
          }}
        />
      </label>

      {fileError != "" ? (
        <Text color={"#ed3441"} display="inline" ml="0.5em">
          {fileError}
        </Text>
      ) : (
        <Text ml="0.5em" color="grey" as="i">
          {currentFile
            ? `Se cargó el archivo ${
                truncateFileName(
                  currentFile.name.substring(
                    currentFile.name.lastIndexOf(".") + 1,
                    0
                  ),
                  12
                ) + extension(currentFile.name)
              } correctamente`
            : "Selecciona una imágen o arrástrala aquí"}
        </Text>
      )}
      {currentFile ? (
        <IconButton
          ml="0.5em"
          onClick={() => {
            onChange(undefined);
          }}
          colorScheme="purpleScheme"
          icon={<DeleteIcon />}
          aria-label={"Eliminar archivo"}
        ></IconButton>
      ) : (
        <></>
      )}
    </div>
  );
};
