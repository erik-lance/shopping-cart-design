import { useEffect } from "react";
import { hotjar } from "react-hotjar";

const useHotjar = () => {
  const hotjarSiteId = Number(process.env.NEXT_PUBLIC_HOTJAR_ID);
  const hotjarVersion = Number(process.env.NEXT_PUBLIC_HOTJAR_VERSION);

  useEffect(() => {
    if (isNaN(hotjarSiteId) || isNaN(hotjarVersion)) {
      console.error(
        "Invalid NEXT_PUBLIC_HOTJAR_ID or NEXT_PUBLIC_HOTJAR_VERSION"
      );
      return;
    }

    hotjar.initialize(hotjarSiteId, hotjarVersion);
  }, [hotjarSiteId, hotjarVersion]);
};

export default useHotjar;
