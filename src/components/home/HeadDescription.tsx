interface DescriptionItemProps {
  title?: string;
  description?: string
}
export function DescriptionItem({
  title,
  description,
}: DescriptionItemProps) {
  return (
    <div className="text-xl  text-[#BEC0C1] font-light">
      <span className="text-white font-semibold">{title}</span>
      {description}
    </div>
  );
}


export default function HeadDescription() {
  return (
    <div className=" flex flex-col gap-6">
      <DescriptionItem
      title="Sbert："
        description="Sbert is a framwork that supports calculating similarity scores for pairs of texts and predicting scores for pairs of sentences."
      />
      <DescriptionItem
      title="Similarity score："
        description="The value range is between -1 and 1. The closer the value is to 1, the more similar the results are."
      />
      <DescriptionItem
      title="Predict score："
        description="Predict score：The value range is between -11 and 11. The closer the value is to 11, the better the result. A higher value means the inference quality is better."
      />
      <DescriptionItem
      title="GPT4 score："
        description="GPT4 score：The value range is between 0 and 10. The closer the value is to 10, the better the result. A higher value means the inference quality is better."
      />
    </div>
  );
}
