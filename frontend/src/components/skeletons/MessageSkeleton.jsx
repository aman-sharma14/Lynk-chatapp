const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-base-100">
    {skeletonMessages.map((_, idx) => (
      <div key={idx} className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"} animate-pulse`}>
        <div className="chat-image avatar">
          <div className="w-10 h-10 rounded-full bg-base-300" />
        </div>

        <div className="chat-header mb-1">
          <div className="h-4 w-16 bg-base-300 rounded" />
        </div>

        <div className="chat-bubble bg-base-300 p-3 rounded-md w-[200px]" />
      </div>
    ))}
  </div>
  );

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-100">
      {skeletonMessages.map((_, idx) => (
        <div key={idx} className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}>
          <div className="chat-image avatar ">
            <div className="size-10 rounded-full bg-base-300 ">
              <div className="skeleton w-full h-full rounded-full bg-base-300" />
            </div>
          </div>

          <div className="chat-header mb-1 bg-base-300">
            <div className="skeleton h-4 w-16 bg-base-300" />
          </div>

          <div className="chat-bubble bg-transparent p-0 bg-base-300">
            <div className="skeleton h-16 w-[200px] bg-base-300 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
