const getEventMarkdown = (data) => {
return `---
id: "${data.id}"
name: "${data.name}"
week: "${data.week}"
link: "${data.link}"
paid: "false"

---

${data.name}

<a href="${data.link}"><img src="https://docqet-images.s3.us-east-2.amazonaws.com/sponsors/${data.id}.jpg" /></a>

`
}

module.exports = getEventMarkdown