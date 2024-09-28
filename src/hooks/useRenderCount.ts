/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";

function useRenderCount() {
  const renderCountRef = useRef(0);
  useEffect(() => {
    renderCountRef.current++;
  });
  return renderCountRef.current;
}

export { useRenderCount };