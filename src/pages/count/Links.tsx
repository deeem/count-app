import { Badge, Button } from 'components'
import { useEffect } from 'react'
import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export const Links = () => {
  const uri = window.location.href
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    if (isCopied === false) return

    const timer = setTimeout(() => {
      setIsCopied(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [isCopied])

  return (
    <div className="bg-violet-200">
      <div className="max-w-screen-sm pt-4 pb-4 mx-auto">
        <div className="text-gray-700">
          invite team members by sending them this link
        </div>
        <div className="items-center justify-center flext">
          <a
            href={uri}
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:text-blue-500"
          >
            {uri}
          </a>
          <span className="ml-4">
            <CopyToClipboard text={uri} onCopy={() => setIsCopied(true)}>
              {isCopied ? (
                <Badge variant="teal">copied</Badge>
              ) : (
                <Button color="gray" size="small">
                  click to copy
                </Button>
              )}
            </CopyToClipboard>
          </span>
        </div>
      </div>
    </div>
  )
}
