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
  TbHash,
  TbIndentIncrease,
  TbSearch,
  TbTextWrap,
} from "react-icons/tb";
import data from "../utils/languages.json";

type Toolbar = {
  language: string;
  setLanguage: (newLanguage: string) => void;
  lineNumbers: boolean;
  setLineNumbers: Dispatch<SetStateAction<boolean>>;
  wrap: boolean;
  setWrap: Dispatch<SetStateAction<boolean>>;
};

export enum Expiry {
  never = "Never",
  afterRead = "After Read",
  h12 = "12 Hours",
  h24 = "24 Hours",
}

export enum Indentation {
  spaces = "Spaces",
  tabs = "Tabs",
}

export default (({
  language,
  setLanguage,
  lineNumbers,
  setLineNumbers,
  wrap,
  setWrap,
}) => {
  const [languagesOpen, setLanguagesOpen] = useState(false);
  const [query, setQuery] = useState("");
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const languageButtonRef = useRef<HTMLButtonElement>(null);

  const [expiry, setExpiry] = useState<Expiry>(Expiry.never);
  const [expiryOpen, setExpiryOpen] = useState(false);
  const expiryDropdownRef = useRef<HTMLUListElement>(null);
  const expiryButtonRef = useRef<HTMLButtonElement>(null);

  const [indentation, setIndentation] = useState<Indentation>(
    Indentation.spaces,
  );
  const [indentOpen, setIndentOpen] = useState(false);
  const indentDropdownRef = useRef<HTMLUListElement>(null);
  const indentButtonRef = useRef<HTMLButtonElement>(null);

  const filteredLanguages = data.languages.filter(
    (language) =>
      language.name.toLowerCase().includes(query.toLowerCase()) ||
      language.extension.toLowerCase().includes(query.toLowerCase()),
  );

  const getExpiryIcon = () => {
    switch (expiry) {
      case Expiry.never:
        return <TbClockPlus />;
      case Expiry.afterRead:
        return <TbClockX />;
      case Expiry.h12:
        return <TbClock12 />;
      case Expiry.h24:
        return <TbClock24 />;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target as Node) &&
        languageButtonRef.current &&
        !languageButtonRef.current.contains(event.target as Node)
      )
        setLanguagesOpen(false);

      if (
        expiryDropdownRef.current &&
        !expiryDropdownRef.current.contains(event.target as Node) &&
        expiryButtonRef.current &&
        !expiryButtonRef.current.contains(event.target as Node)
      )
        setExpiryOpen(false);

      if (
        indentDropdownRef.current &&
        !indentDropdownRef.current.contains(event.target as Node) &&
        indentButtonRef.current &&
        !indentButtonRef.current.contains(event.target as Node)
      )
        setIndentOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed bottom-0 left-1/2 mb-10 flex -translate-x-1/2 items-center rounded-lg border border-neutral-800 bg-neutral-900 px-2 shadow-2xl">
      <div className="flex items-center">
        <Tooltip
          title="Languages"
          target="⌥ L"
          className="-mt-[80px]"
          condition={languagesOpen}
        >
          <button
            className="group my-2 flex items-center rounded-md py-2 pl-2 pr-1.5 text-sm hover:bg-neutral-50/5 active:bg-neutral-50/10"
            onClick={() => setLanguagesOpen((l) => !l)}
            ref={languageButtonRef}
          >
            {language}
            {languagesOpen ? (
              <TbChevronDown className="ml-1 text-xs" />
            ) : (
              <TbChevronDown className="ml-1 text-xs" />
            )}
          </button>
          {languagesOpen && (
            <div
              className="absolute left-1/2 w-56 -translate-x-1/2 -translate-y-[300px] rounded-md border border-neutral-800 bg-neutral-900 text-xs"
              ref={languageDropdownRef}
            >
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center">
                  <TbSearch />
                  <input
                    placeholder="Search language..."
                    className="ml-2 w-32 bg-transparent outline-none"
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <button
                  className="rounded border border-neutral-800 px-1.5 py-1 hover:bg-neutral-500/5 active:bg-neutral-500/10"
                  onClick={() => setLanguagesOpen(false)}
                >
                  Esc
                </button>
              </div>
              <hr className="border-neutral-800" />
              <ul className="h-48 overflow-y-auto p-1">
                {filteredLanguages.length > 0 ? (
                  filteredLanguages.map((language, index) => (
                    <li key={index}>
                      <button
                        className="flex w-full justify-start rounded p-2 hover:bg-neutral-50/5"
                        onClick={() => {
                          setLanguage(language.name);
                          setQuery("");
                          setLanguagesOpen(false);
                        }}
                      >
                        {language.name}
                      </button>
                    </li>
                  ))
                ) : (
                  <li>No results found</li>
                )}
              </ul>
            </div>
          )}
        </Tooltip>
        <Tooltip title="Expiry" target="⌥ E" condition={expiryOpen}>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-neutral-50/5"
            ref={expiryButtonRef}
            onClick={() => setExpiryOpen((e) => !e)}
          >
            {getExpiryIcon()}
          </button>
          {expiryOpen && (
            <ul
              ref={expiryDropdownRef}
              className="absolute left-1/2 w-32 -translate-x-1/2 -translate-y-[193px] rounded-md border border-neutral-800 bg-neutral-900 p-1 text-xs"
            >
              {Object.values(Expiry).map((item, index) => (
                <li key={index}>
                  <button
                    className="flex w-full items-center justify-between rounded p-2 hover:bg-neutral-50/5"
                    onClick={() => {
                      setExpiry(item as Expiry);
                      setExpiryOpen(false);
                    }}
                  >
                    {item}
                    {expiry === (item as Expiry) && <TbCheck />}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Tooltip>
        <Tooltip title="Wrap" target="⌥ W">
          <button
            className={clsx(
              "flex h-9 w-9 items-center justify-center rounded-md hover:bg-neutral-50/5",
              !wrap && "text-neutral-500",
            )}
            onClick={() => setWrap((w) => !w)}
          >
            <TbTextWrap />
          </button>
        </Tooltip>
        <Tooltip title="Line Numbers" target="⌥ O">
          <button
            className={clsx(
              "flex h-9 w-9 items-center justify-center rounded-md hover:bg-neutral-50/5",
              !lineNumbers && "text-neutral-500",
            )}
            onClick={() => setLineNumbers((l) => !l)}
          >
            <TbHash />
          </button>
        </Tooltip>
        <Tooltip title="Indentation" target="⌥ I" condition={indentOpen}>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-neutral-50/5"
            onClick={() => setIndentOpen((i) => !i)}
            ref={indentButtonRef}
          >
            <TbIndentIncrease />
          </button>
          {indentOpen && (
            <ul
              ref={indentDropdownRef}
              className="absolute left-1/2 w-32 -translate-x-1/2 -translate-y-[129px] rounded-md border border-neutral-800 bg-neutral-900 p-1 text-xs"
            >
              {Object.values(Indentation).map((item, index) => (
                <li key={index}>
                  <button
                    className="flex w-full items-center justify-between rounded p-2 hover:bg-neutral-50/5"
                    onClick={() => {
                      setIndentation(item as Indentation);
                      setIndentOpen(false);
                    }}
                  >
                    {item}
                    {indentation === (item as Indentation) && <TbCheck />}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Tooltip>
      </div>
      <div className="mx-1.5 h-12 w-px bg-neutral-800" />
      <button className="group my-2 flex items-center whitespace-nowrap rounded-md bg-sky-600 px-2.5 py-2 text-sm transition-colors hover:bg-sky-700 active:bg-sky-800">
        Create Snip
        <div className="ml-2 flex items-center tracking-tighter text-sky-400">
          ⌘S
        </div>
      </button>
    </div>
  );
}) as FC<Toolbar>;

const Tooltip: FC<{
  title: string;
  target: string;
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
          <span className="ml-2 text-neutral-500">{target}</span>
        </div>
      )}
    </div>
  );
};
