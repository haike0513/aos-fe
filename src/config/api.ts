import axios from "axios"
import { delayData } from "./utils"
import { BASE_API_ENDPOINT, BASE_GPU_ENDPOINT, BASE_QUALITY_ENDPOINT } from "./base"
import dayjs from 'dayjs';

export const fetchModelList = async (url: string) => {
  const rs = await axios.post(`${BASE_API_ENDPOINT}${url}`);
  return rs;
  // return await delayData({
  //   data:[
  //   "llama-2-7b-chat.Q4_0.gguf"
  // ]},500)
}


export const fetchDispatcher = async (data?: any) => {
  const rs = await axios.post(`${BASE_API_ENDPOINT}/api/question`, data) ;

  console.log('fetchDispatcher', rs);
  const rsData = rs?.data?.result;

  const result = {
    delay: rsData?.elapsed,
    text: rsData?.answer,
  }

  return {
    data: {
      result
    }
  }

  // const result = {
  //   delay: 50,
  //   text: `AI stands for "Artificial Intelligence." It refers to the development of computer systems that can perform tasks that normally require human intelligence, such as visual perception, speech recognition, decision-making, and language translation. AI can be achieved through a combination of techniques such as machine learning, natural language processing, computer vision, and robotics. The ultimate goal of AI research is to create machines that can think and learn like humans, and can even exceed human capabilities in certain areas.`,
  // }
  // return await delayData({data: {
  //   result
  // }},50000)
}

export const fetchGpu = async (data?: any) => {
      //   const rs = await axios.post(`${BASE_GPU_ENDPOINT}/worker_generate_stream`, data, {
      //   responseType: 'stream',
      //   headers: {
      //     'Accept': 'text/event-stream',
      //   },
      // }) ;

      // console.log('stream',rs);

      // const rs1 = await axios.get(`${BASE_GPU_ENDPOINT}/worker_generate_stream`) ;
      // const {message_id, ...rest} = data || {};
      // const rs2 = await axios.post(`${BASE_GPU_ENDPOINT}/worker_generate_stream`, {...rest, model: 'vicuna-7b-v1.5'}, {
      //   headers: {
      //     'Accept': 'text/event-stream',
      //   },
      //   adapter: 'fetch',
      // }) ;

      // console.log('stream',rs);
      const {message_id, prompt, ...rest} = data;

      const start = dayjs();


      const rs = await fetch(`${BASE_GPU_ENDPOINT}/worker_generate_stream`, {
        method: "POST",
        body: JSON.stringify({...rest,
          // prompt: `\"${prompt}\"`,
           prompt: "\"A chat between a curious user and an artificial intelligence assistant. The assistant gives helpful, detailed, and polite answers to the user\'s questions. USER: hi ASSISTANT:\" ",
           model: 'vicuna-7b-v1.5'
          }
          ),
      }) ;

      // const rs = await fetch(`${'http://localhost:8888'}/events`, {
      //   method: "POST",
      //   headers: {
      //     'Accept': 'text/event-stream',
      //   },
      //   body: JSON.stringify({...rest,
      //     // prompt: `\"${prompt}\"`,
      //      prompt: "\"A chat between a curious user and an artificial intelligence assistant. The assistant gives helpful, detailed, and polite answers to the user\'s questions. USER: hi ASSISTANT:\" ",
      //      model: 'vicuna-7b-v1.5'
      //     }
      //     ),
      // }) ;
      // const stream = rs.body;

      const reader = rs.body?.getReader()!;
      // const reader = rs.body?.getReader();

      const readChunk = () => {
        console.log('readChunk')
        reader
        // Read a chunk from the reader
        reader.read()
            .then(({
                value,
                done
            }) => {
              console.log('readChunk', done)
                // Check if the stream is done
                if (done) {
                    // Log a message
                    console.log('Stream finished');
                    // Return from the function
                    return;
                }
                // Convert the chunk value to a string
                const chunkString = new TextDecoder().decode(value);
                // Log the chunk string
                console.log('readChunk', chunkString);
                // Read the next chunk
                readChunk();
            })
            .catch(error => {
                // Log the error
                console.error(error);
            });
      };
      
      readChunk();

      console.log('readChunk end')


      let finText = '';

      // if(reader) {
      //   while(true) {
      //     const r = await reader.read();
      //     console.log('reader await', r);
      //     const b = (r.value?.split(' ') || []);
      //     console.log('reader', b);
      //   let result = b.map((item) => {
      //     try {

      //       const d = JSON.parse(item);
      //       return d
            
      //     } catch (error) {
      //       return null
      //     }

      //   }).filter(i => i);

      //   console.log('reader await', result);

      //   const finalResult = result?.find((item) => item?.finish_reason === 'stop')
      //   console.log('reader await finalResult', finalResult);
      //   if(finalResult) {
      //     finText = finalResult.text;
      //     break;
      //   } else {
      //     // if(result.length === 0) {
      //     //   break;
      //     // }
      //     // result.forEach((item) => {
      //     //   if(item.text) {
      //     //     finText = finalResult.text;
      //     //   }
      //     // })

      //     // break;
      //   }
      //   }
      //   // const a = await reader.read();
      //   // console.log('reader', a) 
      //   // const b = (a.value?.split(' ') || []);
      //   // console.log('reader', b);

      //   // const c = await reader.read();
      //   // console.log('reader', c);


      //   // let result = b.map((item) => {
      //   //   try {

      //   //     const d = JSON.parse(item);
      //   //     return d
            
      //   //   } catch (error) {
      //   //     return null
      //   //   }

      //   // }).filter(i => i); 
      //   // console.log('reader', result);

      // }


      // stream.on('data', (data: any) => { 
      //   console.log('stream data',data);
      //   data = data.toString()
      //   console.log(data) 
      // });

      const end = dayjs();

      const diff = end.diff(start);

      console.log('finish', finText);
  const result = {
    delay: diff/1000,
    text: finText,
    // text: `AI stands for "Artificial Intelligence." It is a broad field of computer science that aims to create intelligent machines that can think and learn like humans. AI can be achieved through a combination of techniques such as machine learning, natural language processing, computer vision, and robotics. The ultimate goal of AI research is to develop machines that can reason, learn, and adapt to new situations in a way that is similar to human intelligence.`,
  }
  return await delayData({data: {
    result
  }},0)
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
  const rs = await axios.post(`${BASE_QUALITY_ENDPOINT}/similarity`,params)
  console.log('fetchSimilarity', rs);

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
      const rs = await axios.post(`${BASE_QUALITY_ENDPOINT}/score`,params)
      console.log('fetchSbertScore', rs);

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