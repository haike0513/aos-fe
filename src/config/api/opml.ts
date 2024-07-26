import axios from "axios"
import { delayData } from "../utils"
import { BASE_API_ENDPOINT, BASE_GPU_ENDPOINT, BASE_QUALITY_ENDPOINT } from "../base"

export const fetchModelList = async (url: string) => {
  // const rs = await axios.post(`${BASE_API_ENDPOINT}${url}`);
  // return rs;
  return await delayData({
    data:[
    "llama-2-7b-chat.Q4_0.gguf"
  ]},500)
}


export const fetchDispatcher = async (data?: any) => {
  // const rs = await axios.post(`${BASE_API_ENDPOINT}/api/question`, data) ;

  // console.log('fetchDispatcher', rs);
  // const rsData = rs?.data?.result;

  // const result = {
  //   delay: rsData?.elapsed,
  //   text: rsData?.answer,
  // }

  // return {
  //   data: {
  //     result
  //   }
  // }

  const result = {
    delay: '0x412411252189749812798198248918948914712489481',
    text: `AI stands for "Artificial Intelligence." It refers to the development of computer systems that can perform tasks that normally require human intelligence, such as visual perception, speech recognition, decision-making, and language translation. AI can be achieved through a combination of techniques such as machine learning, natural language processing, computer vision, and robotics. The ultimate goal of AI research is to create machines that can think and learn like humans, and can even exceed human capabilities in certain areas.`,
  }
  return await delayData({data: {
    result
  }},50000)
}

export const fetchGpu = async (data?: any) => {
      //   const rs = await axios.post(`${BASE_GPU_ENDPOINT}/worker_generate_stream`, data, {
      //   responseType: 'stream',
      //   headers: {
      //     'Accept': 'text/event-stream',
      //   },
      // }) ;

      // console.log('stream',rs);


      
      
      // const stream = rs.data
      // stream.on('data', (data: any) => { 
      //   console.log('stream data',data);
      //   data = data.toString()
      //   console.log(data) 
      // })
  const result = {
    delay: '0x412411252189749812798198248918948914712489481',
    text: `AI stands for "Artificial Intelligence." It is a broad field of computer science that aims to create intelligent machines that can think and learn like humans. AI can be achieved through a combination of techniques such as machine learning, natural language processing, computer vision, and robotics. The ultimate goal of AI research is to develop machines that can reason, learn, and adapt to new situations in a way that is similar to human intelligence.`,
  }
  return await delayData({data: {
    result
  }},11000)
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

export const fetchSimilarity = async (params: any[]) => {
  // const rs = await axios.post(`${BASE_QUALITY_ENDPOINT}/similarity`,params)
  // console.log('fetchSimilarity', rs);

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

export const fetchSbertScore = async (params: any[]) => {
      // const rs = await axios.post(`${BASE_QUALITY_ENDPOINT}/score`,params)
      // console.log('fetchSbertScore', rs);

  const data = [
    {
        "prompt": "What is ai?",
        "result": "AI stands for \"Artificial Intelligence.\" It refers to the development of computer systems that can perform tasks that normally require human intelligence, such as visual perception, speech recognition, decision-making, and language translation. AI can be achieved through a combination of techniques such as machine learning, natural language processing, computer vision, and robotics. The ultimate goal of AI research is to create machines that can think and learn like humans, and can even exceed human capabilities in certain areas.",
        "score": 9.507312774658203
    },
    {
        "prompt": "What is ai?",
        "result": "AI stands for \"Artificial Intelligence.\" It is a broad field of computer science that aims to create intelligent machines that can think and learn like humans. AI can be achieved through a combination of techniques such as machine learning, natural language processing, computer vision, and robotics. The ultimate goal of AI research is to develop machines that can reason, learn, and adapt to new situations in a way that is similar to human intelligence.",
        "score": 9.703027725219727
    }
];
  return await delayData({data},500)
}