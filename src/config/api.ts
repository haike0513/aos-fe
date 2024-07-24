import { delayData } from "./utils"

export const fetchModelList = async () => {
  return await delayData({
    data:[
    "llama-2-7b-chat.Q4_0.gguf"
  ]},500)
}


export const fetchDispatcher = async () => {
  const result = {
    delay: 50,
    text: `AI stands for "Artificial Intelligence." It refers to the development of computer systems that can perform tasks that normally require human intelligence, such as visual perception, speech recognition, decision-making, and language translation. AI can be achieved through a combination of techniques such as machine learning, natural language processing, computer vision, and robotics. The ultimate goal of AI research is to create machines that can think and learn like humans, and can even exceed human capabilities in certain areas.`,
  }
  return await delayData({data: {
    result
  }},50000)
}

export const fetchGpu = async () => {
  const result = {
    delay: 5,
    text: `AI stands for "Artificial Intelligence." It is a broad field of computer science that aims to create intelligent machines that can think and learn like humans. AI can be achieved through a combination of techniques such as machine learning, natural language processing, computer vision, and robotics. The ultimate goal of AI research is to develop machines that can reason, learn, and adapt to new situations in a way that is similar to human intelligence.`,
  }
  return await delayData({data: {
    result
  }},5000)
}

export const fetchScore = async () => {
  const data = [
    [
        1.0000001192092896,
        0.9767298102378845
    ],
    [
        0.9767298102378845,
        1.0000001192092896
    ]
];
  return await delayData({data},500)
}