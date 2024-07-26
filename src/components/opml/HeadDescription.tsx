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
      // title="Sbert："
        description="OPML enables off-chain AI model inference using optimistic approach with an on chain interactive dispute engine implementing fault proofs."
      />
      <DescriptionItem
      // title="Similarity score："
        description="The AOS-playground offers Consistency capabilities through OPML. OPML can verify the results of Inference tasks and detect if a node is not functioning correctly."
      />
    </div>
  );
}
