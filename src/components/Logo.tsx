import React from "react"; 

function Logo({ icon = true, text = true }) {
  return (
    <div className="inline-flex select-none items-center justify-center space-x-2">
      {icon && <img width ='32' height ='32' className="h-8 w-8 select-none" src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDI0MCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNDAiIGhlaWdodD0iMjQwIiByeD0iMTAiIGZpbGw9IiMwMDAwMDAiLz4KPHRleHQgeD0iMTIwIiB5PSIxNjAiIGZvbnQtc2l6ZT0iMTIwIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmZmYiPk1CPC90ZXh0Pgo8L3N2Zz4='/>}
      {text && (
        <span className="text-2xl font-bold tracking-tight">Mail-Bot</span>
      )}
    </div>
  );
}

export default Logo;
