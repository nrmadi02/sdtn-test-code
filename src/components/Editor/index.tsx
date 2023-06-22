import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import useUploadImage from "@/hooks/useUploadImage";

interface Props {
    onChange: (value: string) => void
    value: string
}

const Editor = ({ onChange, value }: Props) => {

  const {data, isLoading, isSuccess, onHandleChange} = useUploadImage()

  const selectLocalImage = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      if (input.files) {
        const file = input.files[0];
        file && (await onHandleChange(file));
      }
    };
  };

  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"],
        [{ align: [] }],

        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],

        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],

        ["clean"],
      ],
      handler: {
        image: selectLocalImage,
      },
    },
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "list",
    "indent",
    "size",
    "header",
    "link",
    "image",
    "color",
    "background",
    "clean",
  ];

  const { quill, quillRef } = useQuill({ formats, modules });

  const insertToEditor = (url:string) => {
    const range = quill?.getSelection();
    quill?.insertEmbed(Number(range?.index), "image", url);
  };


  useEffect(() => {
    if(data){
      data.url && insertToEditor(data.url);
    }
  }, [data])

  useEffect(() => {
    if (quill) {
      // quill.getModule("toolbar").addHandler("image", selectLocalImage);
      quill.on("text-change", (delta, oldDelta, source) => {
        onChange(quill.root.innerHTML);
      });
    }
  }, [quill]);

  useEffect(() => {
    if (quill) {
      value && quill.clipboard.dangerouslyPasteHTML(value);
    }
  }, [quill]);

  return (
    <div className="w-full">
      <div
        style={{
          width: "100%",
          height: "max-content",
          minHeight: "200px",
        }}
      >
        <div ref={quillRef} />
      </div>
    </div>
  );
};

export default Editor;
