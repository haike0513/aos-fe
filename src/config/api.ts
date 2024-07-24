import { delayData } from "./utils"

export const fetchModelList = async () => {
  return await delayData({
    data:[
    "llama-2-7b-chat.Q4_0.gguf"
  ]},500)
}


export const fetchDispatcher = async () => {
  const result = {
    delay: 110,
    text: `bot's message: AI stands for &quot;Artificial Intelligence.&quot; It refers to the development of computer systems that can perform tasks that normally require human intelligence, such as visual perception, speech recognition, decision-making, and language translation. AI can be achieved through a combination of techniques such as machine learning, natural language processing, computer vision, and robotics. The ultimate goal of AI research is to create machines that can think and learn like humans, and can even exceed human capabilities in certain areas.`.repeat(3),
  }
  return await delayData({data: {
    result
  }},500)
}

export const fetchGpu = async () => {
  const result = {
    delay: 10,
    text: `bot's message: AI stands for &quot;Artificial Intelligence.&quot; It refers to the development of computer systems that can perform tasks that normally require human intelligence, such as visual perception, speech recognition, decision-making, and language translation. AI can be achieved through a combination of techniques such as machine learning, natural language processing, computer vision, and robotics. The ultimate goal of AI research is to create machines that can think and learn like humans, and can even exceed human capabilities in certain areas.`.repeat(2),
  }
  return await delayData({data: {
    result
  }},500)
}

export const fetchScore = async () => {
  const data = [
    [1.0, 0.222],
    [0.222, 1]
  ];
  return await delayData({data},500)
}