import { StyleSheet, Text, View } from "react-native";
import Markdown from "react-native-markdown-display";
import { Message } from "./types";
import TypingAnimation from "./TypingAnimation";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export const MessageBubble: React.FC<{ message: Message; isTyping: boolean }> = ({
  message,
  isTyping,
}) => {
  return (
    <View
      style={
        message.sender === "bot"
          ? styles.botMessageContainer
          : styles.userMessageContainer
      }
    >
      {message.sender === "bot" ? (
        <>
          <FontAwesome name="user" size={24} color={"#58a0ed"} />
          {isTyping && message.content === "" ? (
            <TypingAnimation />
          ) : (
            <Markdown style={markdownStyles}>{message.content}</Markdown>
          )}
        </>
      ) : (
        <View style={styles.userMessageBubble}>
          <Text style={styles.messageText}>{message.content}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  botMessageContainer: {
    flexDirection: "row",
    marginRight: 60,
    marginTop: 10,
    marginLeft: 10,
  },
  userMessageContainer: {
    flexDirection: "row-reverse",
    marginLeft: 32,
    marginTop: 10,
    marginRight: 10,
  },
  userMessageBubble: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#d9ecff",
  },
  messageText: { color: "#2d3142", fontSize: 16 },
  inputContainer: { flexDirection: "row", alignItems: "center" },
  textInput: {
    flex: 1,
    minHeight: 40,
    backgroundColor: "#f2f1ed",
    marginVertical: 8,
    borderColor: "#2d3142",
    borderWidth: 1,
    marginHorizontal: 4,
    maxHeight: 180,
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  sendButton: { marginRight: 8 },
});

const markdownStyles = {
  body: {
    color: "#2d3142",
    fontSize: 16,
    backgroundColor: "#e4eef7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 4,
  },
  heading1: { color: "#2d3142", fontSize: 24 },
  code_block: { color: "#2d3142", fontSize: 16 },
};