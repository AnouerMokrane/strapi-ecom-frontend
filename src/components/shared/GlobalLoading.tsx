const GlobalLoading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center fixed inset-0 z-[10000] bg-white/95">
      <div className="flex flex-col items-center gap-4">
        <img src="/assets/logo.svg" alt="" />
        <div className="relative w-28 h-1.5 bg-neutral-black-100 overflow-hidden ">
          <div className="w-10  h-full absolute bg-neutral-black-900 animate-loading-bar" />
        </div>
      </div>
    </div>
  );
};

export default GlobalLoading;
