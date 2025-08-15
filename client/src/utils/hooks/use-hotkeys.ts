import { useEffect } from "react";

type KeyCombo = {
  ctrlKey?: boolean;
  metaKey?: boolean;
  altKey?: boolean;
  key: string;
};

type Callback = (event: KeyboardEvent) => void;

export default (keyCombos: KeyCombo[], callback: Callback): void => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      for (const keyCombo of keyCombos) {
        if (
          (keyCombo.ctrlKey === undefined ||
            keyCombo.ctrlKey === event.ctrlKey) &&
          (keyCombo.altKey === undefined || keyCombo.altKey === event.altKey) &&
          (keyCombo.metaKey === undefined ||
            keyCombo.metaKey === event.metaKey) &&
          event.key.toLowerCase() === keyCombo.key.toLowerCase()
        ) {
          event.preventDefault();
          callback(event);
          return;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [keyCombos, callback]);
};
