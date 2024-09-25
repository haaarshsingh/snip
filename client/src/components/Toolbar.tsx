import clsx from "clsx";
import { useState } from "react";
import {
  TbChevronDown,
  TbClockX,
  TbHash,
  TbIndentIncrease,
  TbSearch,
  TbTextWrap,
} from "react-icons/tb";
import data from "../utils/languages.json";

export default () => {
  const [languagesOpen, setLanguagesOpen] = useState(false);
  const [query, setQuery] = useState("");

  const [lineNumbers, setLineNumbers] = useState(true);
  const [wrap, setWrap] = useState(false);

  const filteredLanguages = data.languages.filter(
    (language) =>
      language.name.toLowerCase().includes(query.toLowerCase()) ||
      language.extension.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="fixed bottom-0 left-1/2 mb-10 flex -translate-x-1/2 items-center rounded-lg border border-neutral-800 bg-neutral-900 px-2 shadow-2xl">
      <div className="flex items-center">
        <div className="relative">
          <button
            className="group my-2 flex items-center rounded-md py-2 pl-2 pr-1.5 text-sm hover:bg-neutral-50/5 active:bg-neutral-50/10"
            onClick={() => setLanguagesOpen((l) => !l)}
          >
            Autodetect
            <TbChevronDown className="ml-1 text-xs" />
          </button>
          {languagesOpen && (
            <div className="absolute left-1/2 w-56 -translate-x-1/2 -translate-y-[300px] rounded-md border border-neutral-800 bg-neutral-900 text-xs">
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
                      <button className="flex w-full justify-start rounded p-2 hover:bg-neutral-50/5">
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
        </div>
        <button className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-neutral-50/5">
          <TbClockX />
        </button>
        <button
          className={clsx(
            "flex h-9 w-9 items-center justify-center rounded-md hover:bg-neutral-50/5",
            !wrap && "text-neutral-500",
          )}
          onClick={() => setWrap((w) => !w)}
        >
          <TbTextWrap />
        </button>
        <button
          className={clsx(
            "flex h-9 w-9 items-center justify-center rounded-md hover:bg-neutral-50/5",
            !lineNumbers && "text-neutral-500",
          )}
          onClick={() => setLineNumbers((l) => !l)}
        >
          <TbHash />
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-neutral-50/5">
          <TbIndentIncrease />
        </button>
      </div>
      <div className="mx-1.5 h-12 w-px bg-neutral-800" />
      <button className="group my-2 flex items-center rounded-md bg-sky-600 px-2.5 py-2 text-sm transition-colors hover:bg-sky-700 active:bg-sky-800">
        Create Snip
        <div className="ml-2 flex items-center tracking-tighter text-sky-400">
          ⌘S
        </div>
      </button>
    </div>
  );
};
