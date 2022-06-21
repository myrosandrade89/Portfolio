import { Spacer, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import PopOver, { ETypeSize } from "../popOver";
interface IQuestions {
  question: string;
  answer: string;
}
interface IQuestionAnswer {
  title: string;
  customOpen: boolean;
  customClose: () => void;
  customCancelRef: any;
  questions: Array<IQuestions>;
}

export const QuestionAnswer = (props: IQuestionAnswer) => {
  return (
    <PopOver
      size={ETypeSize.m}
      title={{ text: props.title, alignment: "center" }}
      closeButton={true}
      customOpen={props.customOpen}
      customClose={props.customClose}
      customCancelRef={props.customCancelRef}
    >
      <VStack alignContent="center">
        {props.questions.map((question) => (
          <>
            <div>{question.question}</div>
            <Spacer />
            <div>{question.answer}</div>
          </>
        ))}
      </VStack>
    </PopOver>
  );
};
