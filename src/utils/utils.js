// fix the vh issue on mobile devices
// https://nicolas-hoizey.com/2015/02/viewport-height-is-taller-than-the-visible-part-of-the-document-in-some-mobile-browsers.html
import moment from 'moment'
import 'moment/locale/zh-cn'

export const setVhs = () => {
  const vh = window.innerHeight
  if (document.getElementById('content') != null)
    document.getElementById('content').style.minHeight = `${vh - 60}px`
  if (document.getElementById('info-wrapper') != null)
    document.getElementById('info-wrapper').style.height = `${0.35 * vh}px`
  if (document.getElementById('people-grid') != null)
    document.getElementById('people-grid').style.maxHeight = `${0.36 * vh}px`
  if (document.getElementById('info') != null)
    document.getElementById('info').style.fontSize = `${0.03 * vh}px`
  if (document.getElementById('number') != null)
    document.getElementById('number').style.fontSize = `${0.1 * vh}px`
  if (document.getElementById('photo') != null)
    document.getElementById('photo').style.height = `${0.2 * vh}px`
}

export const sort = (data, sortMethod) =>
  sortMethod === 1
    ? // sort by pinyin
      Object.keys(data).sort((a, b) => a.localeCompare(b, 'zh-CN'))
    : // sort by accusation date
      Object.keys(data).sort(
        (a, b) =>
          data[a].date[0] + data[a].date[1] / 12.0 + data[a].date[2] / 365.0 >
          data[b].date[0] + data[b].date[1] / 12.0 + data[b].date[2] / 365.0
            ? 1
            : -1
      )

export const displayTimestamp = timestamp => {
  return moment(timestamp)
    .locale('zh-cn')
    .fromNow()
}
