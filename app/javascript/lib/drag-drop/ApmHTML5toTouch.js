// @flow
import HTML5Backend from 'react-dnd-html5-backend'
import TouchBackend from 'react-dnd-touch-backend'

import { TouchTransition } from 'react-dnd-multi-backend/lib/Transitions'

export default {
  backends: [
    {
      backend: HTML5Backend,
      preview: true
    },
    {
      backend: TouchBackend({enableMouseEvents: true, delay: 250}),
      preview: true,
      transition: TouchTransition
    }
  ]
}
