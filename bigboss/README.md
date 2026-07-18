# bigboss

Portfolio website cá nhân — Senior Business Analyst, 10+ năm kinh nghiệm HRM · CRM · PropTech.

## Overview
- 1-page portfolio, responsive, load nhanh, không dùng CMS
- Section đầy đủ: Hero, About, Skills, Strengths, Experience, Education, Case study, Projects, Contact
- Style tối giản, chuyên nghiệp — Inter + teal primary

## Cấu trúc

```
bigboss/
├── index.html
├── css/
│   ├── reset.css              ← modern CSS reset
│   ├── layout.css             ← layout nền (nav, container, menu…)
│   └── myprofile.css          ← theme / token / section styles
├── js/
│   ├── data.js                ← nội dung + i18n (VI/EN)
│   └── app.js                 ← render / event
├── assets/
│   ├── case-study.png
│   ├── favicon.png
│   └── og-image.png
├── .cursor/rules/             ← quy tắc Cursor (profile, style, commit…)
├── .gitignore
└── README.md
```

## Chạy local

Mở `index.html` bằng Live Server (hoặc bất kỳ static server nào). Không cần build step.

## Nội dung còn placeholder
- Số liệu Result trong Experience / Case study (`[số liệu]`)
- Link CV PDF thật
- Mô tả chi tiết một số giai đoạn FIS / FSI
