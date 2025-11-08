function Container({ children }: { children: React.ReactNode }) {
  return (
    <section className="mx-6 mt-5">
      <div className="w-full border border-gray-300 rounded-lg">{children}</div>
    </section>
  );
}

export default Container;
