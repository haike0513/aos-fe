"use client";
import { useForm, useWatch } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "../ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import clsx from "clsx";
import { AlarmClockIcon, AwardIcon, LoaderIcon } from "lucide-react";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { Slider as CompareSlider } from "../form/slider";
import axios from "axios";
import useSWR from "swr/immutable";
import {
  BASE_API_ENDPOINT,
  BASE_GPU_ENDPOINT,
  BASE_QUALITY_ENDPOINT,
} from "@/config/base";
import { nanoid } from "nanoid";
import {
  fetchDispatcher,
  fetchGpu,
  fetchModelList,
  fetchScore,
  fetchSimilarity,
  fetchSbertScore,
} from "@/config/api/opmlChallenge";
import { useCountdown } from "usehooks-ts";
import { Steps, ConfigProvider, theme } from 'antd'
export interface ModelCompareItemProps {
  icon?: ReactNode;
  name?: string;
  isActive?: boolean;
  isLoading?: boolean;
  loadingText?: ReactNode;
  content?: ReactNode;
}

export const ModelCompareItem = ({
  icon,
  name,
  isActive,
  isLoading,
  content,
  loadingText = "",
}: ModelCompareItemProps) => {
  return (
    <div className=" truncate">
      <div className="mb-1 h-6 truncate">{name || ""}</div>
      <div
        className={clsx("rounded-md p-0.5", {
          "bg-linear-main": isActive,
          "bg-[#15171B]": !isActive,
        })}
      >
        <div
          className={clsx(
            "bg-[#15171B] h-10 rounded flex items-center justify-center truncate",
            {
              "bg-[#383838]": isActive,
            }
          )}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <LoaderIcon className=" animate-spin h-6 w-6" />{" "}
              <span className="ml-1">{loadingText}</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-[#BEC0C1] truncate text-sm">
              {icon} {content}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const controller = new AbortController();

const fetcher = async (url: string) => {
  // const rs = await axios.post(`${BASE_API_ENDPOINT}${url}`)
  const rs = await fetchModelList(url);
  return rs.data;
};

export interface StepFormProps {
  promote?: string;
  model?: string;
}

export default function StepForm({ promote, model }: StepFormProps) {
  const form = useForm();
  const values = useWatch({
    control: form.control,
  });
  useEffect(() => {
    form.setValue("model", model);
  }, [form, model]);
  console.log(values);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState();

  const [showParam, setShowParam] = useState<string>();
  const [modelName, setModelName] = useState("");

  const modelsListData = useSWR("/api/list_models", fetcher);
  const [dispatchLoading, setDispatchLoading] = useState(false);

  const [dispatchResult, setDispatchResult] = useState<any>();
  const [intervalValue, setIntervalValue] = useState<number>(1000);
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 0,
      countStop: Infinity,
      intervalMs: intervalValue,
      isIncrement: true,
    });
  console.log("count", count);
  const handleQueryDispatcher = useCallback(async (values: any) => {
    let result = {};
    setDispatchLoading(true);
    try {
      const data: any = {
        callback_url: "/",
        message: values.promote,
        message_id: nanoid(),
        model: values.model,
        conversation_id: "11",
        // temperature: values?.params?.temperature || 0.7,
        // top_p: values?.params?.top_p || 1,
        // max_new_tokens: values?.params?.max_tokens || 1,
        params: values?.params,
      };
      // const data: any = {
      //   callback_url: '/',
      //   message: values.promote,
      //   message_id: nanoid(),
      //   model: values.model,
      //   conversation_id: '11',
      //   params: values?.params,
      // }
      // const rs1 = await axios.post(`${BASE_API_ENDPOINT}/api/question`, data) ;
      const rs = await fetchDispatcher(data);

      console.log("question", rs);
      result = rs.data?.result || {};
      setDispatchResult(result);
    } catch (error) {}
    setDispatchLoading(false);
    return result;
  }, []);

  const [gpuLoading, setGpuLoading] = useState(false);

  const [gpuResult, setGpuResult] = useState<any>();

  // useCountDown

  const handleQueryGpu = useCallback(async (values: any) => {
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
      };
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
      const rs = await fetchGpu(data);
      result = rs.data?.result || {};
      setGpuResult(result);
    } catch (error) {}
    setGpuLoading(false);
    return result;
  }, []);

  const [qualityLoading, setQualityLoading] = useState(false);

  const [qualityData, setQualityData] = useState<any>();
  const handleQueryQuality = useCallback(async (values: any) => {
    setQualityLoading(true);
    try {
      const [dr, gr] = values;
      console.log("handleQueryQuality", values);
      const data = [dr?.text, gr?.text];
      // const rs = await axios.post(`${BASE_QUALITY_ENDPOINT}/similarity`,data, {signal: controller.signal})
      const rs = await fetchSimilarity(data);
      console.log("handleQueryQuality", rs);
      setQualityData(rs.data);
    } catch (error) {}
    setQualityLoading(false);
  }, []);

  const [sbertLoading, setSbertLoading] = useState(false);

  const [sbertData, setSbertData] = useState<any>();
  const handleQuerySbertScore = useCallback(
    async (values: any, promote?: string) => {
      setSbertLoading(true);
      try {
        const [dr, gr] = values;
        console.log("handleQueryQuality", values);
        const data = [
          [promote, dr?.text],
          [promote, gr?.text],
        ];
        // const rs = await axios.post(`${BASE_QUALITY_ENDPOINT}/score`,data, {signal: controller.signal})
        const rs = await fetchSbertScore(data);
        // console.log('handleQuerySbertScore', rs);
        setSbertData(rs.data);
      } catch (error) {}
      setSbertLoading(false);
    },
    []
  );

  const submit = useCallback(async () => {
    setLoading(true);
    try {
      resetCountdown();
      startCountdown();
      const values = form.getValues();

      console.log("values", values);

      const params = {
        top_p: values.top_p?.[0] || 1,
        temperature: values.temperature?.[0] || 0.7,
        max_tokens: values.max_tokens?.[0] || 1024,
      };

      const postParams: any = {
        promote: values.promote,
        model: values.model,
        params,
      };

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
        handleQueryGpu(postParams),
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
    } catch (error) {}
    resetCountdown();
    stopCountdown();
    setLoading(false);
    console.log(form.getValues());
  }, [
    form,
    handleQueryDispatcher,
    handleQueryGpu,
    handleQueryQuality,
    handleQuerySbertScore,
    resetCountdown,
    startCountdown,
    stopCountdown,
  ]);

  const [stepStatus, setStepStatus] = useState(0);


  const handleNextStep = useCallback(() => {
    if(!stepStatus || stepStatus < 5) {
      setStepStatus((s) => {
        return s+1
      })
    }

  }, [stepStatus]);

  console.log("setGpuResult", gpuResult);
  return (
    <div className=" flex flex-col gap-6">
      <div className=" font-bold">
        <span className="bg-linear-text text-xl">Step 3：</span>
        <span className=" text-white text-xl">Challenge</span>
      </div>
      <div className=" text-muted">
        <Form {...form}>
          <div className="mt-10">
            <div className=" text-xl font-bold text-white">prompt</div>
            <div className="text-[#BEC0C1] font-normal mt-1">
              please input Inference prompt word
            </div>
            <div className="flex justify-between px-2 bg-[#15171B] items-center mt-6 rounded-md">
              <FormField
                control={form.control}
                name="promote"
                rules={{
                  required: true,
                }}
                defaultValue={"What is ai?"}
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel></FormLabel>
                    <FormControl>
                      <Input
                        placeholder="What is ai?"
                        className=" bg-transparent border-none w-full placeholder:text-gray-500"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={loading || !values?.promote}
                className="bg-linear-main  text-white disabled:opacity-50"
                onClick={form.handleSubmit(submit)}
              >
                Inference
              </Button>
            </div>
          </div>
        </Form>
      </div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <div className=" h-80 bg-black rounded-xl p-4">
            <div className=" text-white font-bold text-xl mb-2 flex items-center">
              <span className=" max-w-40 truncate ml-1">{modelName}</span>{" "}
              {`On OPML Node 3`}
            </div>
            <div
              className=" h-60 overflow-y-scroll"
              style={{
                scrollbarWidth: "none",
              }}
            >
              {dispatchLoading ? (
                <div className=" w-full h-full flex flex-col items-center justify-center">
                  <LoaderIcon className=" animate-spin" />
                  <div className=" text-xs text-[#BEC0C1] text-center mt-2">
                    {
                      "this model running on cpu machine，it will take 1 minutes to get result，please wait patient"
                    }
                  </div>
                </div>
              ) : (
                <div className="h-full">
                  <div className=" text-sm text-[#BEC0C1] font-light mt-2 overflow-y-scroll">
                    {dispatchResult?.text}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className=" h-80 bg-black rounded-xl p-4">
            <div className=" text-white font-bold text-xl mb-2 flex items-center">
              <span className=" max-w-40 truncate ml-1">{modelName}</span>{" "}
              {`On OPML Node 4`}
            </div>
            <div
              className=" h-60 overflow-y-scroll"
              style={{
                scrollbarWidth: "none",
              }}
            >
              {gpuLoading ? (
                <div className=" w-full h-full flex items-center justify-center">
                  <LoaderIcon className=" animate-spin" />
                </div>
              ) : (
                <div className="h-full">
                  <div className=" text-sm text-[#BEC0C1] font-light mt-2 overflow-y-scroll">
                    {gpuResult?.text}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className=" text-white font-bold text-xl mb-1 mt-10">
            Tensor data root hash
          </div>
          <div className=" grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ModelCompareItem
              isLoading={dispatchLoading}
              // icon={<AlarmClockIcon className='h-4 w-4' />}
              content={`${dispatchResult?.delay || "~"}`}
              name={modelName}
              loadingText={`${count} `}
              // isActive={
              //   !dispatchLoading &&
              //   dispatchResult?.delay &&
              //   gpuResult?.delay &&
              //   Number(dispatchResult?.delay) < Number(gpuResult?.delay)
              // }
            />
            <ModelCompareItem
              isLoading={gpuLoading}
              // icon={<AlarmClockIcon className='h-4 w-4' />}
              content={`${gpuResult?.delay || "~"} `}
              name={modelName}
              loadingText={`${count}`}
              // isActive={
              //   !gpuLoading &&
              //   dispatchResult?.delay &&
              //   gpuResult?.delay &&
              //   Number(gpuResult?.delay) < Number(dispatchResult?.delay)
              // }
            />
          </div>
          <div className="text-[#BEC0C1] my-10">
            {`As you can observe, the results are different. This allows the challenger to penalize or slash the rewards of malicious nodes. The challenge flow is illustrated below.`}
          </div>
        </div>
      </div>
      <div>
        <ConfigProvider
            theme={{
              algorithm: theme.darkAlgorithm,
              token: {
                colorPrimary: '#ED618B',
              }
            }}
        >
          {stepStatus > 0 && <div>
            <Steps
              labelPlacement="vertical"
                current={(stepStatus && stepStatus -1) || 0}
                items={[
                  {
                    title: 'Challenge',
                    // description: 'Finished',
                  },
                  {
                    title: 'Verify result',
                    // description: 'Finished',
                  },
                  {
                    title: 'Slash',
                    // description: 'Finished',
                  },
                  {
                    title: 'Earn',
                    // description: 'Finished',
                  },
                ]}
            />
                <div className="text-[#BEC0C1] my-10">
                  <div className=" mb-10">
                    {'Assumption we have three node'}
                  </div>
                  <div className=" grid grid-cols-1 sm:grid-cols-3 gap-8">
                    <div className=" bg-[#15171B] rounded text-center border border-white border-opacity-5 px-2 py-4">
                      Honest node  1 : Alice
                    </div>
                    <div className=" bg-[#15171B] rounded text-center border border-white border-opacity-5 px-2 py-4">
                      Malicous node2 : BOB
                    </div>

                    <div className=" bg-[#15171B] rounded text-center border border-white border-opacity-5 px-2 py-4">
                      Honest node  2 : Jim
                    </div>
  

                  </div>
                  <div className="my-10">{'If Alice find BOB result are different with alice. Alice can sign a signature with result'}</div>
                  <div className=" flex flex-col gap-4">
                    { stepStatus > 0 && <p>{'Step1: alice and Jim send challenge on chain'}</p>}
                    { stepStatus > 1 && <p>{'Step2: Contract veify the result between Alice ,Bob and Jim'}</p>}
                    { stepStatus > 2 && <p>{'Step3: slash melicous node token'}</p>}
                    { stepStatus > 3 && <p>{'Step4: alice earn token'}</p>}
                  </div>
                </div>
            </div>}
        </ConfigProvider>
      </div>
      <div className=" flex w-full items-center justify-center">
          <Button
            disabled={stepStatus > 4}
            className="bg-linear-main  text-white disabled:opacity-50 w-40 text-center"
            onClick={() => {
              handleNextStep();
            }}
          >
              {stepStatus > 0 ? 'Next' : 'Challenge'}
              </Button>
      </div>
    </div>
  );
}
