import { defineClientConfig } from 'vuepress/client'

export default defineClientConfig({
  enhance() {
    if (typeof window === 'undefined') return
    
    const insertBadge = () => {
      const footer = document.querySelector('.vp-footer')
      if (!footer || document.getElementById('ssl-badge')) return
      
      const badgeDiv = document.createElement('div')
      badgeDiv.id = 'ssl-badge'
      badgeDiv.style.cssText = 'display: flex; justify-content: center; margin-top: 8px;'
      badgeDiv.innerHTML = '<a href="https://guardssl.info" target="_blank" rel="noopener noreferrer"><img src="https://guardssl.info/api/badge/4bab41c4-d5ef-4353-b595-4bf09a715d86?style=circular&v=1769854323039" alt="SSL Status"></a>'
      footer.appendChild(badgeDiv)
    }

    const scheduleInsert = () => {
      setTimeout(insertBadge, 0)
      setTimeout(insertBadge, 100)
      setTimeout(insertBadge, 500)
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', scheduleInsert)
    } else {
      scheduleInsert()
    }
  }
})
