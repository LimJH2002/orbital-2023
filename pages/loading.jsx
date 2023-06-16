import React from 'react'

const Loading = () => {
  return (
    <div className="grid h-screen place-items-center">
      <div
        class="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-slate-50"
        role="status"
      >
        <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)] text-slate-50">
          Loading...
        </span>
      </div>
    </div>
  );
}

export default Loading