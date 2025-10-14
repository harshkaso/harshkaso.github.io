---
layout: page
title: Blog
show_title: false
include_in_header: true
include_in_footer: true
order: 2
---

{% for post in site.posts %}
{% if post.show_in_post_list %}
{% include link.html href=post.url label=post.title class="font-display is-size-3 has-text-weight-extrabold" %}
<p class="mb-2 text-muted">Posted on <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: '%-d %B %Y' }}</time> by {{ post.author }}.</p>
<p class="mb-2">{{ post.description }}</p>
<a href="{{ post.url }}" title="{{ post.title }}">Read</a>
{% if forloop.last == false %}
<hr class="mt-4 mb-0">
{% endif %}
{% endif %}
{% endfor %}