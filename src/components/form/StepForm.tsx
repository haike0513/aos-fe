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
import useSWR from 'swr';

export interface ModelCompareItemProps {
  icon?: ReactNode;
  name?: string;
  isActive?: boolean;
  isLoading?: boolean;
  content?: ReactNode
}

export const ModelCompareItem = ({
  icon,
  name,
  isActive,
  isLoading,
  content,
}: ModelCompareItemProps) => {
  return <div>
  <div className='mb-1'>
    Model Name
  </div>
  <div className={clsx('rounded-md p-0.5', {
    'bg-linear-main': isActive,
    'bg-[#15171B]': !isActive,
  })}>
    <div className={clsx('bg-[#15171B] h-10 rounded flex items-center justify-center', {
      'bg-[#383838]': isActive
    })}>
      {isLoading ? <LoaderIcon className=' animate-spin' /> : <div className='flex items-center justify-center gap-2 text-[#BEC0C1]'>
        {icon} {content}
        </div>}
    </div>
  </div>
</div>

}

const fetcher = async(url: string) => {
  const rs = await axios.get(url)
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

  const modelsListData = useSWR('/api/list_models', fetcher)

  const submit = useCallback(async () => {
    setLoading(true)
    try {
      // const rs = await axios.post('/api/list_models') ;

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true)
        }, 2000);
      })
      
    } catch (error) {
      
    }
    setLoading(false);
    console.log(form.getValues());
  }, [form])
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
            defaultValue={'llama-7b'}
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
                    <SelectItem value="llama-7b">llama-7b</SelectItem>
                    <SelectItem value="llama-32b">llama-32b</SelectItem>
                    <SelectItem value="llama-64b">llama-64b</SelectItem>
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
                    name="Temperature"
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
                    name="top"
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
                    name="max"
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
                    render={({field}) => (
                      <FormItem className='flex-grow'>
                        <FormLabel>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder='What is ai?' className=' bg-transparent border-none w-full' {...field}/>
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button disabled={loading} className='bg-linear-main  text-white disabled:opacity-50'
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
        <div>
          <div className='flex items-center justify-end mb-2'>
            <div>
              <span className='text-[#BEC0C1]'>Your score</span>
              <span className=' text-white font-bold text-2xl ml-2'>0.9</span>
            </div>
          </div>
            <CompareSlider className=' bg-linear-main rounded-full h-5' min={-1} defaultValue={[0]} max={1} step={0.1} value={loading ? [0] : [0.9]} />
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
          <div>

          </div>
        </div>
      </div>
      <div>
        <div className=' font-bold'>
          <span className='bg-linear-text text-xl'>Step 3：</span>
          <span className=' text-white text-xl'>compare quality</span>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6'>
          <div className=' h-80 bg-black rounded-xl p-4'>
            {loading ? <div className=' w-full h-full flex items-center justify-center'><LoaderIcon className=' animate-spin' /></div> : <div>
              <div className=' text-white font-bold text-xl'>
                {`llama-7b on CPU`}
              </div>
              <div className=' text-sm text-[#BEC0C1] font-light mt-2 overflow-y-scroll'>
                {'AI stands for "Artificial Intelligence." It refers to the development of computer systems that can perform tasks that typically require human intelligence, such as visual perception, speech recognition, decision-making, and language translation. AI can be achieved through a combination of techniques such as machine learning, natural language processing, computer vision, and robotics. The ultimate goal of AI research is to create machines that can think and learn like humans, and can even exceed human capabilities in certain areas.'}
              </div>

            </div> }
          </div>
          <div className=' h-80 bg-black rounded-xl p-4'>
            {loading ? <div className=' w-full h-full flex items-center justify-center'><LoaderIcon className=' animate-spin' /></div> : <div>
              <div className=' text-white font-bold text-xl'>
                {`llama-7b on GPU`}
              </div>
              <div className=' text-sm text-[#BEC0C1] font-light mt-2 overflow-y-scroll'>
                {'AI stands for "Artificial Intelligence." It refers to the development of computer systems that can perform tasks that typically require human intelligence, such as visual perception, speech recognition, decision-making, and language translation. AI can be achieved through a combination of techniques such as machine learning, natural language processing, computer vision, and robotics. The ultimate goal of AI research is to create machines that can think and learn like humans, and can even exceed human capabilities in certain areas.'}
              </div>

            </div> }
          </div>

        </div>
      </div>
      <div>
        <div className=' text-white font-bold text-xl mb-2'>
          Times
        </div>
        <div className=' grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <ModelCompareItem
            isLoading={loading}
            icon={<AlarmClockIcon className='h-4 w-4' />}
           />
          <ModelCompareItem 
          isLoading={loading}
          icon={<AlarmClockIcon className='h-4 w-4' />}
          content={'82 S'}
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
            isActive
            icon={<AwardIcon className='h-4 w-4' />}
            content={'82 S'}
          />
          <ModelCompareItem 
            isLoading={loading}
            icon={<AwardIcon className='h-4 w-4' />}
            content={'82 S'}
          />
        </div>
      </div>
    </div>
  );
}
