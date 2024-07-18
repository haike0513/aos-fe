import StepForm from "@/components/form/StepForm";
import HeadDescription from "@/components/home/HeadDescription";
import HeadTitle from "@/components/home/HeadTitle";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen  max-w-5xl m-auto my-32">
      <HeadTitle/> 
      <div className="flex items-center justify-center">
        <div className="max-w-3xl mt-10">
          <HeadDescription />
          <div className="mt-6">
            <StepForm />
          </div>
        </div>
      </div>

    </main>
  );
}
