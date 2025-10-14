---
layout: page
title: Resume
class: resume
show_title: false
include_in_header: true
include_in_footer: true
order: 1
---

{% assign skills = site.data.resume.skills %}
{% assign works = site.data.resume.work %}
{% assign projects = site.data.resume.projects %}
{% assign educations = site.data.resume.education %}
{% assign certificates = site.data.resume.certificates %}

## {{ site.author.name }}

##### {% include icon.html name="wrench" %} SKILLS
---

|:---|:---|
{% for skill in skills -%}
| **{{skill.name}}: &nbsp;** | {% for keyword in skill.keywords -%} {{keyword}}{%- if forloop.last == false -%}, {%- endif -%}{%- endfor -%} |
{% endfor %}

<!-- - **Languages:** Python, JavaScript, Java, SQL  
- **Frameworks & Libraries:** React, React Native, Angular, Node.js, Express  
- **Data & Tools:** Pandas, NumPy, Matplotlib, TensorFlow, Docker, Git, AWS  
- **Other:** Agile/Scrum, REST APIs, CI/CD   -->

##### {% include icon.html name='briefcase-business' %} WORK EXPERIENCE {#work-experience}
---

{% for work in works -%}
<div class="is-flex is-justify-content-space-between mt-5">
    <b>{{ work.position | upcase }}</b>
    <b>{{ work.startDate }} — {{ work.endDate | default: "Present" }}</b>
</div>
***{% include link.html href=work.url label=work.name %}***
{: .mb-2}
{% for highlight in work.highlights -%}
- {{ highlight }}
{% endfor -%}
{%- endfor %}

##### {% include icon.html name='folder-code' %} PROJECTS {#projects}
---

{% for project in projects -%}
<div class="is-flex is-justify-content-space-between mt-5">
    {% assign project_name = project.name | upcase %}
    <b>{% include link.html href=project.url label=project_name %}</b>
    <b>{{ project.startDate }} — {{ project.endDate }}</b>
</div>
_{{ project.description }}_
{: .mb-2}
{% for highlight in project.highlights -%}
- {{ highlight }}
{% endfor %}
{%- endfor %}


##### {% include icon.html name='graduation-cap' %} EDUCATION
---
{% for education in educations -%}
<div class="is-flex is-justify-content-space-between mt-5">
    <b>{{ education.studyType }}, {{ education.area }}</b>
    <b>{{ education.startDate }} — {{ education.endDate }}</b>
</div>
_{% include link.html href=education.url label=education.institution %}_
{% if education.score -%}
- **GPA:** _{{ education.score }}/4.0_ 
{%- endif %}
- **Courses:** {% for course in education.courses -%}{{ course }}{%- if forloop.last == false -%}, {%- endif -%}{% endfor %}
{% endfor %}

##### {% include icon.html name='trophy' %} CERTIFICATIONS
---
{% for certificate in certificates -%}
<div class="is-flex is-justify-content-space-between">
    <span class="is-flex"><b>{% include link.html href=certificate.url label=certificate.name %}</b> | {{ certificate.issuer }}</span>
    <b>{{ certificate.date }}</b>
</div>
{% endfor %}