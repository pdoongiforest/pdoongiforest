function Social() {
  return (
    <div className="flex gap-5 justify-between mt-5 md:flex-row flex-col">
      <div className="w-1/2 flex flex-col gap-2">
        <p className="text-xl font-bold">소셜</p>
        <ul className="flex gap-2">
          <li className="w-10 h-10 bg-gray-300 rounded-xl"></li>
          <li className="w-10 h-10 bg-gray-300 rounded-xl"></li>
        </ul>
      </div>
      <div className="w-1/2 flex flex-col gap-2">
        <p className="text-xl font-bold">관심 분야</p>
        <ul className="flex gap-2">
          <li className="bg-gray-300 rounded-xl px-2 py-1">JavaScript</li>
          <li className="bg-gray-300 rounded-xl px-2 py-1">React</li>
        </ul>
      </div>
    </div>
  );
}

export default Social;
