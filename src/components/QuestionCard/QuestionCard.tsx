import React, { FC, useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  ViewStyle,
  StyleSheet,
  TextStyle,
  Animated
} from "react-native";
import { ICard } from "../../models/card.model";
import ActionButton from "./ActionButton";
import { Colors } from "../../utils/color";

interface IProp {
  question: ICard;
  onAnswerQuestion: Function;
}

const QuestionCard: FC<IProp> = props => {
  const { question, onAnswerQuestion } = props;
  const [showAnswer, setShowAnswer] = useState(false);
  const [animatedText, setAnimatedText] = useState(question.question);
  const [animatedTextStyle, setAnimatedTextStyle] = useState(styles.question);

  const handleOnAnswerQuestion = (answer: boolean) => {
    onAnswerQuestion(answer);
  };

  const handleShowAnswer = (newState: boolean) => {
    setShowAnswer(newState);
    _startAnimate(newState);
  };

  const opacity = useRef(new Animated.Value(0)).current;
  const _startAnimate = (newState = false) => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 250
    }).start(() => {
      setAnimatedTextStyle(newState ? styles.answer : styles.question);
      setAnimatedText(newState ? question.answer : question.question);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500
      }).start();
    });
  };

  useEffect(() => {
    _startAnimate();
  }, []);

  useEffect(() => {
    _startAnimate();
  }, [question]);

  const showAnswerButton = (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={() => {
        handleShowAnswer(!showAnswer);
      }}
    >
      <Text
        style={{
          color: showAnswer ? Colors.primaryColor : Colors.errorColor,
          fontSize: 20
        }}
      >
        {showAnswer ? "show question" : "show answer"}
      </Text>
    </TouchableHighlight>
  );

  return (
    <View style={styles.card}>
      {showAnswerButton}
      <View style={[styles.questionSection]}>
        <Animated.Text style={[{ opacity }, animatedTextStyle]}>
          {animatedText}
        </Animated.Text>
      </View>

      <ActionButton
        buttonColor={Colors.errorColor}
        buttonText="Incorrect"
        handleClick={() => handleOnAnswerQuestion(false)}
      />
      <ActionButton
        buttonColor={Colors.successColor}
        buttonText="Correct"
        handleClick={() => handleOnAnswerQuestion(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create<{
  card: ViewStyle;
  questionSection: ViewStyle;
  question: TextStyle;
  answer: TextStyle;
}>({
  card: {
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    backgroundColor: Colors.thirdColor,
    borderColor: Colors.grey,
    borderBottomWidth: 0,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 2
  },
  questionSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  question: {
    color: Colors.primaryColor,
    textAlign: "center",
    fontSize: 34
  },
  answer: {
    color: Colors.secondaryColor,
    textAlign: "center",
    fontSize: 30
  }
});

export default QuestionCard;
