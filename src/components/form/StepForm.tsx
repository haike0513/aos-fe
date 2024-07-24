'use client';
import { useForm, useWatch } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription, FormMessage } from '../ui/form';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import clsx from 'clsx';
import { AlarmClockIcon, AwardIcon, LoaderIcon } from 'lucide-react';
import { ReactNode, useCallback, useState } from 'react';
import {Slider as CompareSlider } from './slider';
import axios from 'axios';
import useSWR from 'swr/immutable';
import { BASE_API_ENDPOINT, BASE_GPU_ENDPOINT, BASE_QUALITY_ENDPOINT } from '@/config/base';
import {nanoid} from 'nanoid'
import { fetchDispatcher, fetchGpu, fetchModelList, fetchScore, fetchSimilarity, fetchSbertScore } from '@/config/api';
import { useCountdown } from 'usehooks-ts'
export interface ModelCompareItemProps {
  icon?: ReactNode;
  name?: string;
  isActive?: boolean;
  isLoading?: boolean;
  loadingText?: ReactNode;
  content?: ReactNode
}

export const ModelCompareItem = ({
  icon,
  name,
  isActive,
  isLoading,
  content,
  loadingText = '',
}: ModelCompareItemProps) => {
  return <div>
  <div className='mb-1 h-6 truncate'>
    {name || ''}
  </div>
  <div className={clsx('rounded-md p-0.5', {
    'bg-linear-main': isActive,
    'bg-[#15171B]': !isActive,
  })}>
    <div className={clsx('bg-[#15171B] h-10 rounded flex items-center justify-center', {
      'bg-[#383838]': isActive
    })}>
      {isLoading ?
      <div className='flex items-center justify-center'>
        <LoaderIcon className=' animate-spin h-6 w-6' /> <span className='ml-1'>{loadingText}</span>
      </div>
       : <div className='flex items-center justify-center gap-2 text-[#BEC0C1]'>
        {icon} {content}
        </div>}
    </div>
  </div>
</div>

}

const controller = new AbortController();


const fetcher = async(url: string) => {
  // const rs = await axios.post(`${BASE_API_ENDPOINT}${url}`)
  const rs = await fetchModelList()
  return rs.data;
}

