import { format } from "date-fns";

/**
 * Create an element with attributes and events, and append elements or
 * strings to it.
 * 
 * Usage:
 *  const el = element(
 *    'button',
 *    { 'class': 'button' },
 *    { click: () => { ... } },
 *    'Takki'
 *   );
 *  returns
 *  <button class="button">Takki</button> with a click handler.
 * 
 * @param {string} name Element name
 * @param {object} attributes Object containing attributes to attach to element.
 * @param {object} events Object of events to add to element.
 * @param  {...any} children List of elements or strings to append to element.
 * @returns {object} HTML element.
 */
export function element(name, attributes = null, events = null,...children) {
  const el = document.createElement(name);

  for (const child of children) {
    if (!child) {
      continue;
    }

    if (attributes) {
      for (const attrib in attributes) {
        el.setAttribute(attrib, attributes[attrib]);
      }
    }

    if (events) {
      for (const event in events) {
        el.addEventListener(event, events[event]);
      }
    }

    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else {
      el.appendChild(child);
    }
  }

  return el;
}

/**
 * Simplified element function.
 * Creates an element and append elements or strings to it.
 * 
 * @param {string} name Element name
 * @param  {...any} children List of elements or strings to append to element.
 * @returns {object} HTML element.
 */
export function el(name, ...children) {
  return element(name, null, null, ...children);
}

/**
 * Format a timestamp as dd.mm.yyyy hh:mm:ss e.g. "01.11.2020 12:00:00".
 * 
 * @param {number} timestamp Unix timestamp to format
 * @returns {string} Formatted string.
 */
export function formatDate(timestamp) {
  // Convert to Date and extract components
  let date = new Date(timestamp)
  let DD = date.getDate();
  let MM = date.getMonth() + 1;
  let YYYY = date.getFullYear();
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  
  // Add zero to front in cases where only
  // single digit
  if(DD < 10) DD = '0' + DD;
  if(MM < 10) MM = '0' + MM;
  if(hh < 10) hh = '0' + hh;
  if(mm < 10) mm = '0' + mm;
  if(ss < 10) ss = '0' + ss;
  
  return DD + '.' + MM + '.' + YYYY + ' ' + hh + ':' + mm + ':' + ss;
}
