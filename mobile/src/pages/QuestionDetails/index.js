import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  QuestionWrapper,
  Info,
  Section,
  QuestionTime,
  Text,
} from './styles';

export default function QuestionDetails({ navigation }) {
  const question = navigation.getParam('question');

  return (
    <Container>
      <QuestionWrapper>
        <Info>
          <Section>PERGUNTA</Section>
          <QuestionTime>{question.timeDistance}</QuestionTime>
        </Info>
        <Text>{question.question}</Text>
        {!!question.answer && (
          <>
            <Section>RESPOSTA</Section>
            <Text>{question.answer}</Text>
          </>
        )}
      </QuestionWrapper>
    </Container>
  );
}

QuestionDetails.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
