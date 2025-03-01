"use client";

import { Dispatch, FC, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import theme from "@/utils/theme";
import languages from "@/utils/languages";
import Textarea from "@uiw/react-codemirror";
import clsx from "clsx";
import { TbPlus, TbX } from "react-icons/tb";
import Toolbar, { Expiry } from "./Toolbar/Toolbar";
import { EditorView } from "codemirror";
import { ReactSortable } from "react-sortablejs";
import useHotkeys from "@/utils/hooks/useHotkeys";
import Readonly from "./Toolbar/Readonly";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { toast } from "sonner";

type EditorProps = {
  title: string;
  snips: Snip[];
  readOnly: boolean;
  _id: string;
};

export type Snip = {
  _id: string;
  title: string;
  content: string;
  language: string;
};

type Tab = {
  id: number;
  title: string;
  content: string;
  language: string;
  _id?: string;
};

export default (({ readOnly, title, snips, _id }) => {
  const [snipTitle, setTitle] = useState(title || "");
  const [lineNumbers, setLineNumbers] = useState(true);
  const [wrap, setWrap] = useState(false);
  const [expiry, setExpiry] = useState<Expiry>(Expiry.never);

  const [disabled, setDisabled] = useState(false);

  const starterTabs =
    typeof snips === "undefined"
      ? [{ id: 1, title: "Untitled File", content: "", language: "Autodetect" }]
      : snips.map(
          (snip, index) =>
            ({
              id: index + 1,
              title: snip.title,
              content: snip.content,
              language: snip.language,
              _id: snip._id,
            }) as Tab,
        );

  const [tabs, setTabs] = useState<Tab[]>(starterTabs);
  const [selectedTab, setSelectedTab] = useState(1);

  const router = useRouter();

  const updateTabContent = (id: number, content: string) => {
    setTabs((tabs) =>
      tabs.map((tab) => (tab.id === id ? { ...tab, content } : tab)),
    );
  };

  const updateTabTitle = (id: number, newTitle: string) => {
    setTabs((tabs) =>
      tabs.map((tab) => (tab.id === id ? { ...tab, title: newTitle } : tab)),
    );

    if (newTitle.indexOf(".") !== -1) {
      newTitle.substring(newTitle.indexOf(".") + 1);
    }
  };

  const updateTabLanguage = (id: number, newLanguage: string) => {
    setTabs((tabs) =>
      tabs.map((tab) =>
        tab.id === id ? { ...tab, language: newLanguage } : tab,
      ),
    );
  };

  const getSelectedTabContent = () => {
    const currentTab = tabs.find((tab) => tab.id === selectedTab);
    return currentTab ? currentTab.content : "";
  };

  const getSelectedTabLanguage = () => {
    const currentTab = tabs.find((tab) => tab.id === selectedTab);
    return currentTab ? currentTab.language : "Autodetect";
  };

  const getSelectedTabSlug = () => {
    const currentTab = tabs.find((tab) => tab.id === selectedTab);
    return currentTab ? currentTab._id : "";
  };

  const getExpiryDate = () => {
    switch (expiry) {
      case Expiry.h12:
        return 12;
      case Expiry.h24:
        return 24;
    }
  };

  const createSnip = async () => {
    setDisabled(true);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const expiryAt = new Date();
    expiryAt.setUTCDate(expiryAt.getUTCHours() + 24);

    const raw = JSON.stringify({
      title: snipTitle,
      ...(expiry !== Expiry.never && { expiry_at: expiryAt }),
      snips: tabs.map((tab) => ({
        title: tab.title,
        content: tab.content,
        language: tab.language,
      })),
    });

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: raw,
    };

    toast.promise(
      (async () => {
        const response = await fetch(
          "https://api.snip.tf/snips/create",
          requestOptions,
        );

        if (!response.ok) {
          setDisabled(false);
          throw new Error("Failed to create snip");
        }

        const result = await response.json();
        router.push(`/${result.data._id}`);

        return result;
      })(),
      {
        loading: "Creating snip...",
        success: () => "Snip created",
        error: "Failed to create snip, please try again",
      },
    );
  };

  const downloadZip = () => {
    const zip = new JSZip();
    snips?.forEach((snip) => {
      zip.file(snip.title, snip.content);
    });

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, `${title || "Untitled"}.zip`);
    });
  };

  return (
    <div className={readOnly ? "readonly" : ""}>
      <input
        placeholder="New Snip..."
        value={snipTitle}
        className="w-full bg-transparent px-4 py-4 outline-none"
        readOnly={readOnly}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Tabs
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        setTabs={setTabs}
        updateTabTitle={updateTabTitle}
        currentTab={tabs.find((tab) => tab.id === selectedTab)}
        readOnly={readOnly}
      />
      <Textarea
        value={getSelectedTabContent()}
        height="86vh"
        autoFocus
        readOnly={readOnly}
        basicSetup={{
          autocompletion: false,
          searchKeymap: false,
          historyKeymap: false,
          lineNumbers: lineNumbers,
        }}
        extensions={[
          getSelectedTabLanguage() === "Autodetect"
            ? []
            : // @ts-expect-error
              [languages[getSelectedTabLanguage()]()],
          wrap ? EditorView.lineWrapping : [],
        ]}
        theme={theme}
        onChange={(value) => updateTabContent(selectedTab, value)}
        data-gramm="false"
        data-gramm_editor="false"
        data-enable-grammarly="false"
      />
      {readOnly ? (
        <Readonly
          language={getSelectedTabLanguage()}
          _id={_id!}
          selectedTabSlug={getSelectedTabSlug()}
          content={getSelectedTabContent()}
          downloadZip={downloadZip}
        />
      ) : (
        <Toolbar
          createSnip={createSnip}
          disabled={disabled}
          language={getSelectedTabLanguage()}
          setLanguage={(newLanguage) =>
            updateTabLanguage(selectedTab, newLanguage)
          }
          lineNumbers={lineNumbers}
          setLineNumbers={setLineNumbers}
          wrap={wrap}
          setWrap={setWrap}
          expiry={expiry}
          setExpiry={setExpiry}
        />
      )}
    </div>
  );
}) as FC<Partial<EditorProps>>;

