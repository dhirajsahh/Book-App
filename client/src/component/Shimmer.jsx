const Shimmer = () => {
  const arr = [1, 2, 3];
  return (
    <div className="flex sm:justify-around flex-col sm:flex-row gap-8 mt-5">
      {arr.map((item) => (
        <div
          key={item}
          className="border sm:w-[20%] bg-slate-50 h-[400px]"
        ></div>
      ))}
    </div>
  );
};

export default Shimmer;
