export default function Hero({ title, body }: { title: string; body: string }) {
  return (
    <div className="absolute text-center p-4 md:p-8 md:w-1/2 md:h-fit md:top-1/3 lg:w-1/3 lg:h-1/3 lg:left-48 z-10">
      <div className="flex flex-col justify-center align-middle">
        <span className="text-white text-4xl font-bold animate-slide-in-left">{title}</span>
        <br />
        <span className="text-white text-2xl animate-fade-in">{body}</span>
      </div>
    </div>
  );
}
