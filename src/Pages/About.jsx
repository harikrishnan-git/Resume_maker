export default function About() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold border-b-2 border-white pb-4">
          About This App
        </h1>
        <p className="text-lg md:text-xl leading-relaxed">
          This application is designed with simplicity and performance in mind.
          It provides users with a seamless experience through a minimalist
          interface, focusing on functionality and speed. Built with modern
          technologies like React, Tailwind CSS, NodeJs, ExpressJs, MongoDB and
          playwright, it ensures both accessibility and responsiveness across
          all devices.
        </p>
        <p className="text-sm text-gray-400">
          Made with <span className="text-red-500">♥</span> by the development
          team.
        </p>
      </div>
    </div>
  );
}
