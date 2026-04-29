/* REUSABLE — swap out the body when the real page is built */
interface PlaceholderPageProps {
  name: string
  phase?: string
}

export function PlaceholderPage({ name, phase = 'Phase 4' }: PlaceholderPageProps) {
  return (
    <div className="flex flex-1 items-center justify-center py-20">
      <div className="rounded-xl border border-border-color bg-white p-10 text-center shadow-sm">
        <div
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-black text-white"
          style={{ background: 'linear-gradient(21.05deg, #5711F6 -38.05%, #9614EB 37.02%, #FF1ADE 112.09%)' }}
        >
          {name[0]}
        </div>
        <h5 className="mb-1 text-gray-900">{name}</h5>
        <p className="text-sm text-default">Coming in {phase}.</p>
      </div>
    </div>
  )
}
