function EditContainer({ children }: { children: React.ReactNode }) {
  return (
    <section className="border border-gray-300 rounded-lg px-6 py-10 flex flex-col gap-10 items-center relative">
      {children}
    </section>
  );
}

export default EditContainer;
