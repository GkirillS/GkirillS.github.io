import React from 'react'
import ContentLoader from 'react-content-loader'

const LoaderMenu = (props) => {

  const rows = 2
  const coverHeight = window.innerWidth > 480 ? 456 : 360
  const coverWidth = window.innerWidth > 480 ? 380 : 300
  const padding = window.innerWidth > 480 ? 80 : 60
  const columns = Math.floor(window.innerWidth / (coverWidth + (window.innerWidth > 480 ? padding : 0)))
  const speed = 2

  const coverHeightWithPadding = coverHeight + padding
  const coverWidthWithPadding = coverWidth + padding
  const initial = 35
  const covers = Array(columns * rows).fill(1)
	return (
		<ContentLoader
      speed={speed}
      width={columns * coverWidthWithPadding}
      height={rows * coverHeightWithPadding}
			backgroundColor="#e2dada"
			foregroundColor="#5c5c5c"
			{...props}
		>
      {covers.map((g, i) => {
        let vy = Math.floor(i / columns) * coverHeightWithPadding + initial
        let vx = (i * coverWidthWithPadding) % (columns * coverWidthWithPadding)
        return (
          <rect
						style={{borderRadius: '12px'}}
            key={i}
            x={vx}
            y={vy}
            rx="16"
            ry="16"

            width={coverWidth}
            height={coverHeight}
          />
        )
      })}
		</ContentLoader>
	)
}

export default LoaderMenu