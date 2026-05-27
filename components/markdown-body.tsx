"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export function MarkdownBody({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="mt-14 mb-4 font-serif text-3xl leading-tight tracking-tight text-foreground sm:text-4xl">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="mt-12 mb-3 font-serif text-2xl leading-tight tracking-tight text-foreground sm:text-3xl">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-10 mb-3 font-serif text-xl leading-snug tracking-tight text-foreground sm:text-2xl">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="my-5 text-[0.95rem] leading-[1.85] text-foreground/85 sm:text-base sm:leading-[1.9]">
            {children}
          </p>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-foreground/30 underline-offset-[3px] transition-colors hover:decoration-foreground/70"
          >
            {children}
          </a>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-foreground">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="font-serif italic">{children}</em>
        ),
        blockquote: ({ children }) => (
          <blockquote className="my-6 border-l-2 border-foreground/20 pl-5 text-[0.95rem] italic leading-[1.8] text-foreground/70">
            {children}
          </blockquote>
        ),
        ul: ({ children }) => (
          <ul className="my-5 space-y-2.5 pl-1">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="my-5 list-decimal space-y-2.5 pl-6 marker:text-foreground/40">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="flex gap-2.5 text-[0.95rem] leading-[1.75] text-foreground/85 sm:text-base">
            <span aria-hidden className="mt-[0.6rem] inline-block h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
            <span>{children}</span>
          </li>
        ),
        code: ({ className, children }) => {
          const isBlock = className?.includes("language-")
          if (isBlock) {
            return (
              <code className={`${className ?? ""} text-[0.85rem]`}>
                {children}
              </code>
            )
          }
          return (
            <code className="rounded-md bg-foreground/[0.06] px-1.5 py-0.5 font-mono text-[0.85em] text-foreground/90">
              {children}
            </code>
          )
        },
        pre: ({ children }) => (
          <pre className="my-6 overflow-x-auto rounded-xl border border-border/60 bg-foreground/[0.03] p-5 font-mono text-[0.85rem] leading-relaxed">
            {children}
          </pre>
        ),
        hr: () => (
          <hr className="my-10 border-t border-border/60" />
        ),
        img: ({ src, alt }) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src || "/placeholder.svg"}
            alt={alt ?? ""}
            className="my-6 w-full rounded-xl border border-border/60 object-cover"
          />
        ),
        table: ({ children }) => (
          <div className="my-6 overflow-x-auto rounded-xl border border-border/60">
            <table className="w-full text-sm">{children}</table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="border-b border-border/60 bg-foreground/[0.03]">{children}</thead>
        ),
        th: ({ children }) => (
          <th className="px-4 py-2.5 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-2.5 text-foreground/85">{children}</td>
        ),
        tr: ({ children }) => (
          <tr className="border-b border-border/40 last:border-0">{children}</tr>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
