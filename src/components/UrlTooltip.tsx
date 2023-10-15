"use client";
import Tooltip from "@/components/Tooltip";
import { useClientState } from "@/utils/hooks";

function UrlTooltip({
  children,
  path,
}: {
  children: React.ReactNode;
  path: string;
}) {
  const [url] = useClientState<string>({
    default: path,
    getState: () => window.location.origin + path,
  });
  return <Tooltip tip={url}>{children}</Tooltip>;
}

export default UrlTooltip;
