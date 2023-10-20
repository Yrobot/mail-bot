"use client";
import {
  useState,
  useMemo,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useDebounce } from "ahooks";
import cn from "classnames";

import Editor from "@monaco-editor/react";
import { constrainedEditor } from "constrained-editor-plugin";

const TYPE_CODE = `type KeyTypes = "from" | "to" | "cc" | "bcc" | "subject" | "text" | "html" | string;
type ValueTypes = string | number | undefined;
type Email = Record<KeyTypes, ValueTypes>;`;
const PRE_CODE = `<T extends Email>(req: T): Email => ( // 在下方更新转换逻辑`;
const LAST_CODE = `)`;

const CODE_LABEL = "pipeStr";

const getErrorTipFromMonaco = (monaco: any): null | string => {
  if (!monaco?.editor?.getModelMarkers) return "获取不到 monaco.editor";
  const maskers: { message: string; owner: string; startLineNumber: number }[] =
    monaco.editor.getModelMarkers({}) || [];
  const source = maskers?.[0];
  if (!source) return null;
  const { message, owner, startLineNumber } = source;
  return `Line[${startLineNumber}]: ${message}`;
};

type CodeEditorRef = {
  getErrorTip: () => string | null;
};

const CodeEditor = forwardRef<
  CodeEditorRef,
  { code: string; setCode: (code: string) => void }
>(function CodeEditor({ code, setCode }, ref) {
  const monacoObjects = useRef<{
    editor?: any;
    monaco?: any;
  }>({});

  useImperativeHandle(ref, () => ({
    // 最后一个错误信息相对于编辑时间延迟500ms多一点
    getErrorTip() {
      const tip = getErrorTipFromMonaco(monacoObjects.current?.monaco);
      // console.log(tip);
      return tip;
    },
  }));

  const onEditMount = ({ editor, monaco }: any) => {
    monacoObjects.current = {
      editor,
      monaco,
    };
    // define editable code area
    const constrainedInstance = constrainedEditor(monaco);
    const model = editor.getModel();
    constrainedInstance.initializeIn(editor);
    let restrictions = [];

    const startIndex = `${TYPE_CODE}\n${PRE_CODE}\n`.split("\n").length;
    const lastIndex = code.split("\n").length;
    const EDIT_RANGE = [startIndex, 1, lastIndex, 1];
    restrictions.push({
      range: EDIT_RANGE,
      label: CODE_LABEL,
    });
    constrainedInstance.addRestrictionsTo(model, restrictions);
    model.deltaDecorations(
      [],
      [
        {
          range: new monaco.Range(...EDIT_RANGE),
          options: {
            className: "editable-code",
          },
        },
      ],
    );

    // validation 的回调，可以在这里获取到lint的错误信息
    // 经过测试，基本对后一个错误回调相对于编辑时间延迟500ms多一点
    // https://github.com/microsoft/monaco-editor/issues/1541
    // editor.onDidChangeModelDecorations(() => {
    //   const tip = getErrorTipFromMonaco(monaco);
    // });

    // get editable area code when changes
    model.onDidChangeContentInEditableRange(
      (
        currentlyChangedContent: any,
        allValuesInEditableRanges: { [CODE_LABEL]: string },
        currentEditableRangeObject: any,
      ) => {
        let newCode = allValuesInEditableRanges[CODE_LABEL];
        // remove last \n
        while (newCode && newCode.endsWith("\n")) {
          newCode = newCode.slice(0, -1);
        }
        setCode(newCode);
      },
    );
  };
  return (
    <Editor
      defaultValue={code}
      language="typescript"
      theme="vs-dark"
      height="200px"
      width="100%"
      options={{
        minimap: {
          enabled: false,
        },
        // lineNumbers: "off",
        showFoldingControls: "never",
        lineNumbersMinChars: 2,
        scrollBeyondLastLine: false,
      }}
      onMount={(editor, monaco) => {
        onEditMount({ editor, monaco });
      }}
    />
  );
});

const DEFAULT_MAX_LENGTH = 1000;

const DEFAULT_CODE = `{
  ...req,
}`;

export default function PipeCodeEditor({
  value,
  onConfirm,
  onCancel,
}: {
  value: string;
  onConfirm?: (value: string) => void;
  onCancel?: () => void;
}) {
  const [code, setCode] = useState(value || DEFAULT_CODE);
  const editorRef = useRef<CodeEditorRef>(null);
  const { base, errorTip } = useMemo(
    () => ({
      base: code,
      errorTip: (() => {
        if (code.length > DEFAULT_MAX_LENGTH)
          return `代码长度不能超过${DEFAULT_MAX_LENGTH}个字符`;
        return editorRef.current?.getErrorTip?.();
      })(),
    }),
    [useDebounce(code, { wait: 1000 })],
  );
  const isChecking = code !== base;
  return (
    <div className="w-full">
      <CodeEditor
        code={`${TYPE_CODE}\n${PRE_CODE}\n${code}\n${LAST_CODE}`}
        setCode={setCode}
        ref={editorRef}
      />
      <div
        className={cn("mt-2 text-sm", {
          ...(isChecking
            ? {
                "text-gray-500": true,
              }
            : {
                "text-red-500": !!errorTip,
                "text-green-500": !errorTip,
              }),
        })}
      >
        {isChecking ? "代码检测中..." : errorTip ? errorTip : "代码符合规范"}
      </div>
      <div className="flex flex-row justify-end space-x-2">
        <button
          className="btn"
          type="button"
          onClick={() => {
            onCancel?.();
          }}
        >
          取消
        </button>
        <button
          className="btn btn-neutral"
          disabled={isChecking || !!errorTip}
          onClick={() => {
            onConfirm?.(code);
          }}
        >
          确认
        </button>
      </div>
    </div>
  );
}

// type KeyTypes =
//   | "from"
//   | "to"
//   | "cc"
//   | "bcc"
//   | "subject"
//   | "text"
//   | "html"
//   | string;
// type ValueTypes = string | number | undefined;
// type Email = Record<KeyTypes, ValueTypes>;
// <T extends Email>(req: T): Email => ({
//   ...req,
// });