export default function StepForm() {
  const form = useForm();
  const values = useWatch({
    control: form.control,
  });
  console.log(values);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState();

  const [showParam, setShowParam] = useState<string>();
  const [modelName, setModelName] = useState('');

  const modelsListData = useSWR('/api/list_models', fetcher);
  const [dispatchLoading, setDispatchLoading] = useState(false);
  
  const [dispatchResult, setDispatchResult] = useState<any>();
  const [intervalValue, setIntervalValue] = useState<number>(1000)
  const [count, { startCountdown, stopCountdown, resetCountdown }] =useCountdown({
      countStart: 0,
      countStop: Infinity,
      intervalMs: intervalValue,
      isIncrement: true,
    });
    console.log('count', count);
  const handleQueryDispatcher = useCallback(async(values: any) => {
    let result = {};
    setDispatchLoading(true);
    try {

      const data: any = {
        callback_url: '/',
        message: values.promote,
        message_id: nanoid(),
        model: values.model,
        conversation_id: '11',
        // temperature: values?.params?.temperature || 0.7,
        // top_p: values?.params?.top_p || 1,
        // max_new_tokens: values?.params?.max_tokens || 1,
        params: values?.params,
      }
      // const data: any = {
      //   callback_url: '/',
      //   message: values.promote,
      //   message_id: nanoid(),
      //   model: values.model,
      //   conversation_id: '11',
      //   params: values?.params,
      // }
      // const rs1 = await axios.post(`${BASE_API_ENDPOINT}/api/question`, data) ;
      const rs = await fetchDispatcher() ;

      console.log('question', rs);
      result = rs.data?.result || {};
      setDispatchResult(result);
    } catch (error) {
      
    }
    setDispatchLoading(false);
    return result;
  }, []);

  const [gpuLoading, setGpuLoading] = useState(false);

  const [gpuResult, setGpuResult] = useState<any>();

  // useCountDown

  const handleQueryGpu = useCallback(async(values: any) => {
    let result = {};
    setGpuLoading(true);
    try {
      const data: any = {
        repetition_penalty: 1,
        prompt: values.promote,
        message_id: nanoid(),
        model: values.model,
        stop_token_ids: null,
        stop: null,
        temperature: values?.params?.temperature || 0.7,
        top_p: values?.params?.top_p || 1,
        max_new_tokens: values?.params?.max_tokens || 1,
        // params: values?.params,
        echo: false,
      }
      // const rs = await axios.post(`${BASE_GPU_ENDPOINT}/worker_generate_stream`, data, {
      //   responseType: 'stream',
      //   headers: {
      //     'Accept': 'text/event-stream',
      //   },
      // }) ;


      // const evtSource = new EventSource(`${BASE_GPU_ENDPOINT}/worker_generate_stream`);
      // console.log('evtSource', evtSource)
      // evtSource.onmessage = (e) => {
      //   console.log('stream',e);
      // };


      // console.log('stream',rs);


      
      
      // const stream = rs.data
      // stream.on('data', (data: any) => { 
      //   console.log('stream data',data);
      //   data = data.toString()
      //   console.log(data) 
      // })
      const rs = await fetchGpu();
      result = rs.data?.result || {};
      setGpuResult(result);
    } catch (error) {
      
    }
    setGpuLoading(false);
    return result;
  }, []);


  const [qualityLoading, setQualityLoading] = useState(false);

  const [qualityData, setQualityData] = useState<any>();
  const handleQueryQuality = useCallback(async(values: any) => {
    setQualityLoading(true);
    try {
      const [dr, gr] = values;
      console.log('handleQueryQuality', values);
      const data = [
        dr?.text,
        gr?.text,
      ];
      // const rs = await axios.post(`${BASE_QUALITY_ENDPOINT}/similarity`,data, {signal: controller.signal})
      const rs = await fetchSimilarity();
      console.log('handleQueryQuality', rs);
      setQualityData(rs.data);

    } catch (error) {
      
    }
    setQualityLoading(false);
  }, []);


  const [sbertLoading, setSbertLoading] = useState(false);

  const [sbertData, setSbertData] = useState<any>();
  const handleQuerySbertScore = useCallback(async(values: any, promote?: string) => {
    setSbertLoading(true);
    try {
      const [dr, gr] = values;
      console.log('handleQueryQuality', values);
      const data = [
       [promote, dr?.text],
       [promote, gr?.text]
      ];
      // const rs = await axios.post(`${BASE_QUALITY_ENDPOINT}/score`,data, {signal: controller.signal})
      const rs = await fetchSbertScore();
      // console.log('handleQuerySbertScore', rs);
      setSbertData(rs.data);

    } catch (error) {
      
    }
    setSbertLoading(false);
  }, []);

  const submit = useCallback(async () => {
    setLoading(true)
    try {
      resetCountdown();
      startCountdown();
      const values = form.getValues();

      console.log('values', values);

      const params = {
        top_p: values.top_p?.[0] || 1,
        temperature: values.temperature?.[0] || 0.7,
        max_tokens: values.max_tokens?.[0] || 1024,
      };

      const postParams: any = {
        promote: values.promote,
        model: values.model,
        params,
      }

      setModelName(values.model);

      // if(!showParam) {
      //   postParams.params = params;
      // };

      // await new Promise((resolve) => {
      //   setTimeout(() => {
      //     resolve(true)
      //   }, 1000);
      // });

      const rs = await Promise.all([
        handleQueryDispatcher(postParams), 
        handleQueryGpu(postParams)
      ]);

      await handleQueryQuality(rs);
      await handleQuerySbertScore(rs, values.promote);


      // const data: any = {
      //   callback_url: '/',
      //   message: values.promote,
      //   message_id: nanoid(),
      //   model: values.model,
      //   conversation_id: '11',
      //   params: params,
      // }
      // if(showParam) {
      //   data.params = params;
      // };

      // const rs = await axios.post(`${BASE_API_ENDPOINT}/api/question`, data) ;


      
    } catch (error) {
      
    }
    resetCountdown();
    stopCountdown();
    setLoading(false);
    console.log(form.getValues());
  }, [form, handleQueryDispatcher, handleQueryGpu, handleQueryQuality, handleQuerySbertScore, resetCountdown, startCountdown, stopCountdown])

  console.log('setGpuResult', gpuResult)
  return (
    <div className=" flex flex-col gap-6">
      <div className=' font-bold'>
        <span className='bg-linear-text text-xl'>Step 1：</span>
        <span className=' text-white text-xl'>select model</span>
      </div>
      <div className=' text-muted'>
        <Form {...form}>
          <FormField
            control={form.control}
            name="model"
            // defaultValue={'llama-7b'}
            rules={{
              required: {
                value: true,
                message: "Model is Require",
              }
            }}
            render={({field}) => (
              <FormItem>
                <FormLabel />
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className=' text-muted'>
                    {(modelsListData?.data || []).map((item: string) => {
                      return <SelectItem key={item} value={item}>{item}</SelectItem>;
                    })}
                  </SelectContent>
                </Select>
       
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=' mt-10'>
            <Accordion type="single" collapsible value={showParam} onValueChange={(e) => setShowParam(e)} className=' bg-black rounded-md'>
              <AccordionItem value="params" className=' px-4'>
                <AccordionTrigger className=' text-white text-xl'>parameters</AccordionTrigger>
                <AccordionContent className='flex flex-col gap-2'>
                     <FormField
                    control={form.control}
                    name="temperature"
                    defaultValue={[0.7]}
                    render={({field}) => (
                      <FormItem>
                        <FormLabel className='flex justify-between items-center'>
                          <span className='text-[#BEC0C1] text-sm font-normal'>
                          Temperature
                          </span>
                          <FormControl>
                            <Input className=' w-20 text-[#BEC0C1] h-6 text-xs text-center' type="number" min={0} max={1} step={0.1} onChange={(v) => field.onChange([v.target.value])} value={field.value?.[0]}/>
                          </FormControl>
                        </FormLabel>
                        
                        <FormControl>
                            <Slider max={1} step={0.1} onValueChange={field.onChange} value={field.value} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                                       <FormField
                    control={form.control}
                    name="top_p"
                    defaultValue={[1]}
                    render={({field}) => (
                      <FormItem>
                        <FormLabel className='flex justify-between items-center'>
                          <span className='text-[#BEC0C1] text-sm font-normal'>
                            Top P
                          </span>
                          <FormControl>
                            <Input className=' w-20 text-[#BEC0C1] h-6 text-xs text-center' type="number" min={0} max={1} step={0.1} onChange={(v) => field.onChange([v.target.value])} value={field.value?.[0]}/>
                          </FormControl>
                        </FormLabel>
                        <FormControl>
                          <Slider max={1} step={0.1} onValueChange={field.onChange} value={field.value} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="max_tokens"
                    defaultValue={[1024]}
                    render={({field}) => (
                      <FormItem>
                        <FormLabel className='flex justify-between items-center'>
                          <span className='text-[#BEC0C1] text-sm font-normal'>
                            Max output tokens
                          </span>
                          <FormControl>
                            <Input className=' w-20 text-[#BEC0C1] h-6 text-xs text-center' type="number" min={16} max={2000} step={64} onChange={(v) => field.onChange([v.target.value])} value={field.value?.[0]}/>
                          </FormControl>
                        </FormLabel>
                        <FormControl>
                          <Slider min={16} max={2000} step={64} onValueChange={field.onChange} value={field.value} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

          </div>
          <div className='mt-10'>
            <div className=' text-xl font-bold text-white'>
              promote
            </div>
            <div className='text-[#BEC0C1] font-normal mt-1'>
            please input Inference promote word
            </div>
            <div className='flex justify-between px-2 bg-[#15171B] items-center mt-6 rounded-md'>
                <FormField
                  control={form.control}
                    name="promote"
                    rules={{
                      required: true,
                    }}
                    defaultValue={"What is ai?"}
                    render={({field}) => (
                      <FormItem className='flex-grow'>
                        <FormLabel>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder='What is ai?' className=' bg-transparent border-none w-full placeholder:text-gray-500' {...field}/>
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button disabled={loading || !values?.promote} className='bg-linear-main  text-white disabled:opacity-50'
                    onClick={form.handleSubmit(submit)}
                  >
                    Interface
                  </Button>
            </div>
          </div>
        </Form>
      </div>
      <div>
        <div className=' font-bold'>
          <span className='bg-linear-text text-xl'>Step 2：</span>
          <span className=' text-white text-xl'>compare consistency</span>
        </div>
        <div className='text-[#BEC0C1] my-2'>
          {'Similarity score: The value range is between -1 and 1. The closer the value is to 1, the more similar the results are.'}
        </div>
        <div className=' h-40'>
          {loading ?           <div className=' w-full h-full flex items-center justify-center'>
            <LoaderIcon className=' animate-spin' /> 
</div>: <>
            <div className='flex items-center justify-end mb-2'>
              <div>
                <span className='text-[#BEC0C1]'>Your score</span>
                <span className=' text-white font-bold text-2xl ml-2'>{(qualityData?.[0]?.[1] || 0)}</span>
              </div>
            </div>
              <CompareSlider className=' bg-linear-main rounded-full h-5' min={-1} defaultValue={[0]} max={1} step={0.1} value={loading ? [0] : [(qualityData?.[0]?.[1] || 0)]} />
              <div className=' grid grid-cols-3 h-20 text-sm'>
                <div className=' self-center flex flex-col items-center justify-center'>
                  <div>
                    Negative
                  </div>
                  <div>
                    strong correlation
                  </div>
                </div>
                <div className=' self-center flex flex-col items-center justify-center'>
                  <div>
                    Weak
                  </div>
                  <div>
                    correlation
                  </div>
                </div>
                <div className=' self-center flex flex-col items-center justify-center'>
                  <div>
                  Positive
                  </div>
                  <div>
                    strong correlation
                  </div>
                </div>

              </div>
          </>}

        </div>
      </div>
      <div>
        <div className=' font-bold'>
          <span className='bg-linear-text text-xl'>Step 3：</span>
          <span className=' text-white text-xl'>compare quality</span>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6'>
          <div className=' h-80 bg-black rounded-xl p-4'>
            <div className=' text-white font-bold text-xl mb-2 flex items-center'>
              <span className=' max-w-40 truncate ml-1'>{modelName}</span> { `On CPU`}
             </div>
             <div className=' h-60 overflow-y-scroll' style={{
              scrollbarWidth: 'none',
             }}>
              {dispatchLoading ? <div className=' w-full h-full flex items-center justify-center'><LoaderIcon className=' animate-spin' /></div> : <div className='h-full'>
                <div className=' text-sm text-[#BEC0C1] font-light mt-2 overflow-y-scroll'>
                  {dispatchResult?.text}
                </div>

              </div> }
             </div>
    
          </div>
          <div className=' h-80 bg-black rounded-xl p-4'>
            <div className=' text-white font-bold text-xl mb-2 flex items-center'>
              <span className=' max-w-40 truncate ml-1'>{modelName}</span> { `On GPU`}
             </div>
             <div className=' h-60 overflow-y-scroll'  style={{
              scrollbarWidth: 'none',
             }}>
              {gpuLoading ? <div className=' w-full h-full flex items-center justify-center'><LoaderIcon className=' animate-spin' /></div> : <div className='h-full'>
                <div className=' text-sm text-[#BEC0C1] font-light mt-2 overflow-y-scroll'>
                  {gpuResult?.text}
                </div>

              </div> }
             </div>
    
          </div>

        </div>
      </div>
      <div>
        <div className=' text-white font-bold text-xl mb-2'>
          Times
        </div>
        <div className=' grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <ModelCompareItem
            isLoading={dispatchLoading}
            icon={<AlarmClockIcon className='h-4 w-4' />}
            content={`${dispatchResult?.delay || '~'} S`}
            name={modelName}
            loadingText={`${count} S`}
            isActive={!dispatchLoading && dispatchResult?.delay && gpuResult?.delay && Number(dispatchResult?.delay) < Number(gpuResult?.delay) }
           />
          <ModelCompareItem 
          isLoading={gpuLoading}
          icon={<AlarmClockIcon className='h-4 w-4' />}
          content={`${gpuResult?.delay || '~'} S`}
          name={modelName}
          loadingText={`${count} S`}
          isActive={ !gpuLoading && dispatchResult?.delay && gpuResult?.delay && Number(gpuResult?.delay) < Number(dispatchResult?.delay) }
          />
        </div>
      </div>
      <div>
        <div className=' text-white font-bold text-xl mb-2'>
          Compare Inference Quality  score by Sbert
        </div>
        <div className=' text-[#BEC0C1] mt-2 mb-4'>
          {'Predict score: The value range is between -11 and 11. The closer the value is to 11, the better the result. A higher value means the inference quality is better.'}
        </div>
        <div className=' grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <ModelCompareItem 
            isLoading={loading}
            icon={<AwardIcon className='h-4 w-4' />}
            content={`${sbertData?.[0]?.score || '~'}`}
            name={modelName}
            isActive={ !loading && sbertData?.[0]?.score && sbertData?.[1]?.score && Number(sbertData?.[0]?.score) > Number(sbertData?.[1]?.score) }
          />
          <ModelCompareItem 
            isLoading={loading}
            icon={<AwardIcon className='h-4 w-4' />}
            content={`${sbertData?.[1]?.score || '~'}`}
            name={modelName}
            isActive={ !loading && sbertData?.[0]?.score && sbertData?.[1]?.score && Number(sbertData?.[1]?.score) > Number(sbertData?.[0]?.score) }
          />
        </div>
      </div>
    </div>
  );
}
