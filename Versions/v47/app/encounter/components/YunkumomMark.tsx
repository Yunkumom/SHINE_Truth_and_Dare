interface YunkumomMarkProps {
  className?: string
  labelled?: boolean
}

export default function YunkumomMark({ className, labelled = false }: YunkumomMarkProps) {
  const label = 'Yunkumom road moon and cloud mark'
  return <svg
    className={className}
    viewBox="0 0 64 64"
    role={labelled ? 'img' : undefined}
    aria-label={labelled ? label : undefined}
    aria-hidden={labelled ? undefined : true}
    focusable="false"
  >
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.8">
      <path d="M17 8c-1 9-1 14 2 16 4 3 10-3 19-5 9-2 18 1 21 8 3 7 0 14-6 18-8 5-18 4-29-1-6-3-11-1-14 2-2 2-1 5 2 5 2 0 4-1 5-3" />
      <path d="M42 7c0 12-2 21-3 29 7 1 11 7 11 14 0 5-1 8-3 11" />
    </g>
    <ellipse cx="47" cy="29" rx="2.5" ry="4" fill="currentColor" />
  </svg>
}
