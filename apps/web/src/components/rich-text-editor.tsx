
import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Extension } from "@tiptap/core";

import {
  Undo2,
  Redo2,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Link as LinkIcon,
  ImagePlus,
} from "lucide-react";

// Extensão para controlar o tamanho da fonte
const FontSize = Extension.create({
  name: "fontSize",

  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          fontSize: {
            default: null,

            parseHTML: (element) =>
              element.style.fontSize || null,

            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};

              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },
});

const fontSizes = [
  "12px",
  "14px",
  "16px",
  "18px",
  "24px",
  "32px",
  "48px",
];

type ToolbarButtonProps = {
  icon: React.ElementType;
  title: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

function ToolbarButton({
  icon: Icon,
  title,
  active = false,
  disabled = false,
  onClick,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={`
        flex h-8 w-8 shrink-0 items-center justify-center
        rounded-md transition-colors
        hover:bg-muted
        disabled:cursor-not-allowed disabled:opacity-30
        ${active ? "bg-muted text-primary" : "text-foreground"}
      `}
    >
      <Icon size={17} strokeWidth={1.8} />
    </button>
  );
}

function ToolbarSeparator() {
  return <div className="mx-1 h-6 w-px shrink-0 bg-border" />;
}

export function RichTextEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      FontSize,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
      }),
    ],

    content: `
      <h2>Bem-vindo ao editor!</h2>
      <p>
        Comece a escrever seu conteúdo aqui.
        Selecione os textos para aplicar formatações.
      </p>
    `,

    editorProps: {
      attributes: {
        class: "tiptap-content focus:outline-none",
      },
    },
  });

  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      bold: editor?.isActive("bold"),
      italic: editor?.isActive("italic"),
      underline: editor?.isActive("underline"),
      strike: editor?.isActive("strike"),
      bulletList: editor?.isActive("bulletList"),
      orderedList: editor?.isActive("orderedList"),
    }),
  });

  if (!editor) return null;

  // Inserir ou editar link
  const handleLink = () => {
    const previousUrl = editor.getAttributes("link").href;

    const url = window.prompt(
      "Digite a URL do link:",
      previousUrl || "https://"
    );

    if (url === null) return;

    if (!url.trim()) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  };

  // Inserir imagem através de URL
  const handleImage = () => {
    const url = window.prompt("Digite a URL da imagem:");

    if (!url?.trim()) return;

    editor.chain().focus().setImage({ src: url }).run();
  };

  // Alterar tamanho da fonte
  const handleFontSize = (size: string) => {
    editor
      .chain()
      .focus()
      .setMark("textStyle", { fontSize: size })
      .run();
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-border bg-background h-full">

      {/* TOOLBAR */}
      <div className="
        sticky top-0 z-10 flex flex-wrap items-center
        gap-1 border-b border-border bg-background
        px-3 py-2
      ">

        {/* Histórico */}
        <ToolbarButton
          icon={Undo2}
          title="Desfazer"
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
        />

        <ToolbarButton
          icon={Redo2}
          title="Refazer"
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
        />

        <ToolbarSeparator />

        {/* Tamanho da fonte */}
        <select
          defaultValue="16px"
          aria-label="Tamanho da fonte"
          title="Tamanho da fonte"
          onChange={(event) => handleFontSize(event.target.value)}
          onMouseDown={(event) => event.stopPropagation()}
          className="
            h-8 w-[76px] rounded-md border border-transparent
            bg-transparent px-2 text-sm outline-none
            hover:bg-muted focus:border-ring
          "
        >
          {fontSizes.map((size) => (
            <option key={size} value={size}>
              {size.replace("px", "")}
            </option>
          ))}
        </select>

        <ToolbarSeparator />

        {/* Formatação */}
        <ToolbarButton
          icon={Bold}
          title="Negrito"
          active={!!editorState?.bold}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />

        <ToolbarButton
          icon={Italic}
          title="Itálico"
          active={!!editorState?.italic}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />

        <ToolbarButton
          icon={UnderlineIcon}
          title="Sublinhado"
          active={!!editorState?.underline}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />

        <ToolbarButton
          icon={Strikethrough}
          title="Tachado"
          active={!!editorState?.strike}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        />

        <ToolbarSeparator />

        {/* Alinhamento */}
        <ToolbarButton
          icon={AlignLeft}
          title="Alinhar à esquerda"
          onClick={() =>
            editor.chain().focus().setTextAlign("left").run()
          }
        />

        <ToolbarButton
          icon={AlignCenter}
          title="Centralizar"
          onClick={() =>
            editor.chain().focus().setTextAlign("center").run()
          }
        />

        <ToolbarButton
          icon={AlignRight}
          title="Alinhar à direita"
          onClick={() =>
            editor.chain().focus().setTextAlign("right").run()
          }
        />

        <ToolbarButton
          icon={AlignJustify}
          title="Justificar"
          onClick={() =>
            editor.chain().focus().setTextAlign("justify").run()
          }
        />

        <ToolbarSeparator />

        {/* Listas */}
        <ToolbarButton
          icon={List}
          title="Lista com marcadores"
          active={!!editorState?.bulletList}
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
        />

        <ToolbarButton
          icon={ListOrdered}
          title="Lista numerada"
          active={!!editorState?.orderedList}
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
        />

        <ToolbarSeparator />

        {/* Inserção */}
        <ToolbarButton
          icon={LinkIcon}
          title="Inserir link"
          onClick={handleLink}
        />

        <ToolbarButton
          icon={ImagePlus}
          title="Inserir imagem por URL"
          onClick={handleImage}
        />

      </div>

      {/* ÁREA DE EDIÇÃO */}
      <div className="min-h-[400px] cursor-text px-8 py-6">
        <EditorContent editor={editor} />
      </div>

    </div>
  );
}

export default RichTextEditor;