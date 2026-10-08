export const NAMESPACE = 'http://www.w3.org/2000/svg'

export function el(tag, props = {}, ...children) {
  const node =
    tag === 'svg' || tag === 'path' || tag === 'use' || tag === 'circle'
      ? document.createElementNS(NAMESPACE, tag)
      : document.createElement(tag)

  for (const [key, value] of Object.entries(props)) {
    if (value == null || value === false) continue
    if (key === 'class') node.className = value
    else if (key === 'dataset') Object.assign(node.dataset, value)
    else if (key === 'text') node.textContent = value
    else if (key === 'style' && typeof value === 'object') {
      Object.assign(node.style, value)
    } else if (key.startsWith('on') && typeof value === 'function') {
      node.addEventListener(key.slice(2), value)
    } else if (key === 'svg') node.setAttribute(value, true)
    else node.setAttribute(key, value)
  }

  for (const child of children.flat()) {
    if (child == null || child === false) continue
    node.append(
      typeof child === 'string' ? document.createTextNode(child) : child,
    )
  }

  return node
}