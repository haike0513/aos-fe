import Image from "next/image";
import "./HeadTitle.css";

export default function HeadTitle() {
  return (
    <div className="head-title text-3xl font-semibold text-center">
      {'Support worker (GPU & CPU) node registration, run gguf format models, respond to inference requests from front-end users.'}
    </div>
  );
}
