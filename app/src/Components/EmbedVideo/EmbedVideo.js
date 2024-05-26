import React from 'react'

export default function EmbedVideo(props) {
    return (
        <div dangerouslySetInnerHTML={{
            __html: `
         <video
           loop
           muted
           autoplay
           playsinline
           src="${props.src}"
           type="${props.type}"
         />,
       ` }}></div>
    )
}
