import Textarea from "@uiw/react-codemirror";

export default () => {
  return (
    <main>
      <input placeholder="Title..." />
      <Textarea
        value=""
        height="80vh"
        autoFocus
        basicSetup={{
          autocompletion: false,
          searchKeymap: false,
          historyKeymap: false,
          lineNumbers: true,
        }}
      />
    </main>
  );
};
