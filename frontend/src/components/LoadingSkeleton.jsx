function LoadingSkeleton() {

  return (

    <div className="animate-pulse max-w-7xl mx-auto px-6 py-10">

      <div className="h-12 w-80 bg-slate-200 rounded-xl mb-8"></div>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="h-80 bg-slate-200 rounded-2xl"></div>

        <div className="h-80 bg-slate-200 rounded-2xl"></div>

      </div>

    </div>

  );

}

export default LoadingSkeleton;