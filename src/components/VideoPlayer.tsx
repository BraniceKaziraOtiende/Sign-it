import { useSearch } from '../context/SearchContext';

export function VideoPlayer() {
  const { currentVideo } = useSearch();

  if (!currentVideo) {
    return (
      <div className="w-full aspect-video bg-slate-100 rounded-lg shadow-md flex flex-col items-center justify-center">
        <div className="text-5xl text-slate-300 mb-2">
          <svg xmlns="./public/logo.svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-5h4c.55 0 1-.45 1-1V8c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1z"/>
          </svg>
        </div>
        <p className="text-slate-500 font-medium">Enter a word to play a video</p>
      </div>
    );
  }

  // Add autoplay=1 to URL if not already present
  const videoUrl = new URL(currentVideo.url);
  if (!videoUrl.searchParams.has('autoplay')) {
    videoUrl.searchParams.append('autoplay', '1');
  }
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative overflow-hidden rounded-xl shadow-lg bg-black">
        {/* 16:9 aspect ratio wrapper */}
        <div className="aspect-video w-full">
          <iframe
            src={videoUrl.toString()}
            title={`Video for ${currentVideo.word}`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
      
      {/* Video info section */}
      <div className="mt-4 px-2 py-3 bg-white rounded-lg shadow-sm border border-slate-100">
        <h3 className="text-center text-lg font-medium text-slate-800">
          Now Playing: <span className="text-indigo-600 font-bold">{currentVideo.word}</span>
        </h3>
      </div>
    </div>
  );
}