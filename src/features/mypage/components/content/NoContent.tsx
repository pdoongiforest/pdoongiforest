function NoContent({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center mb-4rem fade-in 0.7s ease-in-out mb-10">
      <img src="/images/emptyContents.png" alt="피어리뷰 없음" className="w-40 mb-1rem" />
      <p className="text-center font-semibold text-sm leading-6 p-2.5 border border-primary rounded-lg shadow-[0_4px_12px_rgba(166,179,125,0.4)] text-white bg-primary/40">
        {title}
        <br />
        {description}
        <br />
      </p>
    </div>
  );
}

export default NoContent;
