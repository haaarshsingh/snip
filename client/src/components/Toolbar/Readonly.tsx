"use client";

import clsx from "clsx";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
  type FC,
  type ReactNode,
} from "react";
import {
  TbCheck,
  TbChevronDown,
  TbClock12,
  TbClock24,
  TbClockPlus,
  TbClockX,
  TbCode,
  TbCopy,
  TbDownload,
  TbFile,
  TbGitFork,
  TbHash,
  TbIndentIncrease,
  TbLink,
  TbSearch,
  TbTextWrap,
} from "react-icons/tb";
import data from "../../utils/languages.json";
import useHotkeys from "@/utils/hooks/useHotkeys";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Toolbar = {
  language: string;
  slug: string;
  content: string;
};

export default (({ language, slug, content }) => {
  const router = useRouter();

  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  useEffect(() => {
    if (linkCopied) {
      const timer = setTimeout(() => setLinkCopied(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [linkCopied]);

  useHotkeys([{ metaKey: true, key: "s" }], (e) => {
    e.preventDefault();
  });

  return (
    <div className="fixed bottom-0 left-1/2 mb-10 flex -translate-x-1/2 flex-col items-center rounded-lg border border-neutral-800 bg-neutral-900 px-2 shadow-2xl xs:flex-row">
      <div className="flex items-center">
        <div className="group my-2 flex cursor-default items-center rounded-md py-2 pl-2 pr-1.5">
          <TbCode className="mr-1.5 mt-px text-xs" />
          {language}
        </div>
        <div className="mb-1.5 h-px w-full bg-neutral-800 xs:mb-0 xs:ml-1.5 xs:mr-2 xs:h-12 xs:w-px" />
        <Tooltip title="Copy Link">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-neutral-50/5"
            onClick={() => {
              setLinkCopied((c) => !c);
              navigator.clipboard.writeText(`https://snip.tf/${slug}`);
            }}
          >
            {linkCopied ? <TbCheck /> : <TbLink />}
          </button>
        </Tooltip>
        <Tooltip title="Copy Content">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-neutral-50/5"
            onClick={() => {
              setCopied((c) => !c);
              navigator.clipboard.writeText(content);
            }}
          >
            {copied ? <TbCheck /> : <TbCopy />}
          </button>
        </Tooltip>
        <Tooltip title="Download">
          <button className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-neutral-50/5">
            <TbDownload />
          </button>
        </Tooltip>
        <Tooltip title="View Raw">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-neutral-50/5"
            onClick={() => router.push(`/raw/${slug}`)}
          >
            <TbFile />
          </button>
        </Tooltip>
        <Tooltip title="Fork" target="⌥F">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-neutral-50/5"
            onClick={() => router.push(`/fork/${slug}`)}
          >
            <TbGitFork />
          </button>
        </Tooltip>
      </div>
      <div className="mb-1.5 h-px w-full bg-neutral-800 xs:mb-0 xs:ml-1.5 xs:mr-2 xs:h-12 xs:w-px" />
      <Link
        className="group my-2 flex items-center whitespace-nowrap rounded-md bg-sky-600 px-2.5 py-2 text-sm transition-colors hover:bg-sky-700 active:bg-sky-800"
        href="/"
      >
        New Snip
        <div className="ml-2 flex items-center tracking-tighter text-sky-400">
          ⌘⌥N
        </div>
      </Link>
    </div>
  );
}) as FC<Toolbar>;

const Tooltip: FC<{
  title: string;
  target?: string;
  className?: string;
  children: ReactNode;
  condition?: boolean;
}> = ({ title, target, className, children, condition }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isHovered) timer = setTimeout(() => setIsVisible(true), 1000);
    else setIsVisible(false);

    return () => clearTimeout(timer);
  }, [isHovered]);

  const displayTooltip = isVisible && !condition;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {displayTooltip && (
        <div
          className={clsx(
            "absolute left-1/2 -mt-[72px] -translate-x-1/2 select-none whitespace-nowrap rounded-md bg-neutral-800 p-2 text-xs transition-opacity duration-300 ease-in-out",
            className,
            isVisible ? "opacity-100" : "opacity-0",
          )}
        >
          <span>{title}</span>
          {target && <span className="ml-2 text-neutral-500">{target}</span>}
        </div>
      )}
    </div>
  );
};
