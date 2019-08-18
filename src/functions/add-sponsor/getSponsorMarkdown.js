const getSponsorMarkdown = (data) => {
return `---
title: "${data.name}"
date: "${data.date}"
sponsorDate: "${data.week}"
eventUrl: "${data.link}"

---

${data.name}

<a href="${data.link}"><img src="https://docqet-images.s3.us-east-2.amazonaws.com/sponsors/${data.id}.jpg" /></a>

`
}

module.exports = getSponsorMarkdown