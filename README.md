## Personal Site Metrics

### What is it
A simple UI for viewing anonymized details and history of those who view [my personal website](https://www.kevinchoi.dev).

### How does it work
I've attached click-handlers to any clickable item of my website (that code is [here](https://github.com/Kevin0115/kevin0115.github.io))
When someone opens my site for the first time, a Session ID is automatically assigned for their current session and it is recorded in the PostgreSQL database. Any further clicks on items are recorded as well.

*This is completely anonymized. I do not collect anything beyond activity on my site. I collect less info than Google Analytics. I just did this for fun.*

### Why did I do it
I wanted more experience with 3 things:
1. React Bootstrap
2. Charts (specifically, React-vis)
3. PostgreSQL (slightly more advanced queries than what I'm used to)

### Where can you view it
## [Here!](https://www.kevinchoi.dev/PersonalSiteMetrics/)
