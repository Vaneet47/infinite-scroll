# infinite-scroll

1. window.innerHeight = Total height of browser window
2. window.scrollY = Distance from top of page user has scrolled
3. document.body.offsetHeight = Height of everything in the body, including what is not within the view

condition = window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000
