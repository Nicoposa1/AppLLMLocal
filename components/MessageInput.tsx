import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export const MessageInput: React.FC<{
  prompt: string;
  onPromptChange: (text: string) => void;
  onSend: () => void;
  isGenerating: boolean;
}> = ({ prompt, onPromptChange, onSend, isGenerating }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={prompt}
        onChangeText={onPromptChange}
        multiline
        style={styles.textInput}
        placeholder="Enter your message here..."
      />
      <TouchableOpacity
        style={styles.sendButton}
        activeOpacity={0.5}
        onPress={onSend}
      >
        {isGenerating ? (
          <FontAwesome name="send" color={"#58a0ed"} size={24} />

        ) : (
          <FontAwesome name="send" color={"#58a0ed"} size={24} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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