const Tabs: FC<{
  tabs: Tab[];
  selectedTab: number;
  setSelectedTab: (id: number) => void;
  setTabs: Dispatch<SetStateAction<Tab[]>>;
  updateTabTitle: (id: number, newTitle: string) => void;
  currentTab: Tab | undefined;
  readOnly?: boolean;
}> = ({
  tabs,
  selectedTab,
  setSelectedTab,
  setTabs,
  updateTabTitle,
  currentTab,
  readOnly,
}) => {
  useHotkeys([{ ctrlKey: true, key: "T" }], (e) => {
    e.preventDefault();
    addTab();
  });

  useHotkeys([{ ctrlKey: true, key: "W" }], (e) => {
    e.preventDefault();
    if (currentTab) removeTab(currentTab?.id);
  });

  const addTab = () => {
    const newId = tabs.length ? tabs[tabs.length - 1].id + 1 : 1;
    setTabs([
      ...tabs,
      {
        id: newId,
        title: "Untitled File",
        content: "",
        language: "Autodetect",
      },
    ]);
    setSelectedTab(newId);
  };

  const removeTab = (id: number) => {
    if (tabs.length === 1) return;

    const tabIndex = tabs.findIndex((tab) => tab.id === id);

    setTabs((prevTabs) => {
      const updatedTabs = prevTabs.filter((tab) => tab.id !== id);

      if (tabIndex === 0) setSelectedTab(updatedTabs[0]?.id || 0);
      else setSelectedTab(updatedTabs[tabIndex - 1]?.id || updatedTabs[0]?.id);

      return updatedTabs;
    });
  };

  return (
    <div className="relative mb-2 flex items-center justify-between border-b border-t border-b-neutral-800 border-t-neutral-800 p-2">
      <ReactSortable
        list={tabs}
        setList={setTabs}
        direction="horizontal"
        animation={150}
        className={clsx(
          "flex flex-wrap items-center gap-1",
          readOnly ? "w-full" : "w-tabs",
        )}
      >
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={clsx(
              "flex h-9 flex-tab cursor-pointer flex-row items-center rounded-md border px-2",
              selectedTab === tab.id
                ? "border-neutral-800 bg-neutral-900"
                : "border-neutral-900 hover:bg-neutral-900/75",
            )}
            role="tab"
            aria-selected={selectedTab === tab.id}
            tabIndex={0}
            onClick={() => setSelectedTab(tab.id)}
            style={{ width: "100%" }}
            draggable={false}
          >
            {selectedTab !== tab.id || readOnly ? (
              <span
                className={clsx(
                  "ml-1 mr-2 w-full min-w-16 select-none truncate text-xs",
                  selectedTab !== tab.id && "text-neutral-600",
                )}
              >
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
            {!readOnly && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeTab(tab.id);
                }}
                className="rounded p-1 text-sm text-neutral-600 transition-colors hover:bg-neutral-50/5 hover:text-neutral-400"
                title="Close Tab (^W)"
              >
                <TbX />
              </button>
            )}
          </div>
        ))}
      </ReactSortable>
      {!readOnly && (
        <button
          onClick={addTab}
          className="absolute right-0 mr-2 flex items-center justify-center rounded-md p-1.5 hover:bg-neutral-50/10"
          title="New Tab (^T)"
        >
          <TbPlus />
        </button>
      )}
    </div>
  );
};
