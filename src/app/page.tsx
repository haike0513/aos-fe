import StepForm from "@/components/form/StepForm";
import HeadDescription from "@/components/home/HeadDescription";
import HeadTitle from "@/components/home/HeadTitle";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen sm:mx-auto  max-w-5xl">
      <HeadTitle/> 
      <div className="flex items-center justify-center">
        <div className="max-w-3xl mt-10">
          <HeadDescription />
          <div className="mt-6">
            <StepForm />
          </div>
        </div>
      </div>

    </div>
  );
}
