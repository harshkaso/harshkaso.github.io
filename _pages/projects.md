---
layout: page
title: Projects
class: projects
show_title: true
include_in_header: true
include_in_footer: true
order: 3
---

{% for project in site.projects %}
{:.project-card}
{% include img-2-ascii.html img=project.image %}
{% include link.html href=project.url class="text-scramble is-size-4" data_texts=project.title %}
{% endfor %}