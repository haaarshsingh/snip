"use client";

import theme from "@/utils/theme";
import languages from "@/utils/languages";
import Textarea from "@uiw/react-codemirror";
import clsx from "clsx";
import { FC, useState } from "react";
import { TbPlus, TbX } from "react-icons/tb";
import Toolbar from "./Toolbar";
import { EditorView } from "codemirror";

export default () => {
  const [language, setLanguage] = useState("Autodetect");
  const [lineNumbers, setLineNumbers] = useState(true);
  const [wrap, setWrap] = useState(false);

  return (
    <main>
      <input
        placeholder="New Snip..."
        className="w-full bg-transparent px-4 py-4 outline-none"
      />
      <Tabs />
      <Textarea
        value=""
        height="86vh"
        autoFocus
        basicSetup={{
          autocompletion: false,
          searchKeymap: false,
          historyKeymap: false,
          lineNumbers: lineNumbers,
        }}
        extensions={[
          // @ts-expect-error
          language === "Autodetect" ? [] : [languages[language]()],
          wrap ? EditorView.lineWrapping : [],
        ]}
        theme={theme}
        data-gramm="false"
        data-gramm_editor="false"
        data-enable-grammarly="false"
      />
      <Toolbar
        language={language}
        setLanguage={setLanguage}
        lineNumbers={lineNumbers}
        setLineNumbers={setLineNumbers}
        wrap={wrap}
        setWrap={setWrap}
      />
    </main>
  );
};

const Tabs: FC = () => {
  const [tabs, setTabs] = useState([{ id: 1, title: "Untitled File" }]);
  const [selectedTab, setSelectedTab] = useState(1);

  const addTab = () => {
    const newId = tabs.length ? tabs[tabs.length - 1].id + 1 : 1;
    setTabs([...tabs, { id: newId, title: "Untitled File" }]);
    setSelectedTab(newId);
  };

  const removeTab = (id: number) => {
    if (tabs.length === 1) return;
    setTabs(tabs.filter((tab) => tab.id !== id));
    if (selectedTab === id && tabs.length > 1) setSelectedTab(tabs[0].id);
  };

  const updateTabTitle = (id: number, newTitle: string) => {
    setTabs(
      tabs.map((tab) => (tab.id === id ? { ...tab, title: newTitle } : tab)),
    );
  };

  return (
    <div className="relative mb-2 flex items-center justify-between border-b border-t border-b-neutral-800 border-t-neutral-800 p-2">
      <div className="w-tabs flex flex-wrap items-center gap-1 overflow-x-scroll">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={clsx(
              "flex-tab flex cursor-pointer flex-row items-center rounded-md px-2 py-1.5",
              selectedTab === tab.id
                ? "bg-neutral-900"
                : "hover:bg-neutral-900/75",
            )}
            role="tab"
            aria-selected={selectedTab === tab.id}
            tabIndex={0}
            onClick={() => setSelectedTab(tab.id)}
            style={{ width: "100%" }}
          >
            {selectedTab !== tab.id ? (
              <span className="ml-1 mr-2 w-full min-w-16 select-none truncate text-xs text-neutral-600">
                {tab.title === "" ? "Untitled File" : tab.title}
              </span>
            ) : (
              <input
                value={tab.title === "Untitled File" ? "" : tab.title}
                onChange={(e) => updateTabTitle(tab.id, e.target.value)}
                placeholder="Untitled File"
                className="ml-1 mr-2 w-full min-w-16 bg-transparent text-xs outline-none"
              />
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeTab(tab.id);
              }}
              className="rounded p-1 text-sm text-neutral-600 transition-colors hover:bg-neutral-50/5 hover:text-neutral-400"
            >
              <TbX />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={addTab}
        className="absolute right-0 mr-2 flex items-center justify-center rounded-md p-1.5 hover:bg-neutral-50/10"
      >
        <TbPlus />
      </button>
    </div>
  );
};
