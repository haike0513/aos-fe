'use client';
import { useForm } from 'react-hook-form';
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

export default function StepForm() {
  const form = useForm();
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
            render={() => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <Select>
                    <SelectTrigger className="">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent className=' text-muted'>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=' mt-10'>
            <Accordion type="single" collapsible defaultValue='item-1' className=' bg-black rounded-md'>
              <AccordionItem value="item-1" className=' px-4'>
                <AccordionTrigger className=' text-white text-xl'>parameters</AccordionTrigger>
                <AccordionContent className='flex flex-col gap-2'>
                     <FormField
                    control={form.control}
                    name="Temperature"
                    render={() => (
                      <FormItem>
                        <FormLabel>
                        Temperature
                        </FormLabel>
                        <FormControl>
                            <Slider max={1} step={0.1} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                                       <FormField
                    control={form.control}
                    name="top"
                    render={() => (
                      <FormItem>
                        <FormLabel>
                        Top P
                        </FormLabel>
                        <FormControl>
                            <Slider defaultValue={[0.2]} max={1} step={0.1} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="max"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel className='flex justify-between items-center'>
                          <span className='text-[#BEC0C1] text-sm font-normal'>
                            Max output tokens
                          </span>
                          <FormControl>
                            <Input className=' w-20 text-[#BEC0C1] h-8' type="number" max={100} step={1} />
                          </FormControl>
                        </FormLabel>
                        {/* <FormControl> */}
                            <Slider max={100} step={1} onChange={field.onChange} value={field.value}/>
                        {/* </FormControl> */}
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
                    render={() => (
                      <FormItem className='flex-grow'>
                        <FormLabel>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder='What is ai?' className=' bg-transparent border-none w-full' />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className='bg-linear-main  text-white'>
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
          <Slider className='' defaultValue={[0.2]} max={1} step={0.1} />
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
          <div className=' h-80 bg-black rounded-xl'>

          </div>
          <div className=' h-80 bg-black rounded-xl'>

          </div>

        </div>
      </div>
      <div>
        <div className=' text-white font-bold text-xl mb-2'>
          Times
        </div>
        <div className=' grid grid-cols-2 gap-6'>
          <div>
            <div>
              Model Name
            </div>
            <div className='bg-[#15171B] h-10 rounded mt-2'>

            </div>
          </div>

          <div>
            <div>
              Model Name
            </div>
            <div className='bg-[#15171B] h-10 rounded mt-2'>

            </div>
          </div>

        </div>
      </div>
      <div>
        <div className=' text-white font-bold text-xl mb-2'>
          Compare Inference Quality  score by Sbert
        </div>
        <div className=' text-[#BEC0C1] mt-2 mb-4'>
          {'Predict score: The value range is between -11 and 11. The closer the value is to 11, the better the result. A higher value means the inference quality is better.'}
        </div>
        <div className=' grid grid-cols-2 gap-6'>
          <div>
            <div>
              Model Name
            </div>
            <div className='bg-[#15171B] h-10 rounded mt-2'>

            </div>
          </div>

          <div>
            <div>
              Model Name
            </div>
            <div className='bg-[#15171B] h-10 rounded mt-2'>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
