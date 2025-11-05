function Pagination() {
  return (
    <div className="mb-10">
      <ul className="flex gap-2">
        <li className="border border-[#858585] rounded-lg ">
          <button className="w-10 h-10 flex justify-center items-center">
            <img src="/icons/arrowLeft.svg" alt="" className="w-5 h-8" />
          </button>
        </li>
        <li className="bg-[#A6B37D] text-white rounded-lg ">
          <button className="w-10 h-10 flex justify-center items-center">1</button>
        </li>
        <li className="border border-[#858585] rounded-lg ">
          <button className="w-10 h-10 flex justify-center items-center">2</button>
        </li>
        <li className="border border-[#858585] rounded-lg ">
          <button className="w-10 h-10 flex justify-center items-center">3</button>
        </li>
        <li className="border border-[#858585] rounded-lg ">
          <button className="w-10 h-10 flex justify-center items-center">4</button>
        </li>
        <li className="border border-[#858585] rounded-lg ">
          <button className="w-10 h-10 flex justify-center items-center">5</button>
        </li>

        <li className="border border-[#858585] rounded-lg ">
          <button className="w-10 h-10 flex justify-center items-center">
            <img src="/icons/arrowRight.svg" alt="" className="w-5 h-8" />
          </button>
        </li>
      </ul>
    </div>
  );
}
export default Pagination;
