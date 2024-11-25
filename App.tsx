import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import {
  useLLM,
  LLAMA3_2_1B_URL,
  LLAMA3_2_1B_TOKENIZER,
} from "react-native-executorch";
import { MessageBubble } from "./components/MessageBubble";
import { MessageInput } from "./components/MessageInput";
import { Message } from "./components/types";


export default function App() {
  const [convo, setConvo] = useState<Array<Message>>([]);
  const [prompt, setPrompt] = useState("");

  const llama = useLLM({
    modelSource: LLAMA3_2_1B_URL,
    tokenizerSource: LLAMA3_2_1B_TOKENIZER,
    contextWindowLength: 10,
  });

  const addMessage = (content: string, sender: "user" | "bot") => {
    setConvo((prev) => [...prev, { content, sender }]);
  };

  useEffect(() => {
    if (llama.response && !llama.isModelGenerating) {
      setConvo((prev) => {
        if (prev.length > 0 && prev[prev.length - 1].content === "") {
          const updated = [...prev];
          updated[updated.length - 1] = {
            content: llama.response,
            sender: "bot",
          };
          return updated;
        }
        return [...prev, { content: llama.response, sender: "bot" }];
      });
    }
  }, [llama.response, llama.isModelGenerating]);


  useEffect(() => {
    if (llama.isModelGenerating) {
      setConvo((prev) => {
        if (prev.length > 0 && prev[prev.length - 1].content === "") {
          return prev; 
        }
        return [...prev, { content: "", sender: "bot" }];
      });
    }
  }, [llama.isModelGenerating]);


  const handleSend = async () => {
    if (llama.isModelGenerating) {
      llama.interrupt();
    } else if (prompt.trim().length !== 0) {
      addMessage(prompt, "user");
      setPrompt("");
      await llama.generate(prompt);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView
        style={[styles.scrollView, { marginTop: 10 }]}
        contentContainerStyle={styles.scrollContent}
      >
        {convo.map((msg, index) => (
          <MessageBubble
            key={index}
            message={msg}
            isTyping={llama.isModelGenerating && index === convo.length - 1}
          />
        ))}
      </ScrollView>
      <MessageInput
        prompt={prompt}
        onPromptChange={setPrompt}
        onSend={handleSend}
        isGenerating={llama.isModelGenerating}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 90,
  },
});