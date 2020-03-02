import React, { ReactElement, ReactNode, useRef, useEffect, useCallback } from "react"
import { CSSObject } from "@emotion/core"

import { isBrowser, isDefined } from "../../utils"

import { HeaderContainer, HeaderInner, HeaderOuter } from "./elements"

interface Props {
  children: ReactNode | ReactNode[];
  styles?: CSSObject;
  initialHeight: string;
  finalHeight: string;
  onResize: (h: string) => void;
}

export function Header({
  children,
  styles,
  initialHeight,
  finalHeight,
  onResize,
}: Props): ReactElement {
  const innerRef = useRef<HTMLDivElement>(null)

  const getHeight = useCallback((): string => {
    const { current } = innerRef
    if (isBrowser && isDefined(current)) {
      const { height } = getComputedStyle((current as Element))
      return height
    }
    if (isDefined(finalHeight) && finalHeight !== initialHeight) {
      return finalHeight
    }
    return initialHeight
  }, [initialHeight, finalHeight, innerRef])

  const updateHeight = useCallback((): void => {
    const nextHeight = getHeight()
    if (finalHeight !== nextHeight) {
      onResize(nextHeight)
    }
  }, [finalHeight, onResize, getHeight])

  useEffect(() => {
    updateHeight()
  }, [])

  updateHeight()

  return (
    <HeaderContainer>
      <HeaderOuter finalHeight={finalHeight} initialHeight={initialHeight}>
        <HeaderInner
          finalHeight={finalHeight}
          initialHeight={initialHeight}
          css={styles}
          ref={innerRef}>
          {children}
        </HeaderInner>
      </HeaderOuter>
    </HeaderContainer>
  )
}
