'use client'

import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import LinkExtension from '@tiptap/extension-link'
import ImageExtension from '@tiptap/extension-image'
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Quote, Link as LinkIcon, Image as ImageIcon,
  Heading1, Heading2, Heading3, Undo, Redo, RemoveFormatting
} from 'lucide-react'
import { useState, useRef } from 'react'
import { uploadMediaAction } from '@/app/admin/(dashboard)/media/actions'

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!editor) {
    return null
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)
    if (url === null) {
      return
    }
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    try {
      new URL(url)
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    } catch (e) {
      alert('Invalid URL')
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('altText', file.name)
      
      const res = await uploadMediaAction(formData)
      if (res.error) {
        alert(res.error)
      } else if (res.media) {
        editor.chain().focus().setImage({ src: res.media.secureUrl, alt: res.media.altText || '' }).run()
      }
    } catch (err) {
      console.error(err)
      alert('Failed to upload image')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const Button = ({ onClick, isActive = false, disabled = false, children, title }: any) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded hover:bg-gray-100 disabled:opacity-50 transition-colors ${
        isActive ? 'bg-gray-200 text-black font-semibold' : 'text-gray-600'
      }`}
    >
      {children}
    </button>
  )

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-gray-50 rounded-t-xl sticky top-0 z-10">
      <div className="flex items-center gap-1 pr-2 border-r border-gray-300">
        <Button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo"><Undo size={16} /></Button>
        <Button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo"><Redo size={16} /></Button>
      </div>

      <div className="flex items-center gap-1 px-2 border-r border-gray-300">
        <Button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} title="Heading 1"><Heading1 size={16} /></Button>
        <Button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} title="Heading 2"><Heading2 size={16} /></Button>
        <Button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })} title="Heading 3"><Heading3 size={16} /></Button>
        <Button onClick={() => editor.chain().focus().setParagraph().run()} isActive={editor.isActive('paragraph')} title="Paragraph"><span className="text-sm font-serif">P</span></Button>
      </div>

      <div className="flex items-center gap-1 px-2 border-r border-gray-300">
        <Button onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} title="Bold"><Bold size={16} /></Button>
        <Button onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} title="Italic"><Italic size={16} /></Button>
        <Button onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} title="Underline"><UnderlineIcon size={16} /></Button>
        <Button onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} title="Strikethrough"><Strikethrough size={16} /></Button>
        <Button onClick={() => editor.chain().focus().unsetAllMarks().run()} title="Clear Formatting"><RemoveFormatting size={16} /></Button>
      </div>

      <div className="flex items-center gap-1 px-2 border-r border-gray-300">
        <Button onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })} title="Align Left"><AlignLeft size={16} /></Button>
        <Button onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })} title="Align Center"><AlignCenter size={16} /></Button>
        <Button onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })} title="Align Right"><AlignRight size={16} /></Button>
        <Button onClick={() => editor.chain().focus().setTextAlign('justify').run()} isActive={editor.isActive({ textAlign: 'justify' })} title="Justify"><AlignJustify size={16} /></Button>
      </div>

      <div className="flex items-center gap-1 px-2 border-r border-gray-300">
        <Button onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} title="Bullet List"><List size={16} /></Button>
        <Button onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} title="Numbered List"><ListOrdered size={16} /></Button>
        <Button onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} title="Blockquote"><Quote size={16} /></Button>
      </div>

      <div className="flex items-center gap-1 pl-2">
        <Button onClick={setLink} isActive={editor.isActive('link')} title="Link"><LinkIcon size={16} /></Button>
        <Button onClick={() => fileInputRef.current?.click()} disabled={isUploading} title="Insert Image">
          {isUploading ? <span className="text-xs">Uploading...</span> : <ImageIcon size={16} />}
        </Button>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageUpload} 
          accept="image/jpeg,image/png,image/webp,image/gif" 
          className="hidden" 
        />
      </div>
    </div>
  )
}

export function RichTextEditor({ 
  value = '', 
  onChange,
  name
}: { 
  value?: string, 
  onChange?: (html: string) => void,
  name?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [contentHtml, setContentHtml] = useState(value)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
      }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      LinkExtension.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
      ImageExtension.configure({
        inline: true,
        allowBase64: true,
      })
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none focus:outline-none min-h-[400px] p-6',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      setContentHtml(html)
      if (inputRef.current) {
        inputRef.current.value = html
      }
      if (onChange) {
        onChange(html)
      }
    },
  })

  // Sync editor if initial value changes externally
  useState(() => {
    if (editor && value && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  })

  return (
    <div className="border border-gray-300 rounded-xl overflow-hidden bg-white shadow-sm flex flex-col focus-within:ring-1 focus-within:ring-black focus-within:border-black transition-all">
      <MenuBar editor={editor} />
      <div className="overflow-y-auto max-h-[800px]">
        <EditorContent editor={editor} />
      </div>
      {/* Hidden input to ensure form submission captures the latest editor content */}
      {name && <input ref={inputRef} type="hidden" name={name} value={contentHtml} />}
    </div>
  )
}
